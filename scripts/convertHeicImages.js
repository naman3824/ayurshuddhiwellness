/**
 * Script to convert HEIC images to JPG format
 * 
 * Note: This script requires the 'heic-convert' package to be installed:
 * npm install heic-convert
 * 
 * Usage: 
 * node scripts/convertHeicImages.js
 */

const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

async function main() {
  console.log('Starting HEIC to JPG conversion...');
  
  const galleryDir = path.join(process.cwd(), 'public/images/gallery');
  
  // Check if directory exists
  if (!fs.existsSync(galleryDir)) {
    console.warn('Gallery directory does not exist:', galleryDir);
    return;
  }
  
  // Get all files in the directory
  const files = fs.readdirSync(galleryDir);
  
  // Filter for HEIC files
  const heicFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.heic';
  });
  
  if (heicFiles.length === 0) {
    console.log('No HEIC files found in the gallery directory.');
    return;
  }
  
  console.log(`Found ${heicFiles.length} HEIC files to convert.`);
  
  // Process each HEIC file
  for (const file of heicFiles) {
    const inputPath = path.join(galleryDir, file);
    const outputPath = path.join(galleryDir, file.replace('.heic', '.jpg').replace('.HEIC', '.jpg'));
    
    // Check if JPG version already exists
    if (fs.existsSync(outputPath)) {
      console.log(`JPG version of ${file} already exists. Skipping.`);
      continue;
    }
    
    console.log(`Converting ${file} to JPG...`);
    
    try {
      // Read the HEIC file
      const inputBuffer = fs.readFileSync(inputPath);
      
      // Convert to JPEG
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.8
      });
      
      // Write the JPEG file
      fs.writeFileSync(outputPath, outputBuffer);
      
      console.log(`Successfully converted ${file} to JPG.`);
    } catch (error) {
      console.error(`Error converting ${file}:`, error);
    }
  }
  
  console.log('HEIC to JPG conversion completed.');
}

// Run the main function
main().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
}); 