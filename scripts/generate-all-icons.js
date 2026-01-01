import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Material Symbols to Iconify mapping
const iconMapping = {
  // Navigation & UI
  mail: "material-symbols:mail-outline",
  close: "material-symbols:close",
  download: "material-symbols:download",
  code: "material-symbols:code",
  work: "material-symbols:work-outline",
  search_off: "material-symbols:search-off",
  home: "material-symbols:home-outline",
  arrow_back: "material-symbols:arrow-back",
  dark_mode: "material-symbols:dark-mode",
  light_mode: "material-symbols:light-mode",
  share: "material-symbols:share-outline",
  favorite: "material-symbols:favorite-outline",
  bookmark: "material-symbols:bookmark-outline",
  verified: "material-symbols:verified",
  language: "material-symbols:language",
  chevron_left: "material-symbols:chevron-left",
  chevron_right: "material-symbols:chevron-right",
  search: "material-symbols:search",
  content_copy: "material-symbols:content-copy",
  public: "material-symbols:public",
  rss_feed: "material-symbols:rss-feed",
  alternate_email: "material-symbols:alternate-email",
  calendar_today: "material-symbols:calendar-today",
  schedule: "material-symbols:schedule",
  rocket_launch: "material-symbols:rocket-launch",

  // Additional icons
  grid_view: "material-symbols:grid-view",
  smartphone: "material-symbols:smartphone",
  dns: "material-symbols:dns",
  account_tree: "material-symbols:account-tree",
  bug_report: "material-symbols:bug-report",
  palette: "material-symbols:palette",
  description: "material-symbols:description",
  devices: "material-symbols:devices",
  cloud: "material-symbols:cloud-outline",

  // Notification icons
  check_circle: "material-symbols:check-circle",
  error: "material-symbols:error",
  warning: "material-symbols:warning",
  info: "material-symbols:info",

  // Social Media Icons
  github: "mdi:github",
  linkedin: "mdi:linkedin",
};

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

// Generate CSS with mask approach for currentColor support
async function generateIconCSS(icons) {
  let css = `/* Iconify Icons - Generated automatically */\n`;
  css += `/* Uses CSS mask for currentColor support */\n\n`;

  for (const icon of icons) {
    const iconifyIcon = iconMapping[icon];
    if (iconifyIcon) {
      console.log(`Fetching ${iconifyIcon}...`);
      const svgContent = await fetchIconData(iconifyIcon);

      if (svgContent) {
        const className = iconifyIcon.replace(":", "-");

        // Remove fill attributes and colors from SVG for mask usage
        const cleanSvg = svgContent
          .replace(/fill="[^"]*"/g, "")
          .replace(/fill:[^;"]*/g, "")
          .replace(/currentColor/g, "");

        const dataUrl = `data:image/svg+xml,${encodeURIComponent(cleanSvg)}`;

        css += `.icon-${className} {\n`;
        css += `  display: inline-block;\n`;
        css += `  width: 1em;\n`;
        css += `  height: 1em;\n`;
        css += `  background-color: currentColor;\n`;
        css += `  mask-image: url("${dataUrl}");\n`;
        css += `  -webkit-mask-image: url("${dataUrl}");\n`;
        css += `  mask-repeat: no-repeat;\n`;
        css += `  -webkit-mask-repeat: no-repeat;\n`;
        css += `  mask-size: contain;\n`;
        css += `  -webkit-mask-size: contain;\n`;
        css += `  mask-position: center;\n`;
        css += `  -webkit-mask-position: center;\n`;
        css += `  vertical-align: middle;\n`;
        css += `}\n\n`;
      }
    } else {
      console.warn(`No mapping found for icon: ${icon}`);
    }
  }

  return css;
}

// Main execution
async function main() {
  const projectRoot = path.join(__dirname, "..");

  console.log(
    "Generating CSS for all project icons with currentColor support...\n"
  );

  const icons = Object.keys(iconMapping)
  const css = await generateIconCSS(icons);

  // Write CSS file
  const cssPath = path.join(projectRoot, "src/styles/icons.css");
  fs.writeFileSync(cssPath, css);

  console.log(`Generated optimized icon CSS: ${cssPath}`);
  console.log(`Total icons: ${icons.length}`);
  console.log(`✅ Icons now support currentColor!`);
}

main().catch(console.error);
