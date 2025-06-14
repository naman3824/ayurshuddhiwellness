# Ayur Shuddhi Wellness

A modern, responsive website for Ayur Shuddhi Wellness, built with Next.js 14, React 18, and Tailwind CSS. This platform showcases holistic wellness services, including Ayurveda, Panchakarma, Yoga, and Meditation, with an integrated booking system.

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

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## 📂 Project Structure

```
ayurshuddhiwellness/
├── app/                    # App Router pages and layouts
│   ├── [lang]/             # Language-specific routes
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── gallery/        # Photo gallery
│   │   └── services/       # Services pages
│   ├── book/               # Booking system
│   └── globals.css         # Global styles
├── components/             # Reusable components
├── public/                 # Static files
│   └── images/             # Image assets
└── styles/                 # Global styles and Tailwind config
```

## 🌟 Key Features in Detail

### Services
- Detailed service pages for Ayurveda, Panchakarma, and Yoga/Meditation
- Service-specific information and benefits
- High-quality images and descriptions

### Booking System
- Step-by-step booking process
- Calendar and time slot selection
- Service and practitioner selection
- Secure payment integration

### Gallery
- Beautiful image grid layout
- Lightbox for full-screen viewing
- Organized by categories

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interfaces

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The static site will be generated in the `out` directory.

## Project Structure

```
ayurshuddhiwellness/
├── app/                    # Next.js app directory
│   ├── [lang]/            # Language-specific routes
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── services/      # Services pages
│   │   └── layout.jsx     # Language-specific layout
│   ├── layout.jsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── public/               # Static assets
└── ...config files
```

## Multilingual Support

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

## License

This project is private and confidential.

## Contact

For any queries regarding the project, please contact [contact information].
