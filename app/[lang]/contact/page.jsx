import { Metadata } from 'next'
import { getDictionary } from '@/utils/dictionaries'
import Link from 'next/link';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'en-IN' },
    { lang: 'hi' }
  ]
}

export async function generateMetadata({ params: { lang } }) {
  const dict = await getDictionary(lang)
  return {
    title: dict.contact.title,
    description: dict.contact.description,
  }
}

export default async function ContactPage({ params: { lang } }) {
  const dict = await getDictionary(lang)

  return (
    <div 
      className="tree-bg-optimized"
    >
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0 pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10 mb-6 animate-fade-in dark:bg-primary-900/30 dark:text-primary-300">
              Get In Touch
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl text-gradient">
              {dict.contact.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {dict.contact.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="card p-8 hover:shadow-glow transition-all duration-300">
              <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400">Contact Information</h2>
              <dl className="mt-6 space-y-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <dt className="font-semibold text-gray-900 dark:text-white">Address</dt>
                    <dd className="mt-1">A-228, Sector 36, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh-201310</dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <dt className="font-semibold text-gray-900 dark:text-white">Phone</dt>
                    <dd className="mt-1">
                      <a href="tel:+918510049114" className="text-primary-600 dark:text-primary-400 hover:underline">
                        +91 8510049114
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <dt className="font-semibold text-gray-900 dark:text-white">Email</dt>
                    <dd className="mt-1">
                      <a href="mailto:ayurshuddhiwellness@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">
                        ayurshuddhiwellness@gmail.com
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <dt className="font-semibold text-gray-900 dark:text-white">Hours</dt>
                    <dd className="mt-1">Monday - Saturday: 9:00 AM - 6:00 PM</dd>
                    <dd>Sunday: Closed</dd>
                  </div>
                </div>
              </dl>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
                <div className="flex space-x-6">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61577082740278" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2">Facebook</span>
                  </a>
                  <a 
                    href="https://www.instagram.com/ayurshuddhiwellness/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
                  >
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2">Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            <form className="card p-8 hover:shadow-glow transition-all duration-300">
              <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-6">Send us a message</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {dict.contact.name}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {dict.contact.email}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {dict.contact.message}
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800/50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full rounded-lg py-3"
                  >
                    {dict.contact.submit}
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Map or additional contact info could go here */}
          <div className="mt-16 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700/50 p-8 text-center shadow-soft">
            <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400">Visit Our Center</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Experience the tranquil environment of our wellness center in person. 
              We welcome you to schedule a visit and explore our facilities.
            </p>
            <div className="mt-6">
              <Link 
                href="/book"
                className="btn btn-primary"
              >
                Schedule a Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}