// DOM utility functions
export class DOMUtils {
  /**
   * Wait for DOM to be ready
   */
  static ready(callback: () => void): void {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  /**
   * Query selector with type safety
   */
  static querySelector<T extends HTMLElement>(
    selector: string, 
    parent: Document | HTMLElement = document
  ): T | null {
    return parent.querySelector(selector) as T | null;
  }

  /**
   * Query all selectors with type safety
   */
  static querySelectorAll<T extends HTMLElement>(
    selector: string, 
    parent: Document | HTMLElement = document
  ): NodeListOf<T> {
    return parent.querySelectorAll(selector) as NodeListOf<T>;
  }

  /**
   * Add event listener with automatic cleanup
   */
  static addEventListener<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): () => void {
    element.addEventListener(type, listener, options);
    
    // Return cleanup function
    return () => {
      element.removeEventListener(type, listener, options);
    };
  }

  /**
   * Create element with attributes and content
   */
  static createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    attributes: Record<string, string> = {},
    content?: string | HTMLElement | HTMLElement[]
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    
    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    // Set content
    if (content) {
      if (typeof content === 'string') {
        element.textContent = content;
      } else if (content instanceof HTMLElement) {
        element.appendChild(content);
      } else if (Array.isArray(content)) {
        content.forEach(child => {
          if (child instanceof HTMLElement) {
            element.appendChild(child);
          }
        });
      }
    }

    return element;
  }

  /**
   * Toggle class with optional force parameter
   */
  static toggleClass(element: HTMLElement, className: string, force?: boolean): boolean {
    return element.classList.toggle(className, force);
  }

  /**
   * Check if element has class
   */
  static hasClass(element: HTMLElement, className: string): boolean {
    return element.classList.contains(className);
  }

  /**
   * Add multiple classes
   */
  static addClass(element: HTMLElement, ...classNames: string[]): void {
    element.classList.add(...classNames);
  }

  /**
   * Remove multiple classes
   */
  static removeClass(element: HTMLElement, ...classNames: string[]): void {
    element.classList.remove(...classNames);
  }

  /**
   * Get element's offset position
   */
  static getOffset(element: HTMLElement): { top: number; left: number } {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }

  /**
   * Smooth scroll to element
   */
  static scrollToElement(
    element: HTMLElement, 
    options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
  ): void {
    element.scrollIntoView(options);
  }

  /**
   * Check if element is in viewport
   */
  static isInViewport(element: HTMLElement, threshold: number = 0): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.right <= windowWidth + threshold
    );
  }

  /**
   * Debounce function calls
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate?: boolean
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      
      const callNow = immediate && !timeout;
      
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      
      if (callNow) func(...args);
    };
  }

  /**
   * Throttle function calls
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return function executedFunction(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Wait for element to exist in DOM
   */
  static waitForElement(
    selector: string, 
    timeout: number = 5000
  ): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector) as HTMLElement;
      
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Timeout fallback
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Copy text to clipboard
   */
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        return result;
      }
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
      return false;
    }
  }

  /**
   * Generate unique ID
   */
  static generateId(prefix: string = 'id'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Format file size
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Escape HTML to prevent XSS
   */
  static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}