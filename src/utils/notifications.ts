// Notification utility functions
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  closable?: boolean;
  icon?: string;
}

export class NotificationManager {
  private static instance: NotificationManager;
  private container: HTMLElement | null = null;
  private notifications: Map<string, HTMLElement> = new Map();

  private constructor() {
    this.createContainer();
  }

  public static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  private createContainer(): void {
    if (typeof document === 'undefined') return;

    this.container = document.createElement('div');
    this.container.id = 'notification-container';
    this.container.className = 'fixed top-4 right-4 z-50 space-y-2 pointer-events-none';
    this.container.style.maxWidth = '400px';
    
    document.body.appendChild(this.container);
  }

  public show(
    message: string, 
    type: NotificationType = 'info', 
    options: NotificationOptions = {}
  ): string {
    if (!this.container) return '';

    const {
      duration = 4000,
      position = 'top-right',
      closable = true,
      icon
    } = options;

    const id = this.generateId();
    const notification = this.createNotification(message, type, { closable, icon });
    
    this.notifications.set(id, notification);
    this.container.appendChild(notification);

    // Position the container based on options
    this.updateContainerPosition(position);

    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full', 'opacity-0');
      notification.classList.add('translate-x-0', 'opacity-100');
    }, 10);

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  private createNotification(
    message: string, 
    type: NotificationType, 
    options: { closable: boolean; icon?: string }
  ): HTMLElement {
    const notification = document.createElement('div');
    notification.className = `
      transform translate-x-full opacity-0 transition-all duration-300 ease-out
      pointer-events-auto flex items-start gap-3 p-4 rounded-lg shadow-lg
      ${this.getTypeClasses(type)}
    `;

    const iconHtml = options.icon || this.getDefaultIcon(type);
    const closeButton = options.closable ? `
      <button class="ml-auto flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity" data-close>
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    ` : '';

    notification.innerHTML = `
      <div class="flex-shrink-0">
        <span class="material-symbols-outlined text-[20px]">${iconHtml}</span>
      </div>
      <div class="flex-1 text-sm font-medium leading-relaxed">
        ${message}
      </div>
      ${closeButton}
    `;

    // Add close functionality
    if (options.closable) {
      const closeBtn = notification.querySelector('[data-close]');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          const id = Array.from(this.notifications.entries())
            .find(([, element]) => element === notification)?.[0];
          if (id) this.remove(id);
        });
      }
    }

    return notification;
  }

  private getTypeClasses(type: NotificationType): string {
    const classes = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white'
    };
    return classes[type];
  }

  private getDefaultIcon(type: NotificationType): string {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return icons[type];
  }

  private updateContainerPosition(position: string): void {
    if (!this.container) return;

    // Reset classes
    this.container.className = 'fixed z-50 space-y-2 pointer-events-none';

    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };

    this.container.className += ` ${positions[position] || positions['top-right']}`;
  }

  public remove(id: string): void {
    const notification = this.notifications.get(id);
    if (!notification) return;

    // Animate out
    notification.classList.remove('translate-x-0', 'opacity-100');
    notification.classList.add('translate-x-full', 'opacity-0');

    // Remove from DOM after animation
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      this.notifications.delete(id);
    }, 300);
  }

  public clear(): void {
    this.notifications.forEach((_, id) => {
      this.remove(id);
    });
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Convenience functions
export const showNotification = (
  message: string, 
  type: NotificationType = 'info', 
  options: NotificationOptions = {}
): string => {
  return NotificationManager.getInstance().show(message, type, options);
};

export const showSuccess = (message: string, options: NotificationOptions = {}): string => {
  return showNotification(message, 'success', options);
};

export const showError = (message: string, options: NotificationOptions = {}): string => {
  return showNotification(message, 'error', options);
};

export const showWarning = (message: string, options: NotificationOptions = {}): string => {
  return showNotification(message, 'warning', options);
};

export const showInfo = (message: string, options: NotificationOptions = {}): string => {
  return showNotification(message, 'info', options);
};

export const clearNotifications = (): void => {
  NotificationManager.getInstance().clear();
};

export const removeNotification = (id: string): void => {
  NotificationManager.getInstance().remove(id);
};