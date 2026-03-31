import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next/types'
import EnhancedImageGrid from '../../../components/EnhancedImageGrid'
import { getGalleryImages } from '../../../utils/galleryUtils'
import { MandalaPattern } from '../../../components/MandalaDecoration'

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'en-IN' },
    { lang: 'hi' }
  ]
}

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
    <div className="tree-bg-optimized">
      {/* Dark gradient overlay to tone down background image exposure */}
      <div className="relative bg-gradient-to-b from-gray-800/70 to-gray-900/70">
        {/* Hero Section */}
        <div className="relative">
          <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center">
              {/* Badge */}
              <span className="inline-flex items-center rounded-full bg-primary-900/30 px-3 py-1 text-sm font-medium text-primary-300 ring-1 ring-inset ring-primary-700/10 mb-6">
                ✨ Visual Journey
              </span>
              
              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-gradient">
                Gallery
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Explore moments of wellness, healing, and transformation through our visual collection
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Description */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-center text-gray-300 mb-12 max-w-2xl mx-auto">
              Each image tells a story of transformation, healing, and the journey towards holistic wellness. 
              Discover the essence of Ayurveda through our captured moments.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="py-16 page-section">
          <div className="container mx-auto px-4">
            <EnhancedImageGrid images={galleryImages} />
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <p className="mt-4 text-lg text-gray-300">
              "Every picture captures the essence of our healing journey and the transformative power of Ayurveda."
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <blockquote className="text-center">
              <p className="text-xl italic text-gray-300">
                "Healing is not just about the body, but about the mind and spirit as well. 
                Each moment captured here represents a step towards complete wellness."
              </p>
              <footer className="mt-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700">AD</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">Meera Desai</p>
                    <p className="text-sm text-gray-400">Wellness Enthusiast</p>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}