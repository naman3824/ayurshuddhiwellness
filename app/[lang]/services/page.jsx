'use client'

import { useState } from 'react'
import Image from 'next/image'
import ServiceCard from '../../../components/ServiceCard'

const services = [
  {
    name: 'Ayurveda',
    description: 'Our Ayurveda services are designed to restore balance and promote natural healing through time-tested therapies and personalized care. We offer Ayurvedic consultations to understand your unique body constitution (Prakriti), followed by customized treatments and herbal remedies. Our specialized Panchakarma therapies help detoxify and rejuvenate the body, while lifestyle and diet recommendations support long-term wellness. Rooted in ancient wisdom, our approach nurtures holistic health - body, mind, and spirit.',
    detailedDescription: 'Ayurveda, the "science of life," is one of the world\'s oldest holistic healing systems. At Ayur Shuddhi Wellness, we practice authentic Ayurvedic principles that have been refined over thousands of years. Our comprehensive Ayurveda services include:\n\n1. **Personalized Consultation**: Our experienced practitioners assess your unique constitution (Prakriti) and current imbalances (Vikriti) through traditional diagnostic methods including pulse, tongue, and facial diagnosis.\n\n2. **Customized Treatment Plans**: Based on your consultation, we create individualized wellness programs that may include dietary recommendations, lifestyle modifications, herbal formulations, and therapeutic treatments.\n\n3. **Specialized Therapies**: Experience our range of traditional Ayurvedic therapies including Abhyanga (oil massage), Shirodhara (forehead oil flow), Swedana (herbal steam), and more.\n\n4. **Seasonal Detoxification**: Regular cleansing programs aligned with seasonal changes to remove accumulated toxins and restore optimal health.\n\n5. **Preventative Care**: Long-term wellness strategies to maintain balance and prevent disease through daily routines (Dinacharya) and seasonal protocols (Ritucharya).',
    href: 'services/ayurveda',
    image: '/images/services/ayurveda.JPG',
    iconName: 'leaf',
  },
  {
    name: 'Naturopathy',
    description: 'Our Naturopathy services focus on harnessing the healing power of nature to restore and maintain your health. We offer a range of natural therapies including diet and nutrition guidance, and detox programs tailored to your individual needs. By addressing the root causes of illness rather than just the symptoms, our naturopathic approach supports the body\'s innate ability to heal itself - gently, effectively, and without side effects.',
    detailedDescription: 'Naturopathy is a holistic system of medicine that combines modern scientific knowledge with traditional healing wisdom. Our naturopathic services are designed to stimulate your body\'s natural healing abilities through gentle, non-invasive methods. Our comprehensive approach includes:\n\n1. **Holistic Assessment**: We evaluate your overall health, lifestyle, diet, and environmental factors to understand the root causes of your health concerns.\n\n2. **Nutritional Therapy**: Personalized dietary plans that focus on whole foods, elimination diets, and therapeutic nutrition to address specific health conditions.\n\n3. **Detoxification Programs**: Structured protocols to help your body eliminate accumulated toxins and restore optimal function of your digestive system, liver, and kidneys.\n\n4. **Hydrotherapy**: The therapeutic use of water in various forms and temperatures to stimulate circulation, reduce inflammation, and support detoxification.\n\n5. **Lifestyle Counseling**: Guidance on sleep, stress management, exercise, and environmental factors that impact your health.\n\n6. **Herbal Medicine**: The use of plant-based remedies to support healing and address specific health concerns naturally.',
    href: 'services/naturopathy',
    image: '/images/services/naturopathy.JPG',
    iconName: 'smile',
  },
  {
    name: 'Panchakarma',
    description: 'Our Panchakarma services offer a profound detoxification and rejuvenation experience based on the ancient science of Ayurveda. Designed to eliminate deep-rooted toxins and restore balance to the body\'s doshas, our treatments include Abhyanga (therapeutic oil massage), Shirodhara, Basti (medicated enemas), Nasya, and Vamana, among others. Each therapy is customized to your individual constitution and health condition, promoting physical vitality, mental clarity, and emotional well-being. Experience true healing through the transformative power of Panchakarma.',
    href: 'services/panchakarma',
    image: '/images/services/panchakarma.JPG',
    iconName: 'flask',
  },
  {
    name: 'Pulse Diagnosis (Nadi Pariksha)',
    description: 'Our Pulse Diagnosis service, known as Nadi Pariksha in Ayurveda, is a powerful diagnostic tool used to assess your physical, mental, and emotional health. By gently reading the pulse at various levels, our experienced practitioners can identify imbalances in the body\'s doshas - Vata, Pitta, and Kapha - and uncover the root causes of health concerns. This non-invasive technique provides deep insights, allowing us to create a personalized wellness plan that includes diet, lifestyle, and treatment recommendations to restore harmony and well-being.',
    href: 'services/pulse-diagnosis',
    image: '/images/services/pulse_diagnosis.JPG',
    iconName: 'pulse',
  },
  {
    name: 'Tongue Diagnosis',
    description: 'Our Tongue Diagnosis service is a key part of traditional Ayurvedic and Naturopathic assessment, offering valuable insights into your overall health. By observing the shape, color, coating, and texture of the tongue, our practitioners can detect imbalances in the digestive system, organ function, and doshic disturbances. This simple yet powerful method helps us understand underlying health issues and tailor personalized treatment plans that support detoxification, digestion, and overall well-being - naturally and holistically.',
    href: 'services/tongue-diagnosis',
    image: '/images/services/tongue_diagnosis.JPG',
    iconName: 'eye',
  },
  {
    name: 'Rakht Mokshan and Leech Therapy',
    description: 'Our Rakt Mokshan therapy, a vital part of Ayurvedic Panchakarma, is a specialized blood purification treatment used to eliminate toxins from the bloodstream and balance the Pitta dosha. This therapy helps in managing chronic skin conditions, inflammation, acne, hypertension, and other blood-related disorders. Depending on the individual\'s condition, we use techniques such as leech therapy or controlled bloodletting under the supervision of trained professionals. Rakt Mokshan supports deep detoxification, enhances immunity, and promotes clearer, healthier skin and overall vitality.',
    href: 'services/rakht-mokshan',
    image: '/images/services/Rakht_Mokshan.JPG',
    iconName: 'arrows',
  },
  {
    name: 'Agni Karma',
    description: 'Our Agni Karma therapy is a specialized Ayurvedic treatment that uses controlled therapeutic heat to manage chronic pain and musculoskeletal disorders. By applying heated metal instruments to specific points on the body, this technique helps relieve conditions such as arthritis, joint pain, sciatica, and muscle stiffness. Agni Karma provides fast, localized pain relief without side effects and promotes long-term healing by improving blood circulation and reducing inflammation. Performed by skilled practitioners, this powerful therapy offers a natural and effective alternative to conventional pain management methods.',
    href: 'services/agni-karma',
    image: '/images/services/agni_karma.JPG',
    iconName: 'fire',
  },
  {
    name: 'Yoga, Pranayama, and Meditation',
    description: 'Our services in Yoga, Pranayama, and Meditation are designed to bring balance, strength, and inner peace to your daily life. We offer guided yoga sessions that improve flexibility, posture, and physical health, while Pranayama (breathing techniques) helps regulate the flow of vital energy, enhancing mental clarity and emotional stability. Our meditation practices promote deep relaxation, stress reduction, and mindfulness, helping you reconnect with your inner self. Together, these ancient practices support holistic well-being by aligning the body, mind, and spirit in harmony.',
    href: 'services/yoga-meditation',
    image: '/images/services/Yoga_Pranayama_Meditation.JPG',
    iconName: 'globe',
  },
  {
    name: 'Depression and Stress Management',
    description: 'Our Depression and Stress Management services offer a holistic approach to emotional and mental well-being through the wisdom of Ayurveda, Naturopathy, and Yogic practices. We provide personalized care that may include herbal therapies, diet and lifestyle guidance, detox treatments, and supportive practices like Yoga, Pranayama, and meditation to calm the mind and uplift the spirit. By addressing the root causes of imbalance, we help you manage stress, reduce anxiety, and overcome depressive states naturally - restoring inner peace, clarity, and emotional resilience.',
    href: 'services/stress-management',
    image: '/images/services/Depression_Stress_Management.JPG',
    iconName: 'heart',
  },
]

// Add detailed descriptions to all services (keeping the existing ones)
services.forEach(service => {
  if (!service.detailedDescription) {
    service.detailedDescription = service.description + "\n\nOur experienced practitioners personalize each treatment to your specific needs, ensuring optimal results and a transformative wellness experience. We combine traditional wisdom with modern approaches to provide comprehensive care that addresses the root causes of health concerns rather than just managing symptoms."
  }
})

export default function ServicesPage({ params }) {
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (serviceName) => {
    if (expandedService === serviceName) {
      setExpandedService(null);
    } else {
      setExpandedService(serviceName);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section with gradient background */}
      <div className="relative bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 pattern-bg"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10 mb-6 animate-fade-in dark:bg-primary-900/30 dark:text-primary-300">
              Our Offerings
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl text-gradient">
              Holistic Wellness Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover our comprehensive range of holistic health services designed to promote wellness, 
              balance, and healing in your life through ancient wisdom and modern practices.
            </p>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.name}
              id={`service-${index}`}
              title={service.name}
              description={service.description}
              detailedDescription={service.detailedDescription}
              image={service.image}
              iconName={service.iconName}
              href={`/${params.lang}/${service.href}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 