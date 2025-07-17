// Dashboard JavaScript functionality
class DashboardManager {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAutoRefresh();
    }

    init() {
        // Initialize tooltips
        this.initTooltips();
        
        // Initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        this.tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    setupEventListeners() {
        // Handle deployment modal
        const deployModal = document.getElementById('deployModal');
        if (deployModal) {
            deployModal.addEventListener('show.bs.modal', () => {
                this.onDeployModalShow();
            });
        }

        // Handle deploy form submission
        const deployForm = document.querySelector('#deployModal form');
        if (deployForm) {
            deployForm.addEventListener('submit', (e) => {
                this.onDeploySubmit(e);
            });
        }

        // Handle error buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-bs-toggle="tooltip"]')) {
                e.preventDefault();
            }
        });
    }

    onDeployModalShow() {
        // Reset any previous states
        const submitBtn = document.querySelector('#deployModal form button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-feather="play" class="me-2"></i>Deploy Now';
            feather.replace();
        }
    }

    onDeploySubmit(e) {
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-feather="loader" class="me-2 spinning"></i>Deploying...';
            feather.replace();
        }
    }

    async refreshDeploymentStatus() {
        try {
            // Get all building deployments
            const buildingRows = document.querySelectorAll('[data-deployment-id]');
            
            for (const row of buildingRows) {
                const deploymentId = row.getAttribute('data-deployment-id');
                const statusBadge = row.querySelector('.badge');
                
                if (statusBadge && statusBadge.textContent.trim().includes('Building')) {
                    await this.updateDeploymentStatus(deploymentId, row);
                }
            }
        } catch (error) {
            console.error('Error refreshing deployment status:', error);
        }
    }

    async updateDeploymentStatus(deploymentId, row) {
        try {
            const response = await fetch(`/api/deployment/${deploymentId}/status`);
            const data = await response.json();
            
            if (data.success && data.deployment) {
                this.updateDeploymentRow(row, data.deployment);
            }
        } catch (error) {
            console.error(`Error updating deployment ${deploymentId}:`, error);
        }
    }

    updateDeploymentRow(row, deployment) {
        const statusBadge = row.querySelector('.badge');
        const durationCell = row.cells[2]; // Duration column
        const actionsCell = row.cells[3]; // Actions column
        
        if (statusBadge) {
            // Update status badge
            let badgeHTML = '';
            switch (deployment.status) {
                case 'success':
                    badgeHTML = '<span class="badge bg-success"><i data-feather="check"></i>Success</span>';
                    break;
                case 'failed':
                    badgeHTML = '<span class="badge bg-danger"><i data-feather="x"></i>Failed</span>';
                    break;
                case 'building':
                    badgeHTML = '<span class="badge bg-warning"><i data-feather="loader" class="spinning"></i>Building</span>';
                    break;
                default:
                    badgeHTML = `<span class="badge bg-secondary"><i data-feather="clock"></i>${deployment.status}</span>`;
            }
            statusBadge.outerHTML = badgeHTML;
        }
        
        if (durationCell && deployment.completion_time) {
            // Calculate and update duration
            const triggerTime = new Date(deployment.trigger_time);
            const completionTime = new Date(deployment.completion_time);
            const duration = (completionTime - triggerTime) / 1000;
            durationCell.innerHTML = `<span class="text-muted">${duration.toFixed(1)}s</span>`;
        }
        
        if (actionsCell && deployment.vercel_url) {
            // Add view button if not exists
            if (!actionsCell.querySelector('a[href*="http"]')) {
                const viewBtn = document.createElement('a');
                viewBtn.href = deployment.vercel_url;
                viewBtn.target = '_blank';
                viewBtn.className = 'btn btn-outline-primary btn-sm me-2';
                viewBtn.innerHTML = '<i data-feather="external-link"></i>View';
                actionsCell.insertBefore(viewBtn, actionsCell.firstChild);
            }
        }
        
        // Re-initialize feather icons
        feather.replace();
    }

    async refreshStats() {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            
            if (data.success && data.stats) {
                this.updateStatsCards(data.stats);
            }
        } catch (error) {
            console.error('Error refreshing stats:', error);
        }
    }

    updateStatsCards(stats) {
        // Update statistics cards
        const cards = document.querySelectorAll('.card-body h5.card-title');
        if (cards.length >= 4) {
            cards[0].textContent = stats.total || 0;
            cards[1].textContent = stats.successful || 0;
            cards[2].textContent = stats.failed || 0;
            cards[3].textContent = `${stats.success_rate || 0}%`;
        }
    }

    startAutoRefresh() {
        // Refresh deployment status every 30 seconds
        setInterval(() => {
            this.refreshDeploymentStatus();
        }, 30000);
        
        // Refresh stats every 60 seconds
        setInterval(() => {
            this.refreshStats();
        }, 60000);
    }

    showNotification(message, type = 'info') {
        // Create and show a toast notification
        const toastContainer = this.getOrCreateToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    getOrCreateToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '1055';
            document.body.appendChild(container);
        }
        return container;
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardManager = new DashboardManager();
});

// Handle page visibility changes to pause/resume auto-refresh
document.addEventListener('visibilitychange', () => {
    if (window.dashboardManager) {
        if (document.hidden) {
            // Page is hidden, could pause auto-refresh here
            console.log('Dashboard hidden, auto-refresh continues in background');
        } else {
            // Page is visible, refresh immediately
            window.dashboardManager.refreshDeploymentStatus();
            window.dashboardManager.refreshStats();
        }
    }
});
