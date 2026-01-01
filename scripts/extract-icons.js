import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getIconData } from '@iconify/utils';
import { locate } from '@iconify/json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Material Symbols to Iconify mapping
const iconMapping = {
  // Navigation & UI
  'mail': 'material-symbols:mail-outline',
  'close': 'material-symbols:close',
  'download': 'material-symbols:download',
  'code': 'material-symbols:code',
  'work': 'material-symbols:work-outline',
  'search_off': 'material-symbols:search-off',
  'home': 'material-symbols:home-outline',
  'arrow_back': 'material-symbols:arrow-back',
  'dark_mode': 'material-symbols:dark-mode',
  'light_mode': 'material-symbols:light-mode',
  'share': 'material-symbols:share-outline',
  'favorite': 'material-symbols:favorite-outline',
  'bookmark': 'material-symbols:bookmark-outline',
  'verified': 'material-symbols:verified',
  'language': 'material-symbols:language',
  'chevron_left': 'material-symbols:chevron-left',
  'chevron_right': 'material-symbols:chevron-right',
  'search': 'material-symbols:search',
  'content_copy': 'material-symbols:content-copy',
  'public': 'material-symbols:public',
  'rss_feed': 'material-symbols:rss-feed',
  'alternate_email': 'material-symbols:alternate-email',
  'calendar_today': 'material-symbols:calendar-today',
  'schedule': 'material-symbols:schedule',
  'rocket_launch': 'material-symbols:rocket-launch',
  
  // Social Media Icons
  'github': 'mdi:github',
  'linkedin': 'mdi:linkedin',
  'email': 'material-symbols:mail-outline',
  
  // Additional icons used in the project
  'grid_view': 'material-symbols:grid-view',
  'smartphone': 'material-symbols:smartphone',
  'dns': 'material-symbols:dns',
  'account_tree': 'material-symbols:account-tree',
  'bug_report': 'material-symbols:bug-report',
  'palette': 'material-symbols:palette',
  'description': 'material-symbols:description',
  'devices': 'material-symbols:devices',
  'cloud': 'material-symbols:cloud-outline',
  
  // Categories/Topics (common ones)
  'javascript': 'logos:javascript',
  'react': 'logos:react',
  'vue': 'logos:vue',
  'angular': 'logos:angular-icon',
  'nodejs': 'logos:nodejs-icon',
  'python': 'logos:python',
  'database': 'material-symbols:database-outline',
  'api': 'material-symbols:api',
  'security': 'material-symbols:security',
  'performance': 'material-symbols:speed',
  'mobile': 'material-symbols:smartphone',
  'web': 'material-symbols:web',
  'ai': 'material-symbols:psychology-outline',
  'tutorial': 'material-symbols:school-outline',
  'tips': 'material-symbols:lightbulb-outline',
};

// Function to scan files for icon usage
function scanForIcons(dir, icons = new Set()) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanForIcons(filePath, icons);
    } else if (file.endsWith('.astro') || file.endsWith('.ts') || file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Find material-symbols-outlined usage
      const materialSymbolMatches = content.match(/material-symbols-outlined[^>]*>([^<]+)</g);
      if (materialSymbolMatches) {
        materialSymbolMatches.forEach(match => {
          const iconName = match.match(/>([^<]+)</)?.[1]?.trim();
          if (iconName) {
            icons.add(iconName);
          }
        });
      }
      
      // Find Icon component usage
      const iconComponentMatches = content.match(/<Icon\s+name=["']([^"']+)["']/g);
      if (iconComponentMatches) {
        iconComponentMatches.forEach(match => {
          const iconName = match.match(/name=["']([^"']+)["']/)?.[1];
          if (iconName) {
            icons.add(iconName);
          }
        });
      }
    }
  }
  
  return icons;
}

// Generate optimized icon CSS
async function generateIconCSS(usedIcons) {
  let css = `/* Iconify Icons - Generated automatically */\n`;
  css += `/* Only includes icons used in the project */\n\n`;
  
  const iconData = {};
  
  for (const materialIcon of usedIcons) {
    const iconifyIcon = iconMapping[materialIcon];
    if (iconifyIcon) {
      const [collection, iconName] = iconifyIcon.split(':');
      
      try {
        // Get icon data from @iconify/json
        const collectionPath = locate(collection);
        if (collectionPath) {
          const collectionData = JSON.parse(fs.readFileSync(collectionPath, 'utf-8'));
          const icon = getIconData(collectionData, iconName);
          
          if (icon) {
            iconData[iconifyIcon] = icon;
          }
        }
      } catch (error) {
        console.warn(`Could not load icon: ${iconifyIcon}`);
      }
    } else {
      console.warn(`No mapping found for icon: ${materialIcon}`);
    }
  }
  
  // Generate CSS for each icon
  for (const [iconName, icon] of Object.entries(iconData)) {
    const className = iconName.replace(':', '-');
    const svgContent = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${icon.width || 24}" height="${icon.height || 24}" viewBox="${icon.viewBox || '0 0 24 24'}">${icon.body}</svg>`
    )}`;
    
    css += `.icon-${className} {\n`;
    css += `  display: inline-block;\n`;
    css += `  width: 1em;\n`;
    css += `  height: 1em;\n`;
    css += `  background-image: url("${svgContent}");\n`;
    css += `  background-repeat: no-repeat;\n`;
    css += `  background-size: contain;\n`;
    css += `  background-position: center;\n`;
    css += `}\n\n`;
  }
  
  return css;
}

// Main execution
async function main() {
  const projectRoot = path.join(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  
  console.log('Scanning for used icons...');
  const usedIcons = scanForIcons(srcDir);
  
  console.log('Found icons:', Array.from(usedIcons));
  
  console.log('Generating optimized CSS...');
  const css = await generateIconCSS(usedIcons);
  
  // Write CSS file
  const cssPath = path.join(projectRoot, 'src/styles/icons.css');
  fs.writeFileSync(cssPath, css);
  
  console.log(`Generated optimized icon CSS: ${cssPath}`);
  console.log(`Total icons: ${usedIcons.size}`);
}

main().catch(console.error);