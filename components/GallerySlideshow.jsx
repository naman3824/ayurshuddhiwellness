import { getGalleryImages } from '../utils/galleryUtils';
import Slideshow from './Slideshow';

export default function GallerySlideshow({ showOnAllPages = false, currentPath = '', images = null }) {
  // Use provided images or get all gallery images
  const galleryImages = images || getGalleryImages();
  
  // If no images are found, return null
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full">
      <Slideshow images={galleryImages} />
    </div>
  );
} 