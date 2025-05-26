import Link from 'next/link'

export const metadata = {
  title: 'Our Services - Ayur Shuddhi Wellness',
  description: 'Explore our range of Ayurvedic treatments, Naturopathy, Panchakarma, and holistic wellness services at Ayur Shuddhi Wellness.',
}

const services = [
  {
    name: 'Ayurveda',
    description: 'Our Ayurveda services are designed to restore balance and promote natural healing through time-tested therapies and personalized care. We offer Ayurvedic consultations to understand your unique body constitution (Prakriti), followed by customized treatments and herbal remedies. Our specialized Panchakarma therapies help detoxify and rejuvenate the body, while lifestyle and diet recommendations support long-term wellness. Rooted in ancient wisdom, our approach nurtures holistic health - body, mind, and spirit.',
    href: 'services/ayurveda',
  },
  {
    name: 'Naturopathy',
    description: 'Our Naturopathy services focus on harnessing the healing power of nature to restore and maintain your health. We offer a range of natural therapies including diet and nutrition guidance, and detox programs tailored to your individual needs. By addressing the root causes of illness rather than just the symptoms, our naturopathic approach supports the body\'s innate ability to heal itself - gently, effectively, and without side effects.',
    href: 'services/naturopathy',
  },
  {
    name: 'Panchakarma',
    description: 'Our Panchakarma services offer a profound detoxification and rejuvenation experience based on the ancient science of Ayurveda. Designed to eliminate deep-rooted toxins and restore balance to the body\'s doshas, our treatments include Abhyanga (therapeutic oil massage), Shirodhara, Basti (medicated enemas), Nasya, and Vamana, among others. Each therapy is customized to your individual constitution and health condition, promoting physical vitality, mental clarity, and emotional well-being. Experience true healing through the transformative power of Panchakarma.',
    href: 'services/panchakarma',
  },
  {
    name: 'Pulse Diagnosis (Nadi Pariksha)',
    description: 'Our Pulse Diagnosis service, known as Nadi Pariksha in Ayurveda, is a powerful diagnostic tool used to assess your physical, mental, and emotional health. By gently reading the pulse at various levels, our experienced practitioners can identify imbalances in the body\'s doshas - Vata, Pitta, and Kapha - and uncover the root causes of health concerns. This non-invasive technique provides deep insights, allowing us to create a personalized wellness plan that includes diet, lifestyle, and treatment recommendations to restore harmony and well-being.',
    href: 'services/pulse-diagnosis',
  },
  {
    name: 'Tongue Diagnosis',
    description: 'Our Tongue Diagnosis service is a key part of traditional Ayurvedic and Naturopathic assessment, offering valuable insights into your overall health. By observing the shape, color, coating, and texture of the tongue, our practitioners can detect imbalances in the digestive system, organ function, and doshic disturbances. This simple yet powerful method helps us understand underlying health issues and tailor personalized treatment plans that support detoxification, digestion, and overall well-being - naturally and holistically.',
    href: 'services/tongue-diagnosis',
  },
  {
    name: 'Rakht Mokshan and Leech Therapy',
    description: 'Our Rakt Mokshan therapy, a vital part of Ayurvedic Panchakarma, is a specialized blood purification treatment used to eliminate toxins from the bloodstream and balance the Pitta dosha. This therapy helps in managing chronic skin conditions, inflammation, acne, hypertension, and other blood-related disorders. Depending on the individual\'s condition, we use techniques such as leech therapy or controlled bloodletting under the supervision of trained professionals. Rakt Mokshan supports deep detoxification, enhances immunity, and promotes clearer, healthier skin and overall vitality.',
    href: 'services/rakht-mokshan',
  },
  {
    name: 'Agni Karma',
    description: 'Our Agni Karma therapy is a specialized Ayurvedic treatment that uses controlled therapeutic heat to manage chronic pain and musculoskeletal disorders. By applying heated metal instruments to specific points on the body, this technique helps relieve conditions such as arthritis, joint pain, sciatica, and muscle stiffness. Agni Karma provides fast, localized pain relief without side effects and promotes long-term healing by improving blood circulation and reducing inflammation. Performed by skilled practitioners, this powerful therapy offers a natural and effective alternative to conventional pain management methods.',
    href: 'services/agni-karma',
  },
  {
    name: 'Yoga, Pranayama, and Meditation',
    description: 'Our services in Yoga, Pranayama, and Meditation are designed to bring balance, strength, and inner peace to your daily life. We offer guided yoga sessions that improve flexibility, posture, and physical health, while Pranayama (breathing techniques) helps regulate the flow of vital energy, enhancing mental clarity and emotional stability. Our meditation practices promote deep relaxation, stress reduction, and mindfulness, helping you reconnect with your inner self. Together, these ancient practices support holistic well-being by aligning the body, mind, and spirit in harmony.',
    href: 'services/yoga-meditation',
  },
  {
    name: 'Depression and Stress Management',
    description: 'Our Depression and Stress Management services offer a holistic approach to emotional and mental well-being through the wisdom of Ayurveda, Naturopathy, and Yogic practices. We provide personalized care that may include herbal therapies, diet and lifestyle guidance, detox treatments, and supportive practices like Yoga, Pranayama, and meditation to calm the mind and uplift the spirit. By addressing the root causes of imbalance, we help you manage stress, reduce anxiety, and overcome depressive states naturally - restoring inner peace, clarity, and emotional resilience.',
    href: 'services/stress-management',
  },
]

export default function ServicesPage({ params }) {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600 dark:text-emerald-400">Our Services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Holistic Wellness Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Discover our comprehensive range of holistic health services designed to promote wellness, 
            balance, and healing in your life through ancient wisdom and modern practices.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.name} className="flex flex-col bg-emerald-50 dark:bg-gray-800 rounded-lg p-8 shadow-sm transition-colors">
                <dt className="text-xl font-semibold leading-7 text-emerald-700 dark:text-emerald-400 mb-4">
                  {service.name}
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{service.description}</p>
                  <p className="mt-6">
                    <Link
                      href={`/${params.lang}/${service.href}`}
                      className="text-sm font-semibold leading-6 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 