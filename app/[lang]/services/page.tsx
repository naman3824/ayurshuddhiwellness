import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services - Ayur Shuddhi Wellness',
  description: 'Explore our range of Ayurvedic treatments and holistic wellness services at Ayur Shuddhi Wellness.',
}

const services = [
  {
    name: 'Ayurvedic Consultation',
    description: 'Personalized consultation with our expert Ayurvedic practitioners to understand your body constitution and health needs.',
    href: 'services/ayurvedic-consultation',
  },
  {
    name: 'Panchakarma Therapy',
    description: 'Traditional five-step cleansing and rejuvenation therapy to detoxify the body and restore balance.',
    href: 'services/panchakarma',
  },
  {
    name: 'Wellness Programs',
    description: 'Customized wellness programs combining Ayurvedic principles with modern health practices.',
    href: 'services/wellness-programs',
  },
  {
    name: 'Yoga & Meditation',
    description: 'Guided yoga and meditation sessions to enhance physical flexibility and mental clarity.',
    href: 'services/yoga-meditation',
  },
  {
    name: 'Dietary Consultation',
    description: 'Expert guidance on Ayurvedic nutrition and dietary habits for optimal health.',
    href: 'services/dietary-consultation',
  },
  {
    name: 'Herbal Remedies',
    description: 'Traditional Ayurvedic herbal preparations and treatments for various health conditions.',
    href: 'services/herbal-remedies',
  },
]

export default function ServicesPage({ params }: { params: { lang: string } }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Wellness Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover our range of holistic health services designed to promote wellness and balance in your life.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Link href={`/${params.lang}/${service.href}`} className="hover:text-emerald-600">
                    {service.name}
                  </Link>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{service.description}</p>
                  <p className="mt-6">
                    <Link
                      href={`/${params.lang}/${service.href}`}
                      className="text-sm font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 