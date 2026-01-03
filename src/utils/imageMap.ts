// Import all blog images
import codeSnippetImage from '../assets/images/blog/code-snippet-demo.jpg';

// Map image paths to imported assets
export const imageMap: Record<string, any> = {
  '/src/assets/images/blog/code-snippet-demo.jpg': codeSnippetImage,
};

// Helper function to get optimized image asset
export function getImageAsset(imagePath: string) {
  return imageMap[imagePath] || imagePath;
}

// Helper function to check if image is local asset
export function isLocalAsset(imagePath: string): boolean {
  return imagePath.startsWith('/src/assets/');
}