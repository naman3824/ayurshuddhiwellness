import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  title: {
    default: 'AyurShuddhi Blog — Ayurveda & Holistic Wellness',
    template: '%s | AyurShuddhi Blog',
  },
  description:
    'Insights on Ayurveda, holistic wellness, and natural healing — straight from our practitioners at Ayur Shuddhi Wellness.',
};

export default function BlogLayout({ children }) {
  return (
    <html lang="en-IN" className={nunito.variable}>
      <body className="bg-gray-950 text-gray-100 antialiased font-[family-name:var(--font-nunito)]">
        {children}
      </body>
    </html>
  );
}
