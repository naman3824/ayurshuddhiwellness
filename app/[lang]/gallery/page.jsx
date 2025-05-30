import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import GallerySlideshow from '../../../components/GallerySlideshow'
import ImageGrid from '../../../components/ImageGrid'
import { getGalleryImages } from '../../../utils/galleryUtils'

export const metadata = {
  title: 'Gallery - Ayur Shuddhi Wellness',
  description: 'Explore our gallery of past consultations and wellness sessions across India.',
}

export default function GalleryPage({ params }) {
  // Get gallery images
  const galleryImages = getGalleryImages();
  
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10 mb-6 animate-fade-in dark:bg-primary-900/30 dark:text-primary-300">
              Our Memories
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl text-gradient">
              Our Wellness Journey in Pictures
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Explore our collection of moments from wellness sessions, consultations, and healing journeys across India.
            </p>
          </div>
        </div>
      </div>

      {/* Slideshow Section */}
      <div className="w-full">
        <GallerySlideshow images={galleryImages} />
      </div>

      {/* Gallery Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 text-center">
          Browse Our Gallery
        </h2>
        <ImageGrid images={galleryImages} />
      </div>

      {/* Testimonial Section */}
      <div className="bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Experiences That Transform
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our clients share their journeys of healing and transformation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="card p-8 text-center">
              <div className="flex justify-center mb-4">
                <svg className="h-8 w-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <p className="text-xl italic text-gray-600 dark:text-gray-300">
                "The photographs cannot capture the profound sense of peace and wellness I experienced during my Ayurvedic consultation. 
                Acharya Abbhiraath's approach to healing has completely transformed my understanding of health."
              </p>
              <div className="mt-8 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
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

      {/* CTA Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-wellness px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to be part of our gallery?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                Schedule a consultation with our experts and begin your wellness journey today.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  href={`/${params.lang}/contact`}
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contact Us Today
                </Link>
                <Link
                  href={`/${params.lang}/services`}
                  className="text-sm font-semibold leading-6 text-white group"
                >
                  Learn more <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 