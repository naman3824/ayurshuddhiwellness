import { Metadata } from 'next/types'
import { getDictionary } from '@/utils/dictionaries'
import Link from 'next/link';
import ContactForm from '../../../components/ContactForm';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'en-IN' },
    { lang: 'hi' }
  ]
}

export async function generateMetadata(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang)
  return {
    title: dict.contact.title,
    description: dict.contact.description,
  }
}

export default async function ContactPage(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dict = await getDictionary(lang)

  return (
    <div 
      className="tree-bg-optimized"
    >
      {/* Dark gradient overlay to tone down background image exposure */}
      <div className="relative bg-gradient-to-b from-gray-800/70 to-gray-900/70">
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-0 pattern-bg"></div>
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl text-gradient">
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Ready to begin your wellness journey? We're here to guide you every step of the way.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div className="card p-8 hover:shadow-glow transition-all duration-300">
                <h2 className="text-xl font-semibold text-primary-400">Contact Information</h2>
                <dl className="mt-6 space-y-6 text-base leading-7 text-gray-300">
                  <div className="flex gap-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-900/30 text-primary-400 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Address</dt>
                      <dd>A-228, Sector 36, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh-201310</dd>
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-900/30 text-primary-400 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Phone</dt>
                      <dd>
                        <a href="tel:+918510049114" className="text-primary-400 hover:underline">
                          +91 8510049114
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-900/30 text-primary-400 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Email</dt>
                      <dd>
                        <a href="mailto:ayurshuddhiwellness@gmail.com" className="text-primary-400 hover:underline">
                          ayurshuddhiwellness@gmail.com
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-900/30 text-primary-400 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">Hours</dt>
                      <dd>Monday - Saturday: 9:00 AM - 6:00 PM</dd>
                    </div>
                  </div>
                </dl>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
                  <div className="flex space-x-6">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61577082740278" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 group-hover:bg-primary-900/30 transition-colors">
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
                      className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800 group-hover:bg-primary-900/30 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-2">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              <ContactForm dict={dict} />
            </div>
            
            {/* Map or additional contact info could go here */}
            <div className="mt-16 rounded-xl bg-gradient-to-b from-gray-800/70 to-gray-900/70 p-8 text-center shadow-soft">
              <h3 className="text-lg font-semibold text-primary-400">Visit Our Center</h3>
              <p className="mt-2 text-gray-300">
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
    </div>
  )
}