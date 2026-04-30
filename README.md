# Ayur Shuddhi Wellness

A modern, responsive, production-ready website for Ayur Shuddhi Wellness. Built with Next.js 15, React 19, and Tailwind CSS. This platform showcases holistic wellness services (Ayurveda, Panchakarma, Yoga, Meditation) and features a fully integrated booking system, role-based authentication, an admin dashboard, and advanced SEO/Performance optimizations.

## 📋 Project Overview

### Purpose
Ayur Shuddhi Wellness serves as a digital platform to connect clients with authentic Ayurvedic wellness services. The site educates visitors about traditional healing practices while providing a seamless, secure booking experience and a dedicated dashboard for users to manage their appointments.

## ✨ Key Features

- 🌐 **Multilingual Routing Architecture** (currently supporting English - India via `[lang]` routing)
- 🔒 **Role-Based Authentication** (Firebase Auth) with User and Admin access levels
- 📅 **Integrated Booking System** with real-time Firestore syncing and EmailJS receipt notifications
- 👤 **User Dashboard ("My Bookings")** allowing users to view and manage/cancel their personal appointments
- 🛡️ **Secure API Routes** utilizing the Firebase Admin SDK to verify tokens and enforce data ownership
- 📢 **Dynamic Homepage Announcements** with a session-persisted modal
- ⚡ **Production Performance** optimized with Next.js `<Suspense>` streaming and `<Image>` LCP prioritization
- 🔍 **Technical SEO** implemented via dynamic `sitemap.xml`, `robots.js`, and comprehensive OpenGraph metadata
- 🎨 **Modern Indian-Inspired UI** with custom Tailwind typography, glassmorphism overlays, and smooth micro-animations

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 15.5 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **Backend & Database**: Firebase (Auth, Firestore Client SDK, Firebase Admin SDK)
- **Emails**: EmailJS
- **Fonts**: Self-hosted Google Fonts (Noto Sans, Poppins) via `next/font`

## 📂 Project Structure

```text
ayurshuddhiwellness/
├── app/                    # Next.js App Router
│   ├── [lang]/             # Language-specific routes (Core App)
│   │   ├── about/          # About page
│   │   ├── blog/           # Wellness blog (Dynamic routing)
│   │   ├── bookings/       # User dashboard to view/cancel their bookings
│   │   ├── contact/        # Contact form
│   │   ├── login/          # Unified Login / Registration page
│   │   ├── profile/        # User profile management
│   │   ├── services/       # Services directory
│   │   └── layout.jsx      # Language-specific layout
│   ├── admin/              # Admin dashboard (Role-protected)
│   ├── api/                # Secure API Routes (Firebase Admin verified)
│   ├── book/               # Single-page multi-step booking system
│   ├── layout.jsx          # Root layout with Global Providers
│   ├── globals.css         # Global styles and Tailwind directives
│   ├── robots.js           # SEO crawler configuration
│   └── sitemap.js          # Dynamic XML sitemap generator
├── components/             # Reusable UI Components
│   ├── AuthProvider.jsx    # Global Authentication context & Role management
│   ├── UnifiedBookingForm.jsx # Multi-step booking engine
│   └── HomepageMessageModal.jsx # Dynamic announcements
├── lib/                    # Backend Integrations
│   ├── firebaseClient.js   # Public Firebase Client SDK setup
│   └── firebaseAdmin.js    # Secure Firebase Admin SDK setup (for API/Server)
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
   Create a `.env.local` file in the root directory. **Note: Never commit this file to version control.**

   ```env
   # Firebase Public Client Variables
   NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_bucket"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
   
   # Firebase Admin Variables (SERVER SIDE ONLY - REQUIRED FOR VERCEL)
   FIREBASE_PROJECT_ID="your_project_id"
   FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com"
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nLong\nKey\nHere\n-----END PRIVATE KEY-----\n"

   # EmailJS
   NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service"
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template"
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_key"

   # Site Configuration
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Deployment (Vercel)

This application is optimized for Vercel deployment. Because `.env.local` is ignored by Git, you **must** manually add all of the above environment variables into your Vercel Project Settings dashboard before building. The `FIREBASE_PRIVATE_KEY` must be pasted exactly as it appears, including the `\n` characters.

```bash
# Build the application locally to verify production readiness
npm run build

# Start the local production server
npm start
```

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
