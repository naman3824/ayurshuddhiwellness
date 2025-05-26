export const metadata = {
  title: 'About Us - Ayur Shuddhi Wellness',
  description: 'Learn about Ayur Shuddhi Wellness and our mission to provide holistic health solutions through Ayurveda and modern wellness practices.',
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
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Mission Section */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Us</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ayur Shuddhi Wellness is dedicated to empowering Indian communities to achieve optimal health 
            through the timeless wisdom of Ayurveda combined with modern wellness practices.
          </p>
        </div>

        {/* Story Section */}
        <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Story</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Founded with a vision to bridge traditional Ayurvedic wisdom with contemporary wellness needs, 
            Ayur Shuddhi Wellness has been at the forefront of holistic health solutions in India. 
            Our journey began with a simple mission: to make authentic Ayurvedic treatments accessible 
            to everyone while maintaining the highest standards of quality and care.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Today, we continue to serve our community with a comprehensive range of wellness services, 
            guided by expert practitioners who share our commitment to holistic health and well-being.
          </p>
        </div>

        {/* Values Section */}
        <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Values</h2>
          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.name} className="border-l-4 border-emerald-600 pl-6">
                <dt className="text-lg font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-2 text-base text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Team Section */}
        <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our team consists of certified Ayurvedic practitioners, wellness experts, and support staff 
            who are passionate about helping you achieve optimal health. Each member brings unique expertise 
            and experience to provide you with the best possible care.
          </p>
        </div>
      </div>
    </div>
  )
} 