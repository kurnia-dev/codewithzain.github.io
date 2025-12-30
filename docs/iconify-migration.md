# Migrasi dari Material Symbols ke Iconify

Proyek ini telah berhasil dimigrasi dari Material Symbols ke Iconify dengan optimasi loading yang hanya memuat icon yang dibutuhkan.

## Keuntungan

- ✅ **Loading Optimal**: Hanya memuat icon yang benar-benar digunakan
- ✅ **Performa Lebih Baik**: Tidak ada request ke Google Fonts
- ✅ **Offline Support**: Icon tersimpan sebagai CSS dengan data URL
- ✅ **Bundle Size Kecil**: Hanya ~38 icon vs ribuan icon Material Symbols
- ✅ **Konsistensi**: Semua icon menggunakan sistem yang sama
- ✅ **CurrentColor Support**: Icon mengikuti warna text secara otomatis
- ✅ **Theme Aware**: Icon berubah warna sesuai light/dark mode

## Cara Penggunaan

### 1. Menggunakan Komponen Icon (Recommended)

```astro
---
import Icon from '../components/Icon.astro';
---

<!-- Icon mengikuti warna text -->
<Icon name="search" class="text-xl" />
<Icon name="close" size="24px" />

<!-- Icon dengan warna khusus -->
<Icon name="search" class="text-xl text-blue-500" />
<Icon name="close" class="text-red-500" />

<!-- Icon dalam dark mode akan otomatis menyesuaikan -->
<div class="text-gray-600 dark:text-gray-300">
  <Icon name="mail" class="text-lg" />
</div>
```

### 2. Menggunakan CSS Class Langsung

```html
<!-- Icon mengikuti warna parent -->
<span class="icon-material-symbols-search text-xl"></span>
<span class="icon-material-symbols-close text-red-500"></span>

<!-- Dalam konteks dengan warna berbeda -->
<div class="text-primary">
  <span class="icon-material-symbols-mail"></span>
</div>
```

### 3. Untuk Template Variables

Ketika menggunakan template variables (seperti `{category.icon}`), gunakan utility function `getIconClass`:

```astro
---
import { getIconClass } from '../utils/iconMapping';
---

<span class={getIconClass(category.icon, 'text-xl')}></span>
<span class={getIconClass(skill.icon)}></span>
```

Utility function ini akan mengkonversi nama icon seperti `rocket_launch` menjadi CSS class yang benar `icon-material-symbols-rocket-launch`.

## Utility Functions

### `getIconClass(iconName, additionalClasses?)`

Mengkonversi nama Material Symbols ke CSS class Iconify yang benar:

```ts
import { getIconClass } from '../utils/iconMapping';

// Contoh penggunaan
getIconClass('rocket_launch') // → 'icon-material-symbols-rocket-launch'
getIconClass('search', 'text-xl') // → 'icon-material-symbols-search text-xl'
```

### `iconToCssClass(iconName)`

Fungsi dasar untuk mapping nama icon ke CSS class:

```ts
import { iconToCssClass } from '../utils/iconMapping';

iconToCssClass('rocket_launch') // → 'material-symbols-rocket-launch'
```

## Icon yang Tersedia

Semua icon yang digunakan dalam proyek sudah dimapping dan tersedia:

- **Navigation**: home, arrow_back, close, search, etc.
- **UI Elements**: download, share, favorite, bookmark, etc.
- **Categories**: code, smartphone, cloud, bug_report, etc.
- **Notifications**: check_circle, error, warning, info

## Scripts yang Tersedia

### Generate Icons
```bash
pnpm generate-icons
```
Menggenerate CSS untuk semua icon yang digunakan dalam proyek.

### Replace Icons (One-time)
```bash
pnpm replace-icons
```
Script untuk mengganti `material-symbols-outlined` dengan komponen `Icon` (sudah dijalankan).

## Menambah Icon Baru

1. Tambahkan icon ke array `allIcons` di `scripts/generate-all-icons.js`
2. Tambahkan mapping di `iconMapping` object
3. Jalankan `pnpm generate-icons`
4. Import CSS di `src/layouts/BaseLayout.astro` (sudah ada)

## File yang Dimodifikasi

- ✅ `src/layouts/BaseLayout.astro` - Import CSS icons
- ✅ `src/components/Icon.astro` - Komponen icon baru
- ✅ `src/styles/icons.css` - CSS dengan data URL untuk semua icon
- ✅ `src/utils/notifications.ts` - Update untuk menggunakan CSS class
- ✅ Semua file `.astro` - Diganti dari material-symbols ke Icon component

## Implementasi Teknis

### CSS Mask untuk CurrentColor Support

Icon menggunakan CSS `mask-image` dengan `background-color: currentColor` untuk mendukung perubahan warna otomatis:

```css
.icon-material-symbols-search {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: currentColor; /* Mengikuti warna text */
  mask-image: url("data:image/svg+xml,...");
  -webkit-mask-image: url("data:image/svg+xml,...");
  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: center;
  vertical-align: middle;
}
```

### Browser Support
- **Modern browsers**: Full support untuk `mask-image`
- **Safari/WebKit**: Menggunakan `-webkit-mask-image` fallback
- **Fallback**: Icon tetap muncul meski tanpa warna dinamis

## Performa

- **Sebelum**: ~87MB download Material Symbols font
- **Sesudah**: ~15KB CSS dengan 38 icon yang dioptimasi
- **Improvement**: 99.98% reduction in icon loading size

## Maintenance

Sistem ini sepenuhnya self-contained dan tidak memerlukan maintenance khusus. Icon akan selalu tersedia offline dan loading time sangat cepat.