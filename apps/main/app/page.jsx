import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import FeaturedServiceCard from '../components/FeaturedServiceCard'
import { MandalaPattern } from '../components/MandalaDecoration'
import { adminDb } from '../lib/firebaseAdmin'
import HomepageMessageModal from '../components/HomepageMessageModal'


// Featured services for the homepage - optimized for card display
const featuredServices = [
  {
    name: 'Ayurveda',
    description: 'Restore balance and promote natural healing through time-tested Ayurvedic therapies....',
    href: 'services/ayurveda',
    image: '/images/services/ayurveda.JPG',
    iconName: 'leaf',
  },
  {
    name: 'Panchakarma',
    description: 'Profound detoxification and rejuvenation rooted in ancient Ayurvedic science. Eliminate deep-rooted toxins, restore dosha balance, and revitalize body and mind.',
    href: 'services/panchakarma',
    image: '/images/services/panchakarma.JPG',
    iconName: 'flask',
  },
  {
    name: 'Yoga & Meditation',
    description: 'Achieve balance, strength, and inner peace through guided yoga, pranayama, and meditation sessions. Improve flexibility, posture, and mental clarity naturally.',
    href: 'services/yoga-pranayama-and-meditation',
    image: '/images/services/Yoga_Pranayama_Meditation.JPG',
    iconName: 'heart',
  },
];


export const metadata = {
  title: 'Ayur Shuddhi Wellness - Holistic Health Solutions',
  description: 'Experience the power of Ayurveda and holistic wellness with Ayur Shuddhi Wellness. We offer innovative health practices to connect your mind, body, and soul.',
};

// Async server component that fetches messages — streamed via Suspense
async function HomepageMessagesFetcher() {
  try {
    const snapshot = await adminDb
      .collection('homepage_messages')
      .where('isActive', '==', true)
      .get();

    const messages = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          content: data.content || '',
          message_type: data.message_type || 'text',
          image_url: data.image_url || '',
          createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        };
      })
      .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
      .slice(0, 5);

    if (messages.length === 0) return null;
    return <HomepageMessageModal messages={messages} />;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed viewport background */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/images/hero/tree.jpg"
          alt="AyurShuddhi Forest"
          fill
          className="object-cover object-top"
          priority={true}
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-gray-800/70 to-gray-900/70"></div>
      </div>

      {/* All content scrolls over the fixed background */}
      <div className="relative">
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          <MandalaPattern />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 mobile-hero-padding">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-5xl font-display font-bold tracking-tight text-gradient-indian sm:text-7xl slide-in-left mobile-text-shadow">
                Transform Your Life Through Holistic Wellness
              </h1>
            </div>
          </div>
        </div>

        {/* Homepage Messages — streamed via Suspense to avoid blocking TTFB */}
        <Suspense fallback={null}>
          <HomepageMessagesFetcher />
        </Suspense>

        {/* Our Services section */}
        <div className="relative section-padding mobile-section-spacing">
          <div className="mx-auto max-w-7xl container-padding">
            <div className="mx-auto max-w-4xl lg:text-center mb-16">
              <h2 className="text-4xl font-display font-bold tracking-tight text-gradient-indian sm:text-5xl mb-6 staggered-fade mobile-text-shadow" style={{ animationDelay: '200ms' }}>
                Our Most Popular Wellness Services
              </h2>
              <p className="text-xl leading-relaxed text-gray-300 staggered-fade max-w-3xl mx-auto" style={{ animationDelay: '300ms' }}>
                Transform your health with our signature treatments that blend ancient Indian wisdom with modern wellness practices.
                Each service is designed to restore balance and promote holistic healing.
              </p>
            </div>

            {/* Featured services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {featuredServices.map((service, index) => (
                <div
                  key={service.name}
                  className="staggered-fade hover:scale-[1.02] transition-transform duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <FeaturedServiceCard
                    title={service.name}
                    description={service.description}
                    image={service.image}
                    iconName={service.iconName}
                    href={service.href}
                    hideBookNow={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="relative py-24 sm:py-32">
          <div className="absolute inset-0 pattern-bg"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                What Our Clients Say
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Discover how our holistic wellness approach has transformed lives.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="card p-6 flex flex-col justify-between hover:shadow-glow transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900/30 mb-4">
                      <svg className="h-6 w-6 text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-white">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-x-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gray-900/30 backdrop-blur-md px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24 border-2 border-gray-600/50">
              <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to begin your wellness journey?
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-100">
                  Schedule a consultation with our experts and take the first step towards holistic health.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <Link
                    href="/contact"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Contact Us Today
                  </Link>
                  <Link
                    href="/services"
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
    </div>
  );
}


const testimonials = [
  {
    text: "The personalized Ayurvedic treatments completely transformed my approach to health. I've never felt better!",
    name: "Priya Sharma",
    role: "Yoga Instructor"
  },
  {
    text: "After struggling with chronic stress for years, Ayur Shuddhi's holistic approach helped me find balance and peace.",
    name: "Rajesh Kumar",
    role: "IT Professional"
  },
  {
    text: "The combination of traditional wisdom and modern techniques makes their wellness programs truly effective and sustainable.",
    name: "Ananya Patel",
    role: "Healthcare Worker"
  }
]