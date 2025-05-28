'use client'

import { useState } from 'react'
import Image from 'next/image'

const services = [
  {
    name: 'Ayurveda',
    description: 'Our Ayurveda services are designed to restore balance and promote natural healing through time-tested therapies and personalized care. We offer Ayurvedic consultations to understand your unique body constitution (Prakriti), followed by customized treatments and herbal remedies. Our specialized Panchakarma therapies help detoxify and rejuvenate the body, while lifestyle and diet recommendations support long-term wellness. Rooted in ancient wisdom, our approach nurtures holistic health - body, mind, and spirit.',
    detailedDescription: 'Ayurveda, the "science of life," is one of the world\'s oldest holistic healing systems. At Ayur Shuddhi Wellness, we practice authentic Ayurvedic principles that have been refined over thousands of years. Our comprehensive Ayurveda services include:\n\n1. **Personalized Consultation**: Our experienced practitioners assess your unique constitution (Prakriti) and current imbalances (Vikriti) through traditional diagnostic methods including pulse, tongue, and facial diagnosis.\n\n2. **Customized Treatment Plans**: Based on your consultation, we create individualized wellness programs that may include dietary recommendations, lifestyle modifications, herbal formulations, and therapeutic treatments.\n\n3. **Specialized Therapies**: Experience our range of traditional Ayurvedic therapies including Abhyanga (oil massage), Shirodhara (forehead oil flow), Swedana (herbal steam), and more.\n\n4. **Seasonal Detoxification**: Regular cleansing programs aligned with seasonal changes to remove accumulated toxins and restore optimal health.\n\n5. **Preventative Care**: Long-term wellness strategies to maintain balance and prevent disease through daily routines (Dinacharya) and seasonal protocols (Ritucharya).',
    href: 'services/ayurveda',
    image: '/images/services/ayurveda.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    name: 'Naturopathy',
    description: 'Our Naturopathy services focus on harnessing the healing power of nature to restore and maintain your health. We offer a range of natural therapies including diet and nutrition guidance, and detox programs tailored to your individual needs. By addressing the root causes of illness rather than just the symptoms, our naturopathic approach supports the body\'s innate ability to heal itself - gently, effectively, and without side effects.',
    detailedDescription: 'Naturopathy is a holistic system of medicine that combines modern scientific knowledge with traditional healing wisdom. Our naturopathic services are designed to stimulate your body\'s natural healing abilities through gentle, non-invasive methods. Our comprehensive approach includes:\n\n1. **Holistic Assessment**: We evaluate your overall health, lifestyle, diet, and environmental factors to understand the root causes of your health concerns.\n\n2. **Nutritional Therapy**: Personalized dietary plans that focus on whole foods, elimination diets, and therapeutic nutrition to address specific health conditions.\n\n3. **Detoxification Programs**: Structured protocols to help your body eliminate accumulated toxins and restore optimal function of your digestive system, liver, and kidneys.\n\n4. **Hydrotherapy**: The therapeutic use of water in various forms and temperatures to stimulate circulation, reduce inflammation, and support detoxification.\n\n5. **Lifestyle Counseling**: Guidance on sleep, stress management, exercise, and environmental factors that impact your health.\n\n6. **Herbal Medicine**: The use of plant-based remedies to support healing and address specific health concerns naturally.',
    href: 'services/naturopathy',
    image: '/images/services/naturopathy.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
  },
  {
    name: 'Panchakarma',
    description: 'Our Panchakarma services offer a profound detoxification and rejuvenation experience based on the ancient science of Ayurveda. Designed to eliminate deep-rooted toxins and restore balance to the body\'s doshas, our treatments include Abhyanga (therapeutic oil massage), Shirodhara, Basti (medicated enemas), Nasya, and Vamana, among others. Each therapy is customized to your individual constitution and health condition, promoting physical vitality, mental clarity, and emotional well-being. Experience true healing through the transformative power of Panchakarma.',
    href: 'services/panchakarma',
    image: '/images/services/panchakarma.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: 'Pulse Diagnosis (Nadi Pariksha)',
    description: 'Our Pulse Diagnosis service, known as Nadi Pariksha in Ayurveda, is a powerful diagnostic tool used to assess your physical, mental, and emotional health. By gently reading the pulse at various levels, our experienced practitioners can identify imbalances in the body\'s doshas - Vata, Pitta, and Kapha - and uncover the root causes of health concerns. This non-invasive technique provides deep insights, allowing us to create a personalized wellness plan that includes diet, lifestyle, and treatment recommendations to restore harmony and well-being.',
    href: 'services/pulse-diagnosis',
    image: '/images/services/pulse_diagnosis.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    name: 'Tongue Diagnosis',
    description: 'Our Tongue Diagnosis service is a key part of traditional Ayurvedic and Naturopathic assessment, offering valuable insights into your overall health. By observing the shape, color, coating, and texture of the tongue, our practitioners can detect imbalances in the digestive system, organ function, and doshic disturbances. This simple yet powerful method helps us understand underlying health issues and tailor personalized treatment plans that support detoxification, digestion, and overall well-being - naturally and holistically.',
    href: 'services/tongue-diagnosis',
    image: '/images/services/tongue_diagnosis.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v-1.5m0 1.5v1.5m-2.25-1.5h4.5m-4.5 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
      </svg>
    ),
  },
  {
    name: 'Rakht Mokshan and Leech Therapy',
    description: 'Our Rakt Mokshan therapy, a vital part of Ayurvedic Panchakarma, is a specialized blood purification treatment used to eliminate toxins from the bloodstream and balance the Pitta dosha. This therapy helps in managing chronic skin conditions, inflammation, acne, hypertension, and other blood-related disorders. Depending on the individual\'s condition, we use techniques such as leech therapy or controlled bloodletting under the supervision of trained professionals. Rakt Mokshan supports deep detoxification, enhances immunity, and promotes clearer, healthier skin and overall vitality.',
    href: 'services/rakht-mokshan',
    image: '/images/services/Rakht_Mokshan.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
    ),
  },
  {
    name: 'Agni Karma',
    description: 'Our Agni Karma therapy is a specialized Ayurvedic treatment that uses controlled therapeutic heat to manage chronic pain and musculoskeletal disorders. By applying heated metal instruments to specific points on the body, this technique helps relieve conditions such as arthritis, joint pain, sciatica, and muscle stiffness. Agni Karma provides fast, localized pain relief without side effects and promotes long-term healing by improving blood circulation and reducing inflammation. Performed by skilled practitioners, this powerful therapy offers a natural and effective alternative to conventional pain management methods.',
    href: 'services/agni-karma',
    image: '/images/services/agni_karma.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    name: 'Yoga, Pranayama, and Meditation',
    description: 'Our services in Yoga, Pranayama, and Meditation are designed to bring balance, strength, and inner peace to your daily life. We offer guided yoga sessions that improve flexibility, posture, and physical health, while Pranayama (breathing techniques) helps regulate the flow of vital energy, enhancing mental clarity and emotional stability. Our meditation practices promote deep relaxation, stress reduction, and mindfulness, helping you reconnect with your inner self. Together, these ancient practices support holistic well-being by aligning the body, mind, and spirit in harmony.',
    href: 'services/yoga-meditation',
    image: '/images/services/Yoga_Pranayama_Meditation.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
      </svg>
    ),
  },
  {
    name: 'Depression and Stress Management',
    description: 'Our Depression and Stress Management services offer a holistic approach to emotional and mental well-being through the wisdom of Ayurveda, Naturopathy, and Yogic practices. We provide personalized care that may include herbal therapies, diet and lifestyle guidance, detox treatments, and supportive practices like Yoga, Pranayama, and meditation to calm the mind and uplift the spirit. By addressing the root causes of imbalance, we help you manage stress, reduce anxiety, and overcome depressive states naturally - restoring inner peace, clarity, and emotional resilience.',
    href: 'services/stress-management',
    image: '/images/services/Depression_Stress_Management.JPG',
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
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

      {/* Services accordion */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:gap-y-16">
          {services.map((service, index) => (
            <div 
              key={service.name} 
              className="card p-8 hover:shadow-glow transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Service image */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image 
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority={index < 3}
                    />
                  </div>
                </div>
                
                {/* Service title, description, and toggle */}
                <div className="w-full md:w-2/3">
                  <div 
                    onClick={() => toggleService(service.name)}
                    className="flex items-center justify-between gap-x-3 text-xl font-semibold leading-7 text-primary-700 dark:text-primary-400 mb-4 cursor-pointer hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
                    aria-expanded={expandedService === service.name}
                    aria-controls={`service-content-${index}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleService(service.name);
                      }
                    }}
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-wellness text-white shadow-soft">
                        <service.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      {service.name}
                    </div>
                    <svg 
                      className={`h-6 w-6 transition-transform duration-300 ${expandedService === service.name ? 'rotate-180' : ''}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  <div className="text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Expandable content */}
              <div 
                id={`service-content-${index}`}
                className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedService === service.name 
                    ? 'max-h-[1000px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  {service.detailedDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="mb-4">
                      {paragraph.includes('**') 
                        ? paragraph.split('**').map((part, j) => 
                            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                          )
                        : paragraph
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 