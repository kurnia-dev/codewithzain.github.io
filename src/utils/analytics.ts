// Analytics utility functions
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export class Analytics {
  private static instance: Analytics;
  private isEnabled: boolean = true;

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public track(eventName: string, properties: Record<string, any> = {}): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      }
    };

    // Log to console for debugging
    console.log('Analytics Event:', event);

    // Send to Google Analytics if available
    this.sendToGoogleAnalytics(event);

    // Send to custom analytics service
    this.sendToCustomAnalytics(event);
  }

  private sendToGoogleAnalytics(event: AnalyticsEvent): void {
    if (typeof gtag !== 'undefined') {
      gtag('event', event.name, event.properties);
    }
  }

  private sendToCustomAnalytics(event: AnalyticsEvent): void {
    // Here you can send to your custom analytics service
    // Example: Plausible, Mixpanel, Amplitude, etc.
    
    // Example with fetch to custom endpoint:
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // }).catch(console.error);
  }

  public disable(): void {
    this.isEnabled = false;
  }

  public enable(): void {
    this.isEnabled = true;
  }
}

// Convenience function for tracking events
export const trackEvent = (eventName: string, properties: Record<string, any> = {}): void => {
  Analytics.getInstance().track(eventName, properties);
};

// Common event tracking functions
export const trackPageView = (pageName: string, additionalProps: Record<string, any> = {}): void => {
  trackEvent('page_view', {
    page_name: pageName,
    ...additionalProps
  });
};

export const trackClick = (elementName: string, additionalProps: Record<string, any> = {}): void => {
  trackEvent('click', {
    element: elementName,
    ...additionalProps
  });
};

export const trackFormSubmit = (formName: string, additionalProps: Record<string, any> = {}): void => {
  trackEvent('form_submit', {
    form_name: formName,
    ...additionalProps
  });
};

export const trackDownload = (fileName: string, additionalProps: Record<string, any> = {}): void => {
  trackEvent('download', {
    file_name: fileName,
    ...additionalProps
  });
};

export const trackSearch = (query: string, additionalProps: Record<string, any> = {}): void => {
  trackEvent('search', {
    search_query: query,
    ...additionalProps
  });
};