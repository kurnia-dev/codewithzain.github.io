// Icon mapping utility untuk mengkonversi nama Material Symbols ke CSS class Iconify
export const iconToCssClass = (iconName: string): string => {
  const iconMapping: Record<string, string> = {
    // Navigation & UI
    'mail': 'material-symbols-mail-outline',
    'close': 'material-symbols-close',
    'download': 'material-symbols-download',
    'code': 'material-symbols-code',
    'work': 'material-symbols-work-outline',
    'search_off': 'material-symbols-search-off',
    'home': 'material-symbols-home-outline',
    'arrow_back': 'material-symbols-arrow-back',
    'dark_mode': 'material-symbols-dark-mode',
    'light_mode': 'material-symbols-light-mode',
    'share': 'material-symbols-share-outline',
    'favorite': 'material-symbols-favorite-outline',
    'bookmark': 'material-symbols-bookmark-outline',
    'verified': 'material-symbols-verified',
    'language': 'material-symbols-language',
    'chevron_left': 'material-symbols-chevron-left',
    'chevron_right': 'material-symbols-chevron-right',
    'search': 'material-symbols-search',
    'content_copy': 'material-symbols-content-copy',
    'public': 'material-symbols-public',
    'rss_feed': 'material-symbols-rss-feed',
    'alternate_email': 'material-symbols-alternate-email',
    'calendar_today': 'material-symbols-calendar-today',
    'schedule': 'material-symbols-schedule',
    'rocket_launch': 'material-symbols-rocket-launch',
    
    // Social Media Icons
    'github': 'mdi-github',
    'linkedin': 'mdi-linkedin',
    'email': 'material-symbols-mail-outline',
    
    // Additional icons
    'grid_view': 'material-symbols-grid-view',
    'smartphone': 'material-symbols-smartphone',
    'dns': 'material-symbols-dns',
    'account_tree': 'material-symbols-account-tree',
    'bug_report': 'material-symbols-bug-report',
    'palette': 'material-symbols-palette',
    'description': 'material-symbols-description',
    'devices': 'material-symbols-devices',
    'cloud': 'material-symbols-cloud-outline',
    
    // Notification icons
    'check_circle': 'material-symbols-check-circle',
    'error': 'material-symbols-error',
    'warning': 'material-symbols-warning',
    'info': 'material-symbols-info',
  };

  return iconMapping[iconName] || `material-symbols-${iconName}`;
};

// Helper function untuk menggunakan di template
export const getIconClass = (iconName: string, additionalClasses: string = ''): string => {
  const baseClass = `icon-${iconToCssClass(iconName)}`;
  return additionalClasses ? `${baseClass} ${additionalClasses}` : baseClass;
};