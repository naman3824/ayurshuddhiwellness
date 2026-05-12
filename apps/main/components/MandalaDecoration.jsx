'use client';

export function MandalaDecoration({ className = '', size = 'md', opacity = 'low' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const opacityClasses = {
    low: 'opacity-10',
    medium: 'opacity-20',
    high: 'opacity-30',
  };

  return (
    <div className={`${sizeClasses[size]} ${opacityClasses[opacity]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-primary-500 animate-mandala-rotate"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle with decorative elements */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        
        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        
        {/* Center circle */}
        <circle
          cx="50"
          cy="50"
          r="15"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        
        {/* Cross lines */}
        <line
          x1="5"
          y1="50"
          x2="95"
          y2="50"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="95"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        
        {/* Diagonal lines */}
        <line
          x1="14.6"
          y1="14.6"
          x2="85.4"
          y2="85.4"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <line
          x1="85.4"
          y1="14.6"
          x2="14.6"
          y2="85.4"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        
        {/* Petal shapes */}
        <path
          d="M50 20 C55 25, 55 35, 50 40 C45 35, 45 25, 50 20"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M50 60 C55 65, 55 75, 50 80 C45 75, 45 65, 50 60"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M20 50 C25 45, 35 45, 40 50 C35 55, 25 55, 20 50"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M60 50 C65 45, 75 45, 80 50 C75 55, 65 55, 60 50"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />
        
        {/* Small decorative dots */}
        <circle cx="50" cy="10" r="1.5" fill="currentColor" />
        <circle cx="50" cy="90" r="1.5" fill="currentColor" />
        <circle cx="10" cy="50" r="1.5" fill="currentColor" />
        <circle cx="90" cy="50" r="1.5" fill="currentColor" />
        
        {/* Corner decorative elements */}
        <circle cx="25" cy="25" r="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="75" cy="25" r="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="25" cy="75" r="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="75" cy="75" r="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
}

export function MandalaPattern({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <MandalaDecoration 
        className="absolute top-8 right-8 text-primary-300" 
        size="lg" 
        opacity="low" 
      />
      <MandalaDecoration 
        className="absolute bottom-8 left-8 text-accent-300" 
        size="md" 
        opacity="low" 
      />
      <MandalaDecoration 
        className="absolute top-1/2 left-1/4 text-secondary-300 transform -translate-y-1/2" 
        size="sm" 
        opacity="low" 
      />
      <MandalaDecoration 
        className="absolute top-1/4 right-1/4 text-primary-200" 
        size="sm" 
        opacity="low" 
      />
    </div>
  );
} 