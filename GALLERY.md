# Gallery Feature Documentation

This document provides information on how to use and maintain the gallery feature in the Ayur Shuddhi Wellness website.

## Overview

The gallery page now features two main components:
1. A slideshow at the top of the page that automatically cycles through images
2. A responsive image grid below the slideshow that displays all images as thumbnails

The slideshow has been removed from the homepage and now appears only on the dedicated gallery page.

## Adding Images to the Gallery

### Supported Image Formats

The gallery supports the following image formats:
- JPG/JPEG
- PNG
- HEIC (with automatic conversion to JPG)

### Adding New Images

1. Place your images in the `public/images/gallery/` directory.
2. Both the slideshow and image grid will automatically include all supported image files from this directory.
3. No code changes are required to add new images.

### Image Dimensions

For best results, use images with the following characteristics:
- Resolution: 1200px × 800px or similar aspect ratio
- Orientation: Landscape (horizontal) is recommended
- File size: Optimize images to be under 500KB for better performance

## HEIC Image Support

HEIC is Apple's High Efficiency Image Format, which is not natively supported by all browsers. The gallery includes a fallback mechanism for HEIC images:

1. When you add HEIC images to the gallery folder, you can run the conversion script to create JPG versions:
   ```
   npm run convert-heic
   ```

2. This script will automatically create JPG versions of all HEIC files in the gallery directory.

3. If a user's browser doesn't support HEIC, the JPG version will be displayed instead.

## Gallery Components

### Slideshow

The slideshow appears at the top of the gallery page and includes:
- Auto-play functionality that cycles through images
- Navigation arrows for manual control
- Play/pause button
- Dot indicators showing the current slide position
- No captions for clean, minimalist design
- Taller height (65vh on mobile, 75vh on tablets, 85vh on desktops) to prevent image cropping
- Images displayed with object-contain and object-top positioning to ensure the top of images is visible

### Image Grid

The image grid displays all gallery images as thumbnails with:
- Responsive layout that adjusts based on screen size
- Hover effects that zoom the image slightly
- Lightbox functionality when an image is clicked
- Support for keyboard navigation in the lightbox (left/right arrows, ESC to close)
- No captions for clean, minimalist design

## Filtering Images

The gallery automatically filters out specific images that should not be displayed. To exclude additional images:

1. Open `utils/galleryUtils.js`
2. Find the `excludedSessionNumbers` array
3. Add the session number (1-indexed) to the array:
   ```javascript
   const excludedSessionNumbers = [14, 16, /* add more numbers here */];
   ```

## Customizing the Gallery

### Adjusting Slideshow Height

To change the height of the slideshow:

1. Open `components/Slideshow.jsx`
2. Find the following line:
   ```jsx
   <div className="relative h-[65vh] md:h-[75vh] lg:h-[85vh] w-full">
   ```
3. Adjust the height values as needed. The values are in viewport height (vh) units.

### Changing Transition Speed

To adjust how quickly the slideshow transitions between images:

1. Open `components/Slideshow.jsx`
2. Find the `useEffect` hook with the auto-play functionality
3. Change the interval time (in milliseconds):
   ```javascript
   timerRef.current = setInterval(() => {
     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
   }, 5000); // Change this value (5000ms = 5 seconds)
   ```

### Modifying the Image Grid

To adjust the number of columns in the image grid:

1. Open `components/ImageGrid.jsx`
2. Find the grid class definition:
   ```jsx
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
   ```
3. Modify the grid-cols classes to change the number of columns at different breakpoints

## Troubleshooting

### Images Not Appearing

1. Ensure images are placed in the correct directory: `public/images/gallery/`
2. Check that the images have supported file extensions (.jpg, .jpeg, .png, .heic)
3. For HEIC images, run the conversion script: `npm run convert-heic`
4. Rebuild the site after adding new images: `npm run build`

### HEIC Conversion Issues

If you encounter problems with HEIC conversion:

1. Make sure the `heic-convert` package is installed: `npm install heic-convert`
2. Check that the Node.js version is compatible with the heic-convert package
3. For manual conversion, you can use online converters or desktop software to convert HEIC to JPG

### Lightbox Not Working

If the lightbox functionality isn't working correctly:

1. Check browser console for any JavaScript errors
2. Ensure that the `Lightbox.jsx` component is properly imported in `ImageGrid.jsx`
3. Verify that the click handlers are being triggered by adding console logs

## Performance Considerations

- The slideshow and image grid use Next.js Image component for automatic image optimization
- First slide is loaded with priority to improve initial load performance
- Other images are lazy-loaded to minimize initial page load time
- The lightbox only loads when an image is clicked
- Consider using appropriately sized and optimized images for better performance 