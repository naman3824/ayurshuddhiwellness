export const metadata = {
  title: 'About Us - Ayur Shuddhi Wellness',
  description: 'Learn about Acharya Abbhiraath Singh, Nadi Vaidya and founder of Ayur Shuddhi Wellness, offering holistic health solutions through Ayurveda and modern wellness practices.',
}

const values = [
  {
    name: 'Authentic Tradition',
    description: 'We stay true to authentic Ayurvedic principles while incorporating modern wellness practices.',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    name: 'Holistic Approach',
    description: 'We believe in treating the whole person - mind, body, and soul - not just symptoms.',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: 'Personalized Care',
    description: 'Every individual is unique, and we tailor our treatments to meet your specific needs.',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    name: 'Quality & Safety',
    description: 'We maintain the highest standards of quality and safety in all our treatments and products.',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10 mb-6 animate-fade-in dark:bg-primary-900/30 dark:text-primary-300">
              Our Story
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl text-gradient">
              About Us
            </h1>
            <div className="mt-8 text-center">
              <div className="inline-block rounded-full p-1 bg-gradient-wellness mb-4 shadow-glow">
                <div className="h-32 w-32 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  AS
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-primary-700 dark:text-primary-400">Acharya Abbhiraath Singh</h2>
              <p className="text-lg text-primary-600 dark:text-primary-500">(Nadi Vaidya)</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Health & Wellness Coach | Spiritual Coach</p>
              <div className="mt-3 inline-flex items-center text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-soft">
                <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                8510049114
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Welcome Section */}
        <div className="mx-auto max-w-3xl card p-8 hover:shadow-glow transition-all duration-300">
          <h2 className="text-2xl font-bold tracking-tight text-primary-700 dark:text-primary-400">Namaste and Welcome</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            I am Acharya Abbhiraath Singh, a dedicated Holistic Wellness Practitioner with over a decade of experience 
            in the field of natural healing and spiritual growth. As an experienced Ayurvedacharya, I specialize in 
            Nadi Vaidya, the ancient and profound art of pulse diagnosis. My journey is rooted in the deep belief 
            that true well-being arises from the harmony of the mind, body, and spirit.
          </p>
        </div>

        {/* Background Section */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">My Background</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
          </div>
          
          <ul className="mt-6 space-y-4">
            {[
              "Holder of a Master's Degree in Yogic Science, with specialization in Nadi Vaidya",
              "Trained in ancient healing techniques passed down by Himalayan Gurus",
              "Over the years, I have successfully diagnosed and guided numerous individuals toward holistic health using personalized Ayurvedic treatments and precise pulse diagnosis"
            ].map((item, index) => (
              <li key={index} className="flex items-start group">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mr-3 mt-1 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/30 transition-colors">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-lg leading-7 text-gray-600 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Section */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">What I Offer</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
          </div>
          
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div className="card p-6 hover:shadow-glow transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-gradient-wellness flex items-center justify-center mb-4 text-white shadow-soft">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-400">Holistic Wellness Coaching</h3>
              <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                My approach to wellness blends modern practices with ancient Ayurvedic wisdom. By combining traditional 
                pulse diagnosis with personalized treatment plans, I support healing at the physical, emotional, and 
                spiritual levels.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-glow transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4 text-white shadow-soft">
                <span className="text-2xl">🕉️</span>
              </div>
              <h3 className="text-xl font-semibold text-primary-700 dark:text-primary-400">Spiritual Coaching & Counselling</h3>
              <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                I offer a transformative coaching experience where spirituality, wellness, and ancient wisdom converge. 
                Through spiritual coaching and counselling:
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "I guide both adults and children on their journey of self-discovery",
                  "I help individuals find inner peace, clarity of purpose, and alignment with their higher selves",
                  "I create a safe, nurturing space for clients to explore their beliefs and overcome spiritual challenges with compassion and deep listening"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mr-2 mt-0.5">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">My Philosophy</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
          </div>
          
          <div className="card p-8 bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-gray-900 shadow-soft">
            <div className="flex justify-center mb-4">
              <svg className="h-8 w-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
              </svg>
            </div>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 italic text-center">
              "I believe in empowering individuals to take charge of their well-being by tapping into their inner wisdom 
              and the time-tested traditions of Ayurveda and yogic science. Each session is tailored to the unique 
              needs of the individual, fostering balance, vitality, and personal transformation."
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-wellness p-8 shadow-2xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white">Let's Begin Your Journey</h2>
              <p className="mt-6 text-lg leading-8 text-white/90">
                Whether you're seeking relief from health challenges, looking to deepen your spiritual practice, or 
                striving for holistic well-being, I invite you to embark on this journey with me. Together, we will 
                uncover the path to a more harmonious, purposeful, and vibrant life.
              </p>
              <div className="mt-8">
                <a 
                  href="#contact" 
                  className="inline-block rounded-lg bg-white px-4 py-2.5 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  Contact Me Today
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section with Images */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="flex items-center mb-6">
            <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white px-4">Our Values</h2>
            <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-primary-500/50 dark:to-primary-500/30"></div>
          </div>
          
          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value, index) => (
              <div 
                key={value.name} 
                className="card p-6 hover:shadow-glow hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900 dark:text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-wellness shadow-soft">
                    <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {value.name}
                </dt>
                <dd className="mt-4 text-base text-gray-600 dark:text-gray-300">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 