from app import db
from datetime import datetime
from sqlalchemy import Integer, String, DateTime, Text, Boolean

class Deployment(db.Model):
    """Model to track deployment history and status"""
    id = db.Column(Integer, primary_key=True)
    deployment_id = db.Column(String(100), unique=True, nullable=True)  # Vercel deployment ID
    status = db.Column(String(50), nullable=False, default='initiated')  # initiated, success, failed, building
    trigger_time = db.Column(DateTime, nullable=False, default=datetime.utcnow)
    completion_time = db.Column(DateTime, nullable=True)
    error_message = db.Column(Text, nullable=True)
    vercel_url = db.Column(String(500), nullable=True)  # Deployment URL from Vercel
    build_logs = db.Column(Text, nullable=True)
    created_at = db.Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Deployment {self.id}: {self.status}>'

    def to_dict(self):
        """Convert deployment to dictionary for JSON responses"""
        return {
            'id': self.id,
            'deployment_id': self.deployment_id,
            'status': self.status,
            'trigger_time': self.trigger_time.isoformat() if self.trigger_time else None,
            'completion_time': self.completion_time.isoformat() if self.completion_time else None,
            'error_message': self.error_message,
            'vercel_url': self.vercel_url,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    @classmethod
    def get_recent_deployments(cls, limit=10):
        """Get recent deployments ordered by creation time"""
        return cls.query.order_by(cls.created_at.desc()).limit(limit).all()

    @classmethod
    def get_deployment_stats(cls):
        """Get deployment statistics"""
        total = cls.query.count()
        successful = cls.query.filter_by(status='success').count()
        failed = cls.query.filter_by(status='failed').count()
        building = cls.query.filter_by(status='building').count()
        
        return {
            'total': total,
            'successful': successful,
            'failed': failed,
            'building': building,
            'success_rate': round((successful / total * 100) if total > 0 else 0, 1)
        }
