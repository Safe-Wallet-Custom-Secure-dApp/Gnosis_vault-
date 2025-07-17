# Vercel Deployment Manager

## Overview

This is a Flask-based web application that provides a dashboard interface for managing and monitoring Vercel deployments. The application allows users to trigger deployments through a webhook system and track deployment history with detailed status information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Database**: SQLAlchemy with SQLite (default) or configurable via DATABASE_URL
- **ORM**: SQLAlchemy with declarative base model
- **Deployment**: WSGI-compatible with ProxyFix middleware for reverse proxy support

### Frontend Architecture
- **Template Engine**: Jinja2 (Flask's default)
- **CSS Framework**: Bootstrap with dark theme
- **Icons**: Feather Icons
- **JavaScript**: Vanilla JavaScript with Bootstrap components
- **Responsive Design**: Mobile-first Bootstrap layout

### Database Schema
- **Single Entity Model**: `Deployment` table tracking:
  - Deployment ID (Vercel's unique identifier)
  - Status (initiated, success, failed, building)
  - Timestamps (trigger, completion, created, updated)
  - Error messages and build logs
  - Vercel deployment URLs

## Key Components

### Core Application (`app.py`)
- Flask application factory pattern
- Database initialization with auto-table creation
- Environment-based configuration
- Logging setup for debugging

### Data Models (`models.py`)
- `Deployment` model with comprehensive tracking fields
- Helper methods for statistics and recent deployments
- JSON serialization support for API responses

### Route Handlers (`routes.py`)
- Dashboard view with deployment statistics
- Deployment trigger endpoint (both web and API)
- Telegram bot management endpoints (start/stop/status)
- Error handling with user-friendly flash messages

### Vercel Integration (`vercel_service.py`)
- `VercelService` class for API interactions
- Webhook-based deployment triggering
- Environment variable configuration for tokens and URLs

### Telegram Bot Integration (`telegram_bot.py`)
- Standalone Telegram bot using python-telegram-bot library
- Commands: /start, /status, /deploy
- Secure token management via environment variables
- Integration with same Vercel webhook as web interface

### Frontend Components
- **Dashboard Template**: Main interface with statistics cards and recent deployments
- **History Template**: Paginated deployment history table
- **Bot Management Template**: Interface for controlling Telegram bot
- **Base Template**: Common layout with navigation and Bootstrap integration
- **Custom Styling**: Enhanced UI with hover effects and status badges
- **JavaScript**: Auto-refresh functionality, modal handling, and bot management

## Data Flow

1. **Deployment Trigger**: User clicks deploy button → Form submission → VercelService called
2. **Database Recording**: New deployment record created with 'initiated' status
3. **Webhook Call**: POST request sent to Vercel webhook URL with authentication
4. **Status Updates**: Deployment status updated based on webhook response
5. **Dashboard Refresh**: Statistics and recent deployments updated automatically

## External Dependencies

### Required Environment Variables
- `VERCEL_WEBHOOK_URL`: Webhook endpoint for triggering deployments
- `BOT_TOKEN`: Telegram bot token for remote deployment triggering
- `VERCEL_API_TOKEN`: Authentication token for Vercel API (optional)
- `VERCEL_PROJECT_ID`: Project identifier (currently stored but not used)
- `DATABASE_URL`: Database connection string (defaults to SQLite)
- `SESSION_SECRET`: Flask session encryption key

### Third-Party Services
- **Vercel**: Primary deployment platform via webhook API
- **Bootstrap CDN**: Frontend styling and components
- **Feather Icons**: Icon library via CDN

### Python Dependencies
- Flask and Flask-SQLAlchemy for web framework and ORM
- Requests library for HTTP calls to Vercel
- python-telegram-bot for Telegram bot functionality
- Werkzeug ProxyFix for deployment behind reverse proxies

## Deployment Strategy

### Development
- Built-in Flask development server on port 5000
- SQLite database for local development
- Debug mode enabled with detailed logging

### Production Considerations
- WSGI-compatible application (`main.py` entry point)
- ProxyFix middleware for reverse proxy deployment
- Environment-based configuration for security
- Database connection pooling with health checks
- Session secret key management

### Configuration Flexibility
- Supports multiple database backends via SQLAlchemy
- Environment variable override for all configuration
- Graceful fallbacks for missing configuration

The application follows a simple MVC pattern with clear separation of concerns, making it easy to extend with additional features like user authentication, deployment queuing, or enhanced monitoring capabilities.