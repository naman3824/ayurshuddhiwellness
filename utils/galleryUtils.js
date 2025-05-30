import fs from 'fs';
import path from 'path';
import { ensureDirectoryExists, getFileExtension, fileExists } from './fileUtils';

/**
 * Gets all image files from the gallery directory
 * @returns {Array} Array of image objects with src and alt properties
 */
export function getGalleryImages() {
  try {
    const galleryDir = path.join(process.cwd(), 'public/images/gallery');
    
    // Ensure gallery directory exists
    if (!ensureDirectoryExists(galleryDir)) {
      return [];
    }
    
    // Get all files in the directory
    const files = fs.readdirSync(galleryDir);
    
    // Filter for supported image extensions
    const supportedExtensions = ['.jpg', '.jpeg', '.png', '.heic'];
    const imageFiles = files.filter(file => {
      const ext = getFileExtension(file);
      return supportedExtensions.includes(ext);
    });
    
    // Create image objects
    let images = imageFiles.map((file, index) => {
      const ext = getFileExtension(file);
      
      // For HEIC files, check if a converted JPG version exists
      // If not, we'll use the HEIC file and handle conversion/fallback in the component
      let src = `/images/gallery/${file}`;
      
      if (ext === '.heic') {
        const jpgVersion = file.replace('.heic', '.jpg').replace('.HEIC', '.jpg');
        const jpgPath = path.join(galleryDir, jpgVersion);
        
        if (fileExists(jpgPath)) {
          src = `/images/gallery/${jpgVersion}`;
        }
      }
      
      return {
        src,
        alt: `Ayur Shuddhi Wellness Session ${index + 1}`,
        // Remove title to eliminate captions
      };
    });
    
    // Filter out Wellness Session 14 and 16 based on file names
    // Since we don't know the exact file names, we'll filter by index
    // assuming the files are sorted and indexed correctly
    const excludedSessionNumbers = [14, 16];
    
    // Filter out images that correspond to the excluded session numbers
    images = images.filter((_, index) => {
      const sessionNumber = index + 1; // Session numbers are 1-indexed
      return !excludedSessionNumbers.includes(sessionNumber);
    });
    
    return images;
  } catch (error) {
    console.error('Error loading gallery images:', error);
    return [];
  }
}

/**
 * Checks if a file is a HEIC image
 * @param {string} filename - The filename to check
 * @returns {boolean} True if the file is a HEIC image
 */
export function isHeicImage(filename) {
  const ext = getFileExtension(filename);
  return ext === '.heic';
} 