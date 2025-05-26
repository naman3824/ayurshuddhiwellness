export const metadata = {
  title: 'Contact Us - Ayur Shuddhi Wellness',
  description: 'Get in touch with Ayur Shuddhi Wellness for holistic health solutions and Ayurvedic treatments.',
}

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Contact Us</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We're here to help you on your wellness journey. Reach out to us for any questions or to schedule a consultation.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h2>
              <dl className="mt-6 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">Address</dt>
                  <dd>[Insert address]</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">Phone</dt>
                  <dd>8510049114</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">Email</dt>
                  <dd>
                    <a href="mailto:ayurshuddhiwellness@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300">
                      ayurshuddhiwellness@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900 dark:text-white">Hours</dt>
                  <dd>Monday - Saturday: 9:00 AM - 6:00 PM</dd>
                  <dd>Sunday: Closed</dd>
                </div>
              </dl>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 dark:bg-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="block w-full rounded-md bg-emerald-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 