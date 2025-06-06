import Image from 'next/image';
import Link from 'next/link';
import { toUrlSlug } from '../../../../utils/urlUtils';
import { ServiceDetailClient } from './service-detail-client';

// Import services data from the services page
const services = [
  {
    name: 'Ayurveda',
    description: 'Our Ayurveda services are designed to restore balance and promote natural healing through time-tested therapies and personalized care. We offer Ayurvedic consultations to understand your unique body constitution (Prakriti), followed by customized treatments and herbal remedies. Our specialized Panchakarma therapies help detoxify and rejuvenate the body, while lifestyle and diet recommendations support long-term wellness. Rooted in ancient wisdom, our approach nurtures holistic health - body, mind, and spirit.',
    detailedDescription: 'Ayurveda, the "science of life," is one of the world\'s oldest holistic healing systems. At Ayur Shuddhi Wellness, we practice authentic Ayurvedic principles that have been refined over thousands of years. Our comprehensive Ayurveda services include:\n\n1. **Personalized Consultation**: Our experienced practitioners assess your unique constitution (Prakriti) and current imbalances (Vikriti) through traditional diagnostic methods including pulse, tongue, and facial diagnosis.\n\n2. **Customized Treatment Plans**: Based on your consultation, we create individualized wellness programs that may include dietary recommendations, lifestyle modifications, herbal formulations, and therapeutic treatments.\n\n3. **Specialized Therapies**: Experience our range of traditional Ayurvedic therapies including Abhyanga (oil massage), Shirodhara (forehead oil flow), Swedana (herbal steam), and more.\n\n4. **Seasonal Detoxification**: Regular cleansing programs aligned with seasonal changes to remove accumulated toxins and restore optimal health.\n\n5. **Preventative Care**: Long-term wellness strategies to maintain balance and prevent disease through daily routines (Dinacharya) and seasonal protocols (Ritucharya).',
    image: '/images/services/ayurveda.JPG',
    iconName: 'leaf',
  },
  {
    name: 'Naturopathy',
    description: 'Our Naturopathy services focus on harnessing the healing power of nature to restore and maintain your health. We offer a range of natural therapies including diet and nutrition guidance, and detox programs tailored to your individual needs. By addressing the root causes of illness rather than just the symptoms, our naturopathic approach supports the body\'s innate ability to heal itself - gently, effectively, and without side effects.',
    detailedDescription: 'Naturopathy is a holistic system of medicine that combines modern scientific knowledge with traditional healing wisdom. Our naturopathic services are designed to stimulate your body\'s natural healing abilities through gentle, non-invasive methods. Our comprehensive approach includes:\n\n1. **Holistic Assessment**: We evaluate your overall health, lifestyle, diet, and environmental factors to understand the root causes of your health concerns.\n\n2. **Nutritional Therapy**: Personalized dietary plans that focus on whole foods, elimination diets, and therapeutic nutrition to address specific health conditions.\n\n3. **Detoxification Programs**: Structured protocols to help your body eliminate accumulated toxins and restore optimal function of your digestive system, liver, and kidneys.\n\n4. **Hydrotherapy**: The therapeutic use of water in various forms and temperatures to stimulate circulation, reduce inflammation, and support detoxification.\n\n5. **Lifestyle Counseling**: Guidance on sleep, stress management, exercise, and environmental factors that impact your health.\n\n6. **Herbal Medicine**: The use of plant-based remedies to support healing and address specific health concerns naturally.',
    image: '/images/services/naturopathy.JPG',
    iconName: 'smile',
  },
  // Add more services as needed
];

// Add all services from the services page
const allServices = [
  ...services,
  {
    name: 'Panchakarma',
    description: 'Our Panchakarma services offer a profound detoxification and rejuvenation experience based on the ancient science of Ayurveda.',
    detailedDescription: 'Panchakarma, meaning "five actions" in Sanskrit, is Ayurveda\'s premier cleansing and rejuvenation protocol. This comprehensive detoxification therapy removes deep-seated toxins and restores the body\'s innate healing ability. At Ayur Shuddhi Wellness, our authentic Panchakarma program includes:\n\n1. **Personalized Assessment**: Before beginning treatment, our Ayurvedic physicians conduct a thorough evaluation of your constitution (Prakriti) and current imbalances (Vikriti) to customize your Panchakarma experience.\n\n2. **Preparatory Therapies (Purvakarma)**: These initial treatments prepare your body for the main detoxification process by loosening and mobilizing toxins from tissues through specialized oil massage (Abhyanga) and herbal steam therapy (Swedana).\n\n3. **Five Primary Cleansing Procedures**: Depending on your needs, we may recommend one or more of the classical Panchakarma therapies: therapeutic vomiting (Vamana), purgation (Virechana), medicated enema (Basti), nasal administration of medicines (Nasya), and blood purification (Rakta Mokshana).\n\n4. **Rejuvenation (Rasayana)**: Following detoxification, we implement rejuvenation protocols to strengthen your immune system, restore vitality, and promote longevity.\n\n5. **Post-Therapy Guidance**: We provide comprehensive dietary and lifestyle recommendations to maintain the benefits of your Panchakarma treatment and prevent the recurrence of imbalances.',
    image: '/images/services/panchakarma.JPG',
    iconName: 'flask',
  },
  {
    name: 'Pulse Diagnosis (Nadi Pariksha)',
    description: 'Our Pulse Diagnosis service, known as Nadi Pariksha in Ayurveda, is a powerful diagnostic tool used to assess your physical, mental, and emotional health.',
    detailedDescription: 'Nadi Pariksha (Pulse Diagnosis) is one of Ayurveda\'s most profound diagnostic methods, allowing our practitioners to assess the subtle energetic imbalances in your body before they manifest as physical symptoms. This non-invasive technique has been refined over thousands of years and provides remarkable insights into your overall health. Our Pulse Diagnosis service includes:\n\n1. **Comprehensive Assessment**: Our skilled practitioners evaluate the rhythm, strength, and quality of your pulse at different points on your wrist to determine the state of your doshas (Vata, Pitta, and Kapha) and the health of your organs and tissues.\n\n2. **Early Detection**: Pulse diagnosis can reveal imbalances weeks or even months before they manifest as physical symptoms, allowing for preventative intervention.\n\n3. **Mental and Emotional Insights**: Beyond physical health, Nadi Pariksha provides valuable information about your mental and emotional state, helping address psychological factors that may contribute to physical ailments.\n\n4. **Seasonal Evaluation**: Regular pulse assessments throughout the year help track how seasonal changes affect your constitution and allow for timely adjustments to your wellness routine.\n\n5. **Personalized Recommendations**: Based on your pulse reading, we provide tailored dietary, lifestyle, and therapeutic recommendations to address current imbalances and prevent future health concerns.',
    image: '/images/services/pulse_diagnosis.JPG',
    iconName: 'pulse',
  },
  {
    name: 'Tongue Diagnosis',
    description: 'Our Tongue Diagnosis service is a key part of traditional Ayurvedic and Naturopathic assessment, offering valuable insights into your overall health.',
    detailedDescription: 'Tongue Diagnosis (Jihva Pariksha) is an essential component of Ayurvedic assessment that provides a visual window into your internal health. The tongue\'s appearance—its color, coating, shape, and moisture level—reflects the state of your digestive system and overall well-being. At Ayur Shuddhi Wellness, our Tongue Diagnosis service includes:\n\n1. **Comprehensive Evaluation**: Our practitioners carefully examine various aspects of your tongue, including its color, texture, coating, moisture level, shape, and any markings or discolorations, each providing specific information about different organs and systems in your body.\n\n2. **Digestive System Assessment**: The tongue offers particular insight into the state of your digestive fire (Agni) and the presence of toxins (Ama), allowing us to identify digestive imbalances that may be the root cause of various health issues.\n\n3. **Organ System Mapping**: Different areas of the tongue correspond to specific organ systems, enabling our practitioners to identify which parts of your body may require attention.\n\n4. **Integration with Other Diagnostic Methods**: We combine tongue diagnosis with pulse assessment, facial diagnosis, and a detailed health history to create a comprehensive understanding of your current health status.\n\n5. **Monitoring Progress**: Regular tongue examinations allow us to track your progress during treatment, providing visual confirmation of improving health as imbalances are corrected.',
    image: '/images/services/tongue_diagnosis.JPG',
    iconName: 'eye',
  },
  {
    name: 'Rakht Mokshan and Leech Therapy',
    description: 'Our Rakt Mokshan therapy, a vital part of Ayurvedic Panchakarma, is a specialized blood purification treatment.',
    detailedDescription: 'Rakta Mokshana (therapeutic bloodletting) is one of the five primary Panchakarma procedures in Ayurveda, specifically designed to purify the blood and remove toxins that cannot be eliminated through other detoxification methods. At Ayur Shuddhi Wellness, we offer this ancient therapy in its most gentle and effective form—medicinal leech therapy (Jalaukavacharana). Our Rakta Mokshana service includes:\n\n1. **Comprehensive Assessment**: Before recommending leech therapy, our Ayurvedic physicians conduct a thorough evaluation to determine if this treatment is appropriate for your specific condition and constitution.\n\n2. **Therapeutic Applications**: This therapy is particularly beneficial for skin disorders, inflammatory conditions, circulatory problems, and certain types of arthritis where blood toxicity is a contributing factor.\n\n3. **Medicinal Leech Treatment**: We use specially cultivated medicinal leeches that secrete beneficial enzymes and compounds during the therapy, including hirudin (a natural anticoagulant), anti-inflammatory agents, and vasodilators that enhance the therapeutic effect.\n\n4. **Safe and Controlled Environment**: All treatments are performed under strict hygienic conditions by experienced practitioners who ensure your comfort and safety throughout the procedure.\n\n5. **Post-Treatment Care**: Following the therapy, we provide specific dietary and lifestyle recommendations to maximize the benefits of the treatment and support your body\'s continued detoxification process.',
    image: '/images/services/Rakht_Mokshan.JPG',
    iconName: 'arrows',
  },
  {
    name: 'Agni Karma',
    description: 'Our Agni Karma therapy is a specialized Ayurvedic treatment that uses controlled therapeutic heat to manage chronic pain and musculoskeletal disorders.',
    detailedDescription: 'Agni Karma (thermal therapy) is a specialized Ayurvedic treatment that utilizes precisely controlled heat to treat various chronic conditions, particularly those affecting the musculoskeletal system. This ancient therapy works by stimulating specific marma points (vital energy centers) and tissue healing mechanisms. At Ayur Shuddhi Wellness, our Agni Karma service includes:\n\n1. **Personalized Assessment**: Our Ayurvedic physicians conduct a thorough evaluation to determine if Agni Karma is appropriate for your condition and to identify the specific points that require treatment.\n\n2. **Therapeutic Applications**: This therapy is particularly effective for chronic joint pain, muscle stiffness, nerve pain, sports injuries, and certain skin conditions that have not responded to other treatments.\n\n3. **Precision Treatment**: Using specially designed instruments and techniques, we apply controlled heat to specific points for precise durations, ensuring therapeutic benefit without tissue damage.\n\n4. **Integration with Other Therapies**: Agni Karma is often combined with herbal preparations, medicated oils, and other complementary treatments to enhance its effectiveness and provide comprehensive care.\n\n5. **Post-Treatment Protocol**: Following the procedure, we provide specific care instructions, herbal applications, and dietary recommendations to support healing and maximize the benefits of the treatment.',
    image: '/images/services/agni_karma.JPG',
    iconName: 'fire',
  },
  {
    name: 'Yoga, Pranayama, and Meditation',
    description: 'Our services in Yoga, Pranayama, and Meditation are designed to bring balance, strength, and inner peace to your daily life.',
    detailedDescription: 'At Ayur Shuddhi Wellness, we offer comprehensive instruction in the three pillars of mind-body wellness: Yoga (physical postures), Pranayama (breath control), and Meditation (mental focus). These ancient practices work synergistically to promote physical health, emotional balance, and spiritual growth. Our integrated approach includes:\n\n1. **Personalized Yoga Instruction**: We teach traditional yoga asanas (postures) adapted to your individual needs, physical condition, and health goals. Our approach emphasizes proper alignment, mindful movement, and the therapeutic application of yoga for specific health concerns.\n\n2. **Pranayama Techniques**: Learn powerful breathing exercises that enhance vital energy, improve respiratory function, calm the nervous system, and prepare the mind for meditation. Our instructors guide you through progressive practices suitable for your constitution and experience level.\n\n3. **Meditation Practices**: Discover various meditation techniques to quiet the mind, reduce stress, improve concentration, and develop greater self-awareness. We offer guidance in mantra meditation, mindfulness practices, visualization, and other approaches to help you find what works best for you.\n\n4. **Mind-Body Integration**: Our holistic approach helps you understand the connections between physical postures, breath, mind, and consciousness, creating a foundation for comprehensive well-being.\n\n5. **Daily Practice Guidance**: We provide practical advice for establishing and maintaining a regular practice that fits your lifestyle, gradually building habits that support lasting transformation.',
    image: '/images/services/Yoga_Pranayama_Meditation.JPG',
    iconName: 'globe',
  },
  {
    name: 'Depression and Stress Management',
    description: 'Our Depression and Stress Management services offer a holistic approach to emotional and mental well-being through the wisdom of Ayurveda, Naturopathy, and Yogic practices.',
    detailedDescription: 'At Ayur Shuddhi Wellness, we understand that mental and emotional health are integral aspects of overall wellness. Our Depression and Stress Management program combines the wisdom of Ayurveda, Naturopathy, and Yogic sciences to address the root causes of psychological imbalances while providing practical tools for immediate relief. Our comprehensive approach includes:\n\n1. **Holistic Assessment**: We evaluate physical, mental, and emotional factors contributing to your condition, including constitution, lifestyle patterns, nutritional status, and stress triggers, to create a personalized treatment plan.\n\n2. **Ayurvedic Therapies**: Experience specialized treatments such as Shirodhara (forehead oil flow), Shiro Abhyanga (head massage), and Nasya (nasal administration of herbs) that calm the nervous system, balance brain chemistry, and promote emotional stability.\n\n3. **Nutritional Support**: Receive guidance on brain-nourishing foods, herbs, and supplements that support neurotransmitter function and mood regulation based on both Ayurvedic principles and modern nutritional science.\n\n4. **Mind-Body Practices**: Learn specific yoga postures, breathing techniques, and meditation practices scientifically proven to reduce anxiety, alleviate depression, and build resilience to stress.\n\n5. **Lifestyle Counseling**: Develop sustainable daily routines that support mental health, including sleep optimization, stress management techniques, digital detox strategies, and practices for cultivating positive mental states.',
    image: '/images/services/Depression_Stress_Management.JPG',
    iconName: 'heart',
  },
];

// Generate static params for all possible service pages
export async function generateStaticParams() {
  // Get all supported languages
  const languages = ['en-IN'];
  
  // Generate params for all combinations of language and service
  const params = [];
  
  for (const lang of languages) {
    for (const service of allServices) {
      params.push({
        lang,
        serviceName: toUrlSlug(service.name),
      });
    }
  }
  
  return params;
}

export default function ServiceDetailPage({ params }) {
  // Find the service that matches the URL slug
  const service = allServices.find(s => toUrlSlug(s.name) === params.serviceName);
  
  // Use the client component to render the service detail
  return <ServiceDetailClient service={service} params={params} />;
}