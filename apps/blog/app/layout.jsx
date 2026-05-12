export const metadata = {
  title: 'AyurShuddhi Blog',
  description: 'Insights on Ayurveda, holistic wellness, and natural healing.',
};

export default function BlogLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
