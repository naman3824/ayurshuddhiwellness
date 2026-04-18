# Ayur Shuddhi Wellness

A modern, responsive website for Ayur Shuddhi Wellness, built with Next.js 15, React 19, and Tailwind CSS. This platform showcases holistic wellness services, including Ayurveda, Panchakarma, Yoga, and Meditation, with an integrated booking system and secure user authentication.

## 📋 Project Overview

### Purpose
Ayur Shuddhi Wellness website serves as a digital platform to connect clients with authentic Ayurvedic wellness services. The site aims to educate visitors about traditional healing practices while providing a seamless, secure booking experience for various treatments and consultations.

## ✨ Features

- 🌐 Multilingual support (currently English - India)
- 🔒 Secure User Authentication (Login, Signup, Password Reset) via Firebase
- 📱 Fully responsive design for all devices
- ⚡ Fast, optimized performance with Next.js 15
- 🎨 Modern, wellness-inspired UI with dark mode support
- 📅 Multi-step interactive booking system integrated with Firestore
- 📸 Beautiful gallery showcasing our wellness center and services
- 📝 Service details with comprehensive descriptions and images
- 📧 Automated Email Notifications via EmailJS
- 🔍 SEO optimized for better discoverability
- 🌓 Dark/light theme toggle

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 15.5 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4 with custom theming
- **Backend & Database**: Firebase (Auth, Firestore)
- **Emails**: EmailJS
- **Icons**: Custom SVG and Heroicons
- **Form Handling**: React Hook Form / State-driven validation
- **State Management**: React Context API (`AuthProvider`, `ThemeProvider`)

## 📂 Project Structure

```text
ayurshuddhiwellness/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication route group (login, signup)
│   ├── [lang]/             # Language-specific routes
│   │   ├── about/          # About page
│   │   ├── blog/           # Wellness blog
│   │   ├── contact/        # Contact page
│   │   ├── gallery/        # Photo gallery
│   │   ├── services/       # Services pages
│   │   └── layout.jsx      # Language-specific layout
│   ├── admin/              # Admin dashboard & management
│   ├── api/                # API Routes (CSRF, etc.)
│   ├── book/               # Protected Single-page booking system
│   ├── layout.jsx          # Root layout with Global Providers
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── AuthProvider.jsx    # Global Authentication context
│   ├── ProtectedRoute.jsx  # Route protection guard
│   ├── UnifiedBookingForm.jsx # Multi-step booking form
│   └── ...                 # UI Components (Navbar, Footer, etc.)
├── lib/                    # Backend Integrations
│   ├── firebaseClient.js   # Firebase Client SDK setup
│   ├── firebaseAdmin.js    # Firebase Admin SDK setup
│   └── firestoreUtils.js   # Firestore database query helpers
├── utils/                  # Utility functions (validation, i18n, csrf)
└── public/                 # Static assets (images, icons)
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
   ```

3. Environment Variables setup:
   Create a `.env.local` file in the root directory with Firebase and EmailJS credentials:
   ```env
   # Firebase Variables
   NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_bucket"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
   
   # EmailJS
   NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service"
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template"
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_key"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Deployment

#### Production Mode
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🌟 Key Features in Detail

### Secure Authentication & Dashboard
- Full login, registration, and password recovery flows.
- Firebase integration securing user sessions locally and across APIs.
- Protected Routes blocking unauthorized access to booking screens.

### Unified Booking System
- Single-page, multi-step booking process.
- Calendar and time slot selection.
- Automatic Firestore syncing upon successful booking verification.
- Integrated EmailJS notifications sending receipts instantly to the user.

### Services
- Detailed service pages for Ayurveda, Panchakarma, and Yoga/Meditation.
- Service-specific information and benefits.
- High-quality images and descriptions.

### Gallery
- Beautiful image grid layout.
- Lightbox for full-screen viewing.
- Organized by categories.

### Responsive Design
- Mobile-first approach optimized for all screen sizes.
- Touch-friendly interfaces and adaptive layouts.

### Theme Support
- Dark/light mode toggle.
- Persistent theme preference based on user configurations.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is private and confidential.

## Contact
For any queries regarding the project, please contact naman3824@gmail.com
