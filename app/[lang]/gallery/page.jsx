import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import EnhancedImageGrid from '../../../components/EnhancedImageGrid'
import { getGalleryImages } from '../../../utils/galleryUtils'
import { MandalaPattern } from '../../../components/MandalaDecoration'

export async function generateMetadata({ params }) {
  return {
    title: 'Gallery - Ayur Shuddhi Wellness',
    description: 'Explore our gallery of past consultations and wellness sessions across India.',
  };
}

export default function GalleryPage({ params }) {
  // Get gallery images
  const galleryImages = getGalleryImages();
  
  return (
    <div className="bg-gradient-to-br from-ivory-100 via-ivory-50 to-sage-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary-50 to-ivory-100 dark:from-gray-800 dark:to-gray-900">
        <MandalaPattern />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center page-hero">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10 mb-6 dark:bg-primary-900/30 dark:text-primary-300">
              Our Memories
            </span>
            <h1 className="text-4xl font-display font-bold tracking-tight text-gradient-indian sm:text-5xl">
              Our Wellness Journey in Pictures
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Explore our collection of moments from wellness sessions, consultations, and healing journeys across India.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Gallery Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 page-section">
        <h2 className="text-3xl font-display font-bold tracking-tight text-gradient-indian mb-12 text-center">
          Wellness Gallery
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Click on any image to view it in full size and browse through our wellness journey.
        </p>
        <EnhancedImageGrid images={galleryImages} />
      </div>

      {/* Testimonial Section */}
      <div className="bg-gradient-to-b from-ivory-50 to-sage-100 dark:from-gray-900 dark:to-gray-800 py-16 page-section">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-display font-bold tracking-tight text-gradient-indian">
              Experiences That Transform
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our clients share their journeys of healing and transformation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="card p-8 text-center hover-lift">
              <div className="flex justify-center mb-4">
                <svg className="h-8 w-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <p className="text-xl italic text-gray-600 dark:text-gray-300">
                &ldquo;The photographs cannot capture the profound sense of peace and wellness I experienced during my Ayurvedic consultation. 
                Acharya Abbhiraath&apos;s approach to healing has completely transformed my understanding of health.&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gradient-saffron flex items-center justify-center text-white font-bold shadow-glow">
                  M
                </div>
                <div className="ml-4 text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Meera Desai</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}