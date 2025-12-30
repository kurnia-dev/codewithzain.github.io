# Theme System Architecture

Sistem theme telah direfactor untuk menggunakan arsitektur yang lebih modular dan event-driven.

## Arsitektur

### 1. BaseLayout (Initial Setup)
- **Tanggung jawab**: Hanya menangani initial theme setup dan mencegah FOUC
- **Tidak menangani**: Toggle logic atau event handling
- **Script**: Inline script untuk performa optimal

### 2. ThemeToggle Component (Self-Contained)
- **Tanggung jawab**: Menangani semua logic toggle theme
- **Features**:
  - Self-contained dengan internal state management
  - Icon switching otomatis
  - Custom event dispatching
  - Event listening untuk sinkronisasi

### 3. Event-Driven Communication
- **Custom Event**: `theme-changed`
- **Payload**: `{ theme: 'light' | 'dark' }`
- **Benefit**: Komponen lain bisa listen tanpa coupling

## Keuntungan Arsitektur Baru

### ✅ Separation of Concerns
- BaseLayout: Initial setup
- ThemeToggle: Toggle logic
- Other components: Event listeners

### ✅ No Manual DOM Queries
- Tidak ada `document.querySelector` manual
- Setiap component mengelola DOM-nya sendiri
- Event-driven communication

### ✅ Self-Contained Components
- ThemeToggle tidak bergantung pada external logic
- Icon switching handled internally
- State management internal

### ✅ Extensible
- Component lain bisa listen `theme-changed` event
- Easy to add new theme-aware components

## Cara Kerja

### Initial Load
1. BaseLayout inline script runs first (prevent FOUC)
2. ThemeToggle component initializes
3. ThemeToggle reads current theme and updates icon

### Theme Toggle
1. User clicks ThemeToggle button
2. ThemeToggle updates internal state
3. ThemeToggle applies theme to DOM
4. ThemeToggle updates icon
5. ThemeToggle dispatches `theme-changed` event
6. Other components can listen and react

### Adding Theme-Aware Components

```astro
<script>
  class MyThemeAwareComponent {
    constructor() {
      // Listen for theme changes
      window.addEventListener('theme-changed', this.handleThemeChange.bind(this));
    }

    handleThemeChange(event) {
      const { theme } = event.detail;
      // React to theme change
      console.log('Theme changed to:', theme);
    }
  }
</script>
```

## Implementation Details

### ThemeToggle Icon Switching
```typescript
private updateIcon(theme: string): void {
  if (!this.icon) return;
  
  // Remove all existing icon classes
  this.icon.className = this.icon.className.replace(/icon-[^\s]+/g, '').trim();
  
  // Add new icon class
  const iconName = theme === 'dark' ? 'light_mode' : 'dark_mode';
  const iconMapping: Record<string, string> = {
    'light_mode': 'icon-material-symbols-light-mode',
    'dark_mode': 'icon-material-symbols-dark-mode'
  };
  
  this.icon.className = `theme-icon ${iconMapping[iconName]}`;
}
```

### Custom Event Dispatching
```typescript
// Dispatch theme change event
window.dispatchEvent(new CustomEvent('theme-changed', { 
  detail: { theme: this.currentTheme } 
}));
```

## Migration Benefits

- **Before**: Manual DOM queries, tightly coupled components
- **After**: Event-driven, self-contained, modular architecture
- **Performance**: Same or better (no unnecessary DOM queries)
- **Maintainability**: Much easier to extend and modify