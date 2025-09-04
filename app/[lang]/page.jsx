import Link from 'next/link'
import FeaturedServiceCard from '../../components/FeaturedServiceCard'
import { MandalaPattern } from '../../components/MandalaDecoration'

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'en-IN' },
    { lang: 'hi' }
  ]
}

// Featured services for the homepage - optimized for card display
const getFeaturedServices = (lang) => [
  {
    name: 'Ayurveda',
    description: 'Restore balance and promote natural healing through time-tested Ayurvedic therapies....',
    href: 'services/ayurveda',
    image: '/images/services/ayurveda.JPG',
    iconName: 'leaf',
  },
  {
    name: 'Panchakarma',
    description: 'Experience profound detoxification and rejuvenation through ancient Ayurvedic science. Eliminate deep-rooted toxins and restore dosha balance with therapeutic treatments.',
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

export async function generateMetadata({ params }) {
  return {
    title: 'Ayur Shuddhi Wellness - Holistic Health Solutions',
    description: 'Experience the power of Ayurveda and holistic wellness with Ayur Shuddhi Wellness. We offer innovative health practices to connect your mind, body, and soul.',
  };
}

export default function HomePage({ params }) {
  const featuredServices = getFeaturedServices(params.lang);
  
  return (
    <div 
      className="bg-gradient-to-br from-ivory-100 via-ivory-50 to-sage-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      style={{
        backgroundImage: 'url(/images/hero/tree.jpg)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Hero section with Indian-inspired design */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-50/70 to-ivory-100/70 dark:from-gray-900/70 dark:to-gray-800/70">
        <MandalaPattern />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-100 to-accent-100 px-4 py-2 text-sm font-semibold text-primary-700 ring-1 ring-inset ring-primary-200/50 mb-8 fade-scale shadow-soft">
              🕉️ Holistic Wellness & Ancient Wisdom
            </span>
            <h1 className="text-5xl font-display font-bold tracking-tight text-gradient-indian sm:text-7xl slide-in-left">
              Transform Your Life Through Holistic Wellness
            </h1>

          </div>
        </div>
      </div>

      {/* Our Services section with Indian-inspired design */}
      <div className="relative bg-gradient-to-b from-ivory-50/60 to-sage-50/60 dark:from-gray-900/60 dark:to-gray-800/60 section-padding">
        <div className="mx-auto max-w-7xl container-padding">
          <div className="mx-auto max-w-4xl lg:text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-100 to-primary-100 px-4 py-2 text-sm font-semibold text-accent-700 ring-1 ring-inset ring-accent-200/50 mb-8 shadow-soft fade-scale" style={{ animationDelay: '100ms' }}>
              ✨ Featured Services
            </span>
            <h2 className="text-4xl font-display font-bold tracking-tight text-gradient-indian sm:text-5xl mb-6 staggered-fade" style={{ animationDelay: '200ms' }}>
              Our Most Popular Wellness Services
            </h2>
            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300 staggered-fade max-w-3xl mx-auto" style={{ animationDelay: '300ms' }}>
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
                  lang={params.lang}
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Testimonial section */}
      <div className="relative bg-gradient-to-b from-primary-50/60 to-white/60 dark:from-gray-800/60 dark:to-gray-900/60 py-24 sm:py-32">
        <div className="absolute inset-0 pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
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
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
                    <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white/60 dark:bg-gray-900/60">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-wellness px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:py-24 lg:flex lg:gap-x-20 lg:px-24">
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to begin your wellness journey?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                Schedule a consultation with our experts and take the first step towards holistic health.
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

const features = [
  {
    name: 'Authentic Ayurvedic Treatments',
    description: 'Experience traditional Ayurvedic therapies performed by expert practitioners using authentic herbs and techniques.',
    icon: function LeafIcon(props) {
      return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      )
    }
  },
  {
    name: 'Personalized Wellness Plans',
    description: 'Receive customized wellness programs tailored to your unique body constitution and health goals.',
    icon: function UserIcon(props) {
      return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    }
  },
  {
    name: 'Modern Health Integration',
    description: 'Benefit from our innovative approach that combines ancient wisdom with contemporary health practices.',
    icon: function SparklesIcon(props) {
      return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      )
    }
  },
]

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