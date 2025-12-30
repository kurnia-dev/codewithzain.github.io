import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
  
  // Additional icons found in project
  'grid_view': 'material-symbols:grid-view',
  'smartphone': 'material-symbols:smartphone',
  'dns': 'material-symbols:dns',
  'account_tree': 'material-symbols:account-tree',
  'bug_report': 'material-symbols:bug-report',
  'palette': 'material-symbols:palette',
  'description': 'material-symbols:description',
  'devices': 'material-symbols:devices',
  'cloud': 'material-symbols:cloud-outline',
  
  // Notification icons
  'check_circle': 'material-symbols:check-circle',
  'error': 'material-symbols:error',
  'warning': 'material-symbols:warning',
  'info': 'material-symbols:info',
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
          if (iconName && !iconName.includes('{') && !iconName.includes('$')) {
            icons.add(iconName);
          }
        });
      }
      
      // Find icon references in data/config
      const iconMatches = content.match(/icon:\s*["']([^"']+)["']/g);
      if (iconMatches) {
        iconMatches.forEach(match => {
          const iconName = match.match(/["']([^"']+)["']/)?.[1];
          if (iconName && !iconName.includes('{') && !iconName.includes('$')) {
            icons.add(iconName);
          }
        });
      }
    }
  }
  
  return icons;
}

// Fetch icon data from Iconify API
async function fetchIconData(iconName) {
  try {
    const response = await fetch(`https://api.iconify.design/${iconName}.svg`);
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn(`Failed to fetch icon: ${iconName}`);
  }
  return null;
}

// Generate CSS with SVG data URLs
async function generateIconCSS(usedIcons) {
  let css = `/* Iconify Icons - Generated automatically */\n`;
  css += `/* Only includes icons used in the project */\n\n`;
  
  for (const materialIcon of usedIcons) {
    const iconifyIcon = iconMapping[materialIcon];
    if (iconifyIcon) {
      console.log(`Fetching ${iconifyIcon}...`);
      const svgContent = await fetchIconData(iconifyIcon);
      
      if (svgContent) {
        const className = iconifyIcon.replace(':', '-');
        const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
        
        css += `.icon-${className} {\n`;
        css += `  display: inline-block;\n`;
        css += `  width: 1em;\n`;
        css += `  height: 1em;\n`;
        css += `  background-image: url("${dataUrl}");\n`;
        css += `  background-repeat: no-repeat;\n`;
        css += `  background-size: contain;\n`;
        css += `  background-position: center;\n`;
        css += `  vertical-align: middle;\n`;
        css += `}\n\n`;
      }
    } else {
      console.warn(`No mapping found for icon: ${materialIcon}`);
    }
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
  
  // Also generate the icon list for reference
  const iconList = Array.from(usedIcons).map(icon => ({
    material: icon,
    iconify: iconMapping[icon] || 'NOT_MAPPED'
  }));
  
  fs.writeFileSync(
    path.join(projectRoot, 'scripts/icon-mapping.json'),
    JSON.stringify(iconList, null, 2)
  );
}

main().catch(console.error);