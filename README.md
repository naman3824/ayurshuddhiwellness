# Ayur Shuddhi Wellness

A modern, statically-generated website for Ayur Shuddhi Wellness, built with Next.js 14 and Tailwind CSS.

## Features

- 🌐 Multilingual support (currently English - India)
- 📱 Fully responsive design
- ⚡ Static site generation for optimal performance
- 🎨 Modern, wellness-inspired UI
- 🔍 SEO optimized
- 🧩 Built with JavaScript for ease of development

## Tech Stack

- Next.js 14
- React 18
- JavaScript
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd ayurshuddhiwellness
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
