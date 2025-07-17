import os
import requests
import logging
from datetime import datetime
from models import Deployment
from app import db

logger = logging.getLogger(__name__)

class VercelService:
    """Service class to handle Vercel API interactions"""
    
    def __init__(self):
        self.webhook_url = os.environ.get("VERCEL_WEBHOOK_URL", "")
        self.api_token = os.environ.get("VERCEL_API_TOKEN", "")
        self.project_id = os.environ.get("VERCEL_PROJECT_ID", "")
        
        if not self.webhook_url:
            logger.warning("VERCEL_WEBHOOK_URL not set in environment variables")

    def trigger_deployment(self):
        """
        Trigger a new Vercel deployment
        Returns: tuple (success: bool, deployment: Deployment, message: str)
        """
        # Create new deployment record
        deployment = Deployment(
            status='initiated',
            trigger_time=datetime.utcnow()
        )
        
        try:
            db.session.add(deployment)
            db.session.commit()
            
            if not self.webhook_url:
                deployment.status = 'failed'
                deployment.error_message = 'Vercel webhook URL not configured'
                deployment.completion_time = datetime.utcnow()
                db.session.commit()
                return False, deployment, 'Webhook URL not configured'
            
            # Trigger deployment via webhook
            logger.info(f"Triggering deployment via webhook: {self.webhook_url}")
            
            headers = {}
            if self.api_token:
                headers['Authorization'] = f'Bearer {self.api_token}'
            
            response = requests.post(
                self.webhook_url,
                headers=headers,
                timeout=30
            )
            
            if response.status_code in [200, 201, 202]:
                # Parse response to get deployment info if available
                try:
                    response_data = response.json()
                    if 'id' in response_data:
                        deployment.deployment_id = response_data['id']
                    if 'url' in response_data:
                        deployment.vercel_url = response_data['url']
                except:
                    logger.warning("Could not parse deployment response JSON")
                
                deployment.status = 'building'
                db.session.commit()
                
                logger.info(f"Deployment triggered successfully. Status code: {response.status_code}")
                return True, deployment, 'Deployment triggered successfully'
            else:
                deployment.status = 'failed'
                deployment.error_message = f'HTTP {response.status_code}: {response.text}'
                deployment.completion_time = datetime.utcnow()
                db.session.commit()
                
                logger.error(f"Deployment failed. Status code: {response.status_code}, Response: {response.text}")
                return False, deployment, f'Deployment failed with status {response.status_code}'
                
        except requests.exceptions.RequestException as e:
            deployment.status = 'failed'
            deployment.error_message = f'Network error: {str(e)}'
            deployment.completion_time = datetime.utcnow()
            db.session.commit()
            
            logger.error(f"Network error during deployment: {e}")
            return False, deployment, f'Network error: {str(e)}'
            
        except Exception as e:
            deployment.status = 'failed'
            deployment.error_message = f'Unexpected error: {str(e)}'
            deployment.completion_time = datetime.utcnow()
            db.session.commit()
            
            logger.error(f"Unexpected error during deployment: {e}")
            return False, deployment, f'Unexpected error: {str(e)}'

    def get_deployment_status(self, deployment_id):
        """
        Get deployment status from Vercel API
        Returns: dict with status information
        """
        if not self.api_token or not deployment_id:
            return None
            
        try:
            headers = {'Authorization': f'Bearer {self.api_token}'}
            url = f'https://api.vercel.com/v13/deployments/{deployment_id}'
            
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Failed to get deployment status: {response.status_code}")
                return None
                
        except Exception as e:
            logger.error(f"Error getting deployment status: {e}")
            return None

    def update_deployment_status(self, deployment):
        """
        Update deployment status by checking Vercel API
        """
        if not deployment.deployment_id:
            return
            
        status_data = self.get_deployment_status(deployment.deployment_id)
        if not status_data:
            return
            
        vercel_status = status_data.get('readyState', '').lower()
        
        # Map Vercel status to our status
        if vercel_status == 'ready':
            deployment.status = 'success'
            deployment.completion_time = datetime.utcnow()
            if 'url' in status_data:
                deployment.vercel_url = f"https://{status_data['url']}"
        elif vercel_status == 'error':
            deployment.status = 'failed'
            deployment.completion_time = datetime.utcnow()
            deployment.error_message = 'Deployment failed on Vercel'
        elif vercel_status in ['building', 'queued']:
            deployment.status = 'building'
            
        db.session.commit()
