# Ayur Shuddhi Wellness

A modern, responsive website for Ayur Shuddhi Wellness, built with Next.js 14, React 18, and Tailwind CSS. This platform showcases holistic wellness services, including Ayurveda, Panchakarma, Yoga, and Meditation, with an integrated booking system.

## 📋 Project Overview

### Purpose
Ayur Shuddhi Wellness website serves as a digital platform to connect clients with authentic Ayurvedic wellness services. The site aims to educate visitors about traditional healing practices while providing a seamless booking experience for various treatments and consultations.

## ✨ Features

- 🌐 Multilingual support (currently English - India)
- 📱 Fully responsive design for all devices
- ⚡ Fast, optimized performance with Next.js 14
- 🎨 Modern, wellness-inspired UI with dark mode support
- 📅 Interactive booking system with calendar and time slot selection
- 📸 Beautiful gallery showcasing our wellness center and services
- 📝 Service details with comprehensive descriptions and images
- 📱 Mobile-first, accessible user interface
- 🔍 SEO optimized for better discoverability
- 🌓 Dark/light theme toggle



## 🛠 Tech Stack

- **Frontend Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Styling**: Tailwind CSS with custom theming
- **Icons**: Custom SVG and Heroicons
- **Form Handling**: React Hook Form
- **State Management**: React Context API
- **Linting**: ESLint with Next.js defaults
- **Build Tool**: Vite (via Next.js)

## 📂 Project Structure

```
ayurshuddhiwellness/
├── app/                    # Next.js app directory
│   ├── [lang]/            # Language-specific routes
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── gallery/       # Photo gallery
│   │   ├── services/      # Services pages
│   │   └── layout.jsx     # Language-specific layout
│   ├── book/              # Booking system
│   ├── layout.jsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── public/                # Static assets
│   └── images/            # Image assets
└── ...config files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (v9+) or yarn (v1.22+)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ayurshuddhiwellness.git
   cd ayurshuddhiwellness
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create environment variables file (optional):
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Example environment variables
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_DEFAULT_LOCALE=en-IN
   # Add any API keys or service credentials here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Deployment

#### Development Mode
```bash
npm run dev
# or
yarn dev
```

#### Production Mode
```bash
# Build the application
npm run build

# Start the production server
npm start
# or
yarn build && yarn start
```

### Troubleshooting Common Issues

#### Favicon.ico Error
If you encounter a 404 error for favicon.ico, ensure it's placed in the `/public` directory:
```bash
# The favicon should be located at:
/public/favicon.ico
```

#### Dependency Vulnerabilities
Regularly check and fix security vulnerabilities:
```bash
# Check for vulnerabilities
npm audit

# Fix minor issues automatically
npm audit fix

# Fix major issues (may include breaking changes)
npm audit fix --force
```

#### Next.js Build Errors
If you encounter build errors related to static exports:
1. Check that all dynamic routes have proper `generateStaticParams()` functions
2. Ensure metadata is properly configured using `generateMetadata()` functions
3. Verify that `viewport` and `themeColor` are exported separately from metadata



## 🌟 Key Features in Detail

### Services
- Detailed service pages for Ayurveda, Panchakarma, and Yoga/Meditation
- Service-specific information and benefits
- High-quality images and descriptions
- Featured service cards on homepage
- Service categorization and filtering

### Booking System
- Step-by-step booking process
- Calendar and time slot selection
- Service and practitioner selection
- Secure payment integration
- Booking confirmation and receipt generation

### Gallery
- Beautiful image grid layout
- Lightbox for full-screen viewing
- Organized by categories
- Optimized image loading

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interfaces
- Adaptive layouts for different devices

### Multilingual Support
- Language selection interface
- Localized content and formatting
- Expandable to additional languages

### Theme Support
- Dark/light mode toggle
- Persistent theme preference
- Wellness-inspired color palette



## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run convert-heic` - Convert HEIC images to JPG (requires Node.js)

## 🎨 Theming

The application supports both light and dark modes, with smooth transitions between themes. The color scheme is based on a soothing, wellness-inspired palette.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)



## 📂 Project Structure

```
ayurshuddhiwellness/
├── app/                    # Next.js app directory
│   ├── [lang]/            # Language-specific routes
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── gallery/       # Photo gallery
│   │   ├── services/      # Services pages
│   │   └── layout.jsx     # Language-specific layout
│   ├── book/              # Booking system
│   ├── layout.jsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── public/                # Static assets
│   └── images/            # Image assets
└── ...config files
```

### Multilingual Support

The website currently supports:
- English (India) - `/en-IN`

Additional languages can be added by:
1. Adding new language routes in `app/[lang]`
2. Updating the `next.config.mjs` file
3. Adding translations for each page

## Development

### Code Style

- Follow the ESLint configuration
- Use JSDoc comments for documenting functions and components
- Follow the component structure in the `components` directory
- Keep pages in the appropriate language directory

### Adding New Pages

1. Create a new directory in `app/[lang]`
2. Add the page component
3. Update the navigation if needed
4. Add necessary metadata for SEO

### Security Best Practices

- Run `npm audit` regularly to check for vulnerabilities
- Apply security patches with `npm audit fix` as part of your development workflow
- Review major updates carefully before applying with `npm audit fix --force`
- Keep dependencies updated to their latest secure versions
- No sensitive user data is stored in client-side storage
- Form submissions use proper validation and sanitization
- Static site generation minimizes attack vectors

## 📄 License

This project is private and confidential.

## Contact

For any queries regarding the project, please contact naman3824@gmail.com
