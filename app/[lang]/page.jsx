import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Ayur Shuddhi Wellness - Holistic Health Solutions',
  description: 'Experience the power of Ayurveda and holistic wellness with Ayur Shuddhi Wellness. We offer innovative health practices to connect your mind, body, and soul.',
}

export default function HomePage({ params }) {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Hero section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Transform Your Life Through Holistic Wellness
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover the ancient wisdom of Ayurveda combined with modern wellness practices. 
              At Ayur Shuddhi Wellness, we help you achieve balance in mind, body, and soul.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${params.lang}/services`}
                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Explore Our Services
              </Link>
              <Link
                href={`/${params.lang}/contact`}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600 dark:text-emerald-400">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Comprehensive Wellness Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Our holistic approach combines traditional Ayurvedic wisdom with modern wellness practices 
            to provide you with personalized health solutions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    name: 'Authentic Ayurvedic Treatments',
    description: 'Experience traditional Ayurvedic therapies performed by expert practitioners using authentic herbs and techniques.',
  },
  {
    name: 'Personalized Wellness Plans',
    description: 'Receive customized wellness programs tailored to your unique body constitution and health goals.',
  },
  {
    name: 'Modern Health Integration',
    description: 'Benefit from our innovative approach that combines ancient wisdom with contemporary health practices.',
  },
] 