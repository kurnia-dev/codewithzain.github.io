import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to replace material-symbols-outlined with Icon component
function replaceIconsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let hasChanges = false;
  
  // Check if Icon component is already imported
  const hasIconImport = content.includes("import Icon from '../components/Icon.astro'") || 
                       content.includes("import Icon from '../../components/Icon.astro'") ||
                       content.includes("import Icon from '../../../components/Icon.astro'");
  
  // Find material-symbols-outlined usage
  const materialSymbolRegex = /<span\s+class="material-symbols-outlined([^"]*)"[^>]*>([^<]+)<\/span>/g;
  
  let matches = [...content.matchAll(materialSymbolRegex)];
  
  if (matches.length > 0) {
    console.log(`Processing ${filePath}...`);
    
    // Add Icon import if not present
    if (!hasIconImport) {
      // Determine the correct import path based on file location
      const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, '../src/components/Icon.astro'));
      const importPath = relativePath.startsWith('.') ? relativePath : './' + relativePath;
      
      // Find the import section and add Icon import
      const importRegex = /(---\s*\n)([\s\S]*?)(---)/;
      const importMatch = content.match(importRegex);
      
      if (importMatch) {
        const existingImports = importMatch[2];
        const newImports = existingImports + `import Icon from '${importPath}';\n`;
        content = content.replace(importRegex, `$1${newImports}$3`);
        hasChanges = true;
      }
    }
    
    // Replace each material-symbols-outlined usage
    matches.forEach(match => {
      const fullMatch = match[0];
      const additionalClasses = match[1].trim();
      const iconName = match[2].trim();
      
      // Build the class attribute for Icon component
      let classAttr = '';
      if (additionalClasses) {
        classAttr = ` class="${additionalClasses}"`;
      }
      
      const replacement = `<Icon name="${iconName}"${classAttr} />`;
      content = content.replace(fullMatch, replacement);
      hasChanges = true;
      
      console.log(`  Replaced: ${iconName}`);
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✓ Updated ${filePath}`);
    }
  }
  
  return hasChanges;
}

// Function to scan and replace icons in directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let totalChanges = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      totalChanges += processDirectory(filePath);
    } else if (file.endsWith('.astro')) {
      if (replaceIconsInFile(filePath)) {
        totalChanges++;
      }
    }
  }
  
  return totalChanges;
}

// Main execution
function main() {
  const projectRoot = path.join(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  
  console.log('Replacing material-symbols-outlined with Icon component...\n');
  
  const changedFiles = processDirectory(srcDir);
  
  console.log(`\n✓ Completed! Updated ${changedFiles} files.`);
  
  if (changedFiles > 0) {
    console.log('\nNext steps:');
    console.log('1. Review the changes');
    console.log('2. Test your application');
    console.log('3. Run: node scripts/generate-icons.js (if you added new icons)');
  }
}

main();