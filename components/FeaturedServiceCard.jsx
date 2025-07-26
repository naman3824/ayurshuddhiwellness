'use client';

import Image from 'next/image';
import Link from 'next/link';

// Icon components map
const icons = {
  leaf: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  flask: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  globe: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
    </svg>
  ),
  heart: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
};

export default function FeaturedServiceCard({ 
  title, 
  description, 
  image, 
  iconName, 
  href, 
  learnMoreHref,
  lang = 'en-IN' 
}) {
  // Get the icon component based on the icon name
  const IconComponent = iconName && icons[iconName] ? icons[iconName] : null;

  // Truncate description to approximately 2 lines (roughly 120 characters)
  const truncatedDescription = description.length > 120 
    ? description.substring(0, 120).replace(/\s+\S*$/, '') + '...'
    : description;

  return (
    <div className="group relative bg-ivory-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-warm transition-all duration-500 transform hover:translate-y-[-8px] border border-primary-100/20 dark:border-gray-700/50 overflow-hidden">
      {/* Service Image */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden">
        <Image 
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          {IconComponent && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-saffron text-white shadow-soft group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
              <IconComponent className="h-5 w-5" aria-hidden="true" />
            </div>
          )}
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow text-sm sm:text-base">
          {truncatedDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <Link 
            href={`/book?service=${encodeURIComponent(title)}`}
            className="flex-1 btn btn-primary text-center py-2.5 px-4 text-sm font-semibold rounded-xl hover-scale focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={`Book ${title} service`}
          >
            📅 Book Now
          </Link>
          <Link 
            href={learnMoreHref || `/${lang}/${href}`}
            className="flex-1 btn btn-secondary text-center py-2.5 px-4 text-sm font-semibold rounded-xl hover-scale focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 group/link"
            aria-label={`Learn more about ${title}`}
          >
            Learn More
            <svg className="inline-block w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
} 