import Link from 'next/link'

export function Footer({ lang }) {
  return (
    <footer className="bg-emerald-50 dark:bg-gray-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Ayur Shuddhi Wellness</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              Empowering Indian communities to connect their mind, body, and soul through innovative health practices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={`/${lang}/about`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/services`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>Phone: 8510049114</li>
              <li>Email: <a href="mailto:ayurshuddhiwellness@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300">ayurshuddhiwellness@gmail.com</a></li>
              <li>Address: [Insert address]</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Ayur Shuddhi Wellness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 