export const metadata = {
  title: 'About Us - Ayur Shuddhi Wellness',
  description: 'Learn about Acharya Abbhiraath Singh, Nadi Vaidya and founder of Ayur Shuddhi Wellness, offering holistic health solutions through Ayurveda and modern wellness practices.',
}

const values = [
  {
    name: 'Authentic Tradition',
    description: 'We stay true to authentic Ayurvedic principles while incorporating modern wellness practices.',
  },
  {
    name: 'Holistic Approach',
    description: 'We believe in treating the whole person - mind, body, and soul - not just symptoms.',
  },
  {
    name: 'Personalized Care',
    description: 'Every individual is unique, and we tailor our treatments to meet your specific needs.',
  },
  {
    name: 'Quality & Safety',
    description: 'We maintain the highest standards of quality and safety in all our treatments and products.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Founder Section */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">About Us</h1>
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">Acharya Abbhiraath Singh</h2>
            <p className="text-lg text-emerald-600 dark:text-emerald-500">(Nadi Vaidya)</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Health & Wellness Coach | Spiritual Coach</p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">📞 8510049114</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Namaste and Welcome</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            I am Acharya Abbhiraath Singh, a dedicated Holistic Wellness Practitioner with over a decade of experience 
            in the field of natural healing and spiritual growth. As an experienced Ayurvedacharya, I specialize in 
            Nadi Vaidya, the ancient and profound art of pulse diagnosis. My journey is rooted in the deep belief 
            that true well-being arises from the harmony of the mind, body, and spirit.
          </p>
        </div>

        {/* Background Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Background</h2>
          <ul className="mt-6 list-disc pl-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            <li>Holder of a Master's Degree in Yogic Science, with specialization in Nadi Vaidya</li>
            <li>Trained in ancient healing techniques passed down by Himalayan Gurus</li>
            <li>Over the years, I have successfully diagnosed and guided numerous individuals toward holistic health using personalized Ayurvedic treatments and precise pulse diagnosis</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What I Offer</h2>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">🌿 Holistic Wellness Coaching</h3>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              My approach to wellness blends modern practices with ancient Ayurvedic wisdom. By combining traditional 
              pulse diagnosis with personalized treatment plans, I support healing at the physical, emotional, and 
              spiritual levels.
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">🕉️ Spiritual Coaching & Counselling</h3>
            <p className="mt-3 text-lg leading-8 text-gray-600 dark:text-gray-300">
              I offer a transformative coaching experience where spirituality, wellness, and ancient wisdom converge. 
              Through spiritual coaching and counselling:
            </p>
            <ul className="mt-4 list-disc pl-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              <li>I guide both adults and children on their journey of self-discovery</li>
              <li>I help individuals find inner peace, clarity of purpose, and alignment with their higher selves</li>
              <li>I create a safe, nurturing space for clients to explore their beliefs and overcome spiritual challenges with compassion and deep listening</li>
            </ul>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Philosophy</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            I believe in empowering individuals to take charge of their well-being by tapping into their inner wisdom 
            and the time-tested traditions of Ayurveda and yogic science. Each session is tailored to the unique 
            needs of the individual, fostering balance, vitality, and personal transformation.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mx-auto mt-16 max-w-2xl bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-lg transition-colors">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-800 dark:text-emerald-300">Let's Begin Your Journey</h2>
          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
            Whether you're seeking relief from health challenges, looking to deepen your spiritual practice, or 
            striving for holistic well-being, I invite you to embark on this journey with me. Together, we will 
            uncover the path to a more harmonious, purposeful, and vibrant life.
          </p>
        </div>

        {/* Values Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Our Values</h2>
          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.name} className="border-l-4 border-emerald-600 dark:border-emerald-500 pl-6">
                <dt className="text-lg font-semibold text-gray-900 dark:text-white">{value.name}</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-300">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 