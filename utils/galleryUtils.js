/**
 * Gets all image files from the gallery directory
 * For static builds, we'll use a predefined list of images
 * @returns {Array} Array of image objects with src and alt properties
 */
export function getGalleryImages() {
  // Static list of gallery images for build compatibility
  const galleryImages = [
    { src: '/images/gallery/IMG_7102.JPG', alt: 'Ayur Shuddhi Wellness Session 1' },
    { src: '/images/gallery/IMG_7104.JPG', alt: 'Ayur Shuddhi Wellness Session 2' },
    { src: '/images/gallery/IMG_7106.JPG', alt: 'Ayur Shuddhi Wellness Session 3' },
    { src: '/images/gallery/IMG_7108.JPG', alt: 'Ayur Shuddhi Wellness Session 4' },
    { src: '/images/gallery/IMG_7116.JPG', alt: 'Ayur Shuddhi Wellness Session 5' },
    { src: '/images/gallery/IMG_7118.JPG', alt: 'Ayur Shuddhi Wellness Session 6' },
    { src: '/images/gallery/IMG_7119.JPG', alt: 'Ayur Shuddhi Wellness Session 7' },
    { src: '/images/gallery/IMG_7120.JPG', alt: 'Ayur Shuddhi Wellness Session 8' },
    { src: '/images/gallery/IMG_7121.JPG', alt: 'Ayur Shuddhi Wellness Session 9' },
    { src: '/images/gallery/IMG_7122.JPG', alt: 'Ayur Shuddhi Wellness Session 10' },
    { src: '/images/gallery/IMG_7127.JPG', alt: 'Ayur Shuddhi Wellness Session 11' },
    { src: '/images/gallery/IMG_7135.JPG', alt: 'Ayur Shuddhi Wellness Session 12' },
    { src: '/images/gallery/IMG_7140.JPG', alt: 'Ayur Shuddhi Wellness Session 13' },
    { src: '/images/gallery/IMG_7156.JPG', alt: 'Ayur Shuddhi Wellness Session 15' },
    { src: '/images/gallery/IMG_7159.PNG', alt: 'Ayur Shuddhi Wellness Session 17' },
    { src: '/images/gallery/IMG_7160.PNG', alt: 'Ayur Shuddhi Wellness Session 18' },
    { src: '/images/gallery/IMG_7161.PNG', alt: 'Ayur Shuddhi Wellness Session 19' },
    { src: '/images/gallery/IMG_7171.JPG', alt: 'Ayur Shuddhi Wellness Session 20' },
    { src: '/images/gallery/IMG_7174.JPG', alt: 'Ayur Shuddhi Wellness Session 21' },
    { src: '/images/gallery/IMG_7177.JPG', alt: 'Ayur Shuddhi Wellness Session 22' },
    { src: '/images/gallery/IMG_7179.JPG', alt: 'Ayur Shuddhi Wellness Session 23' },
  ];
  
  return galleryImages;
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