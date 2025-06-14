'use client';

import { useState } from 'react';
import Image from 'next/image';

// Icon components map (copied from ServiceCard.jsx)
const icons = {
  leaf: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  smile: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
  ),
  flask: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  pulse: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  eye: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25v-1.5m0 1.5v1.5m-2.25-1.5h4.5m-4.5 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
    </svg>
  ),
  arrows: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
    </svg>
  ),
  fire: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
    </svg>
  ),
  globe: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  heart: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
};

// Mock services data (based on the services in the services page)
const services = [
  {
    name: 'Ayurveda',
    description: 'Restore balance and promote natural healing through time-tested therapies and personalized care.',
    image: '/images/services/ayurveda.JPG',
    iconName: 'leaf',
    price: '₹1,500',
    duration: '60 min',
  },
  {
    name: 'Naturopathy',
    description: 'Harness the healing power of nature to restore and maintain your health with natural therapies.',
    image: '/images/services/naturopathy.JPG',
    iconName: 'smile',
    price: '₹1,200',
    duration: '45 min',
  },
  {
    name: 'Panchakarma',
    description: 'Experience profound detoxification and rejuvenation based on the ancient science of Ayurveda.',
    image: '/images/services/panchakarma.JPG',
    iconName: 'flask',
    price: '₹2,500',
    duration: '90 min',
  },
  {
    name: 'Pulse Diagnosis (Nadi Pariksha)',
    description: 'Assess your physical, mental, and emotional health through this powerful diagnostic tool.',
    image: '/images/services/pulse_diagnosis.JPG',
    iconName: 'pulse',
    price: '₹800',
    duration: '30 min',
  },
  {
    name: 'Tongue Diagnosis',
    description: 'Gain valuable insights into your overall health through traditional Ayurvedic assessment.',
    image: '/images/services/tongue_diagnosis.JPG',
    iconName: 'eye',
    price: '₹800',
    duration: '30 min',
  },
  {
    name: 'Rakht Mokshan and Leech Therapy',
    description: 'Specialized blood purification treatment that is a vital part of Ayurvedic Panchakarma.',
    image: '/images/services/Rakht_Mokshan.JPG',
    iconName: 'arrows',
    price: '₹1,800',
    duration: '60 min',
  },
  {
    name: 'Agni Karma',
    description: 'Specialized Ayurvedic treatment using controlled therapeutic heat for chronic pain management.',
    image: '/images/services/agni_karma.JPG',
    iconName: 'fire',
    price: '₹1,500',
    duration: '45 min',
  },
  {
    name: 'Yoga, Pranayama, and Meditation',
    description: 'Bring balance, strength, and inner peace to your daily life through ancient practices.',
    image: '/images/services/Yoga_Pranayama_Meditation.JPG',
    iconName: 'globe',
    price: '₹1,000',
    duration: '60 min',
  },
  {
    name: 'Depression and Stress Management',
    description: 'Holistic approach to emotional and mental well-being through Ayurveda, Naturopathy, and Yogic practices.',
    image: '/images/services/Depression_Stress_Management.JPG',
    iconName: 'heart',
    price: '₹1,200',
    duration: '60 min',
  },
];

export function ServiceSelector({ selectedService, onSelectService }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isServicePreSelected = !!selectedService;
  
  // Filter services based on search term
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a service is pre-selected, filter to show only that service
  const displayServices = isServicePreSelected 
    ? filteredServices.filter(service => service.name === selectedService)
    : filteredServices;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isServicePreSelected ? 'Selected Service' : 'Select a Service'}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {isServicePreSelected 
            ? 'You are booking the following service' 
            : 'Choose the service you would like to book'}
        </p>
      </div>

      {!isServicePreSelected && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayServices.map((service) => {
          const IconComponent = icons[service.iconName];
          const isSelected = selectedService === service.name;
          
          return (
            <div
              key={service.name}
              onClick={isServicePreSelected ? undefined : () => onSelectService(service.name)}
              className={`
                relative rounded-xl overflow-hidden transition-all duration-300
                ${isSelected ? 'ring-4 ring-primary-500 dark:ring-primary-400 shadow-glow' : 'hover:shadow-md'}
                ${!isServicePreSelected ? 'cursor-pointer' : 'cursor-default'}
              `}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Price and duration */}
                <div className="absolute bottom-0 w-full p-4 flex justify-between items-center">
                  <span className="text-white font-semibold">{service.price}</span>
                  <span className="text-white text-sm">{service.duration}</span>
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-primary-700 dark:text-primary-400 mb-2">
                  {IconComponent && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-wellness text-white shadow-soft">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                  {service.name}
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
              
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No services found matching your search. Please try a different search term.
          </p>
        </div>
      )}

      {selectedService && (
        <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
          <p className="text-sm text-primary-800 dark:text-primary-300">
            <span className="font-medium">Selected service:</span> {selectedService}
          </p>
        </div>
      )}
    </div>
  );
}