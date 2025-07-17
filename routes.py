from flask import render_template, request, jsonify, flash, redirect, url_for
from app import app, db
from models import Deployment
from vercel_service import VercelService
import logging
import os
import subprocess
import signal

logger = logging.getLogger(__name__)
vercel_service = VercelService()

@app.route('/')
def dashboard():
    """Main dashboard page"""
    try:
        # Get deployment statistics
        stats = Deployment.get_deployment_stats()
        
        # Get recent deployments
        recent_deployments = Deployment.get_recent_deployments(limit=5)
        
        return render_template('dashboard.html', 
                             stats=stats, 
                             recent_deployments=recent_deployments)
    except Exception as e:
        logger.error(f"Error loading dashboard: {e}")
        flash(f'Error loading dashboard: {str(e)}', 'danger')
        return render_template('dashboard.html', 
                             stats={'total': 0, 'successful': 0, 'failed': 0, 'building': 0, 'success_rate': 0}, 
                             recent_deployments=[])

@app.route('/deploy', methods=['POST'])
def trigger_deploy():
    """Trigger a new deployment"""
    try:
        success, deployment, message = vercel_service.trigger_deployment()
        
        if success:
            flash(f'✅ {message}', 'success')
        else:
            flash(f'❌ {message}', 'danger')
            
        return redirect(url_for('dashboard'))
        
    except Exception as e:
        logger.error(f"Error triggering deployment: {e}")
        flash(f'⚠️ Error during deployment: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

@app.route('/api/deploy', methods=['POST'])
def api_trigger_deploy():
    """API endpoint to trigger deployment"""
    try:
        success, deployment, message = vercel_service.trigger_deployment()
        
        return jsonify({
            'success': success,
            'message': message,
            'deployment': deployment.to_dict()
        }), 200 if success else 400
        
    except Exception as e:
        logger.error(f"API error triggering deployment: {e}")
        return jsonify({
            'success': False,
            'message': f'Error during deployment: {str(e)}'
        }), 500

@app.route('/history')
def deploy_history():
    """Deployment history page"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = 20
        
        deployments = Deployment.query.order_by(Deployment.created_at.desc()).paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return render_template('deploy_history.html', deployments=deployments)
        
    except Exception as e:
        logger.error(f"Error loading deployment history: {e}")
        flash(f'Error loading deployment history: {str(e)}', 'danger')
        return render_template('deploy_history.html', deployments=None)

@app.route('/api/deployments')
def api_deployments():
    """API endpoint to get deployments"""
    try:
        limit = request.args.get('limit', 10, type=int)
        deployments = Deployment.get_recent_deployments(limit=min(limit, 100))
        
        return jsonify({
            'success': True,
            'deployments': [d.to_dict() for d in deployments]
        })
        
    except Exception as e:
        logger.error(f"API error getting deployments: {e}")
        return jsonify({
            'success': False,
            'message': f'Error getting deployments: {str(e)}'
        }), 500

@app.route('/api/deployment/<int:deployment_id>/status')
def api_deployment_status(deployment_id):
    """API endpoint to get deployment status"""
    try:
        deployment = Deployment.query.get_or_404(deployment_id)
        
        # Try to update status from Vercel if deployment is still building
        if deployment.status == 'building':
            vercel_service.update_deployment_status(deployment)
        
        return jsonify({
            'success': True,
            'deployment': deployment.to_dict()
        })
        
    except Exception as e:
        logger.error(f"API error getting deployment status: {e}")
        return jsonify({
            'success': False,
            'message': f'Error getting deployment status: {str(e)}'
        }), 500

@app.route('/api/stats')
def api_stats():
    """API endpoint to get deployment statistics"""
    try:
        stats = Deployment.get_deployment_stats()
        return jsonify({
            'success': True,
            'stats': stats
        })
    except Exception as e:
        logger.error(f"API error getting stats: {e}")
        return jsonify({
            'success': False,
            'message': f'Error getting statistics: {str(e)}'
        }), 500

@app.route('/bot')
def bot_status():
    """Bot management page"""
    try:
        bot_token = os.environ.get('BOT_TOKEN')
        webhook_url = os.environ.get('VERCEL_WEBHOOK_URL')
        
        return render_template('bot_status.html', 
                             bot_configured=bool(bot_token),
                             webhook_configured=bool(webhook_url))
    except Exception as e:
        logger.error(f"Error loading bot status: {e}")
        flash(f'Error loading bot status: {str(e)}', 'danger')
        return redirect(url_for('dashboard'))

@app.route('/api/bot/start', methods=['POST'])
def start_bot():
    """Start the Telegram bot"""
    try:
        bot_token = os.environ.get('BOT_TOKEN')
        if not bot_token:
            return jsonify({
                'success': False,
                'message': 'BOT_TOKEN not configured'
            }), 400
        
        # Check if bot is already running
        try:
            with open('/tmp/bot.pid', 'r') as f:
                pid = int(f.read().strip())
                os.kill(pid, 0)  # Check if process exists
                return jsonify({
                    'success': False,
                    'message': 'Bot is already running'
                }), 400
        except (FileNotFoundError, ProcessLookupError, ValueError):
            pass  # Bot is not running
        
        # Start the bot
        process = subprocess.Popen([
            'python', 'telegram_bot.py'
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Save PID
        with open('/tmp/bot.pid', 'w') as f:
            f.write(str(process.pid))
        
        return jsonify({
            'success': True,
            'message': 'Bot started successfully',
            'pid': process.pid
        })
        
    except Exception as e:
        logger.error(f"Error starting bot: {e}")
        return jsonify({
            'success': False,
            'message': f'Error starting bot: {str(e)}'
        }), 500

@app.route('/api/bot/stop', methods=['POST'])
def stop_bot():
    """Stop the Telegram bot"""
    try:
        try:
            with open('/tmp/bot.pid', 'r') as f:
                pid = int(f.read().strip())
            
            os.kill(pid, signal.SIGTERM)
            os.remove('/tmp/bot.pid')
            
            return jsonify({
                'success': True,
                'message': 'Bot stopped successfully'
            })
        except FileNotFoundError:
            return jsonify({
                'success': False,
                'message': 'Bot is not running'
            }), 400
        except ProcessLookupError:
            # Process doesn't exist, remove the PID file
            try:
                os.remove('/tmp/bot.pid')
            except FileNotFoundError:
                pass
            return jsonify({
                'success': False,
                'message': 'Bot was not running'
            }), 400
            
    except Exception as e:
        logger.error(f"Error stopping bot: {e}")
        return jsonify({
            'success': False,
            'message': f'Error stopping bot: {str(e)}'
        }), 500

@app.route('/api/bot/status')
def bot_status_api():
    """Get bot status via API"""
    try:
        try:
            with open('/tmp/bot.pid', 'r') as f:
                pid = int(f.read().strip())
            os.kill(pid, 0)  # Check if process exists
            running = True
        except (FileNotFoundError, ProcessLookupError, ValueError):
            running = False
        
        bot_token = os.environ.get('BOT_TOKEN')
        
        return jsonify({
            'success': True,
            'running': running,
            'configured': bool(bot_token)
        })
        
    except Exception as e:
        logger.error(f"Error getting bot status: {e}")
        return jsonify({
            'success': False,
            'message': f'Error getting bot status: {str(e)}'
        }), 500

@app.errorhandler(404)
def not_found_error(error):
    return render_template('dashboard.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    logger.error(f"Internal server error: {error}")
    stats = {'total': 0, 'successful': 0, 'failed': 0, 'building': 0, 'success_rate': 0}
    return render_template('dashboard.html', stats=stats, recent_deployments=[]), 500
