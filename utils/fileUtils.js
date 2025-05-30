import fs from 'fs';
import path from 'path';

/**
 * Ensures that a directory exists, creating it if necessary
 * @param {string} dirPath - The path of the directory to ensure exists
 * @returns {boolean} True if the directory exists or was created successfully
 */
export function ensureDirectoryExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
    return true;
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
    return false;
  }
}

/**
 * Gets the file extension from a filename
 * @param {string} filename - The filename to get the extension from
 * @returns {string} The file extension (including the dot)
 */
export function getFileExtension(filename) {
  return path.extname(filename).toLowerCase();
}

/**
 * Checks if a file exists
 * @param {string} filePath - The path of the file to check
 * @returns {boolean} True if the file exists
 */
export function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(`Error checking if file exists ${filePath}:`, error);
    return false;
  }
} 