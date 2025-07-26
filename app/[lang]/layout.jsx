import Navbar from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export async function generateStaticParams() {
  // Define all supported languages here
  const languages = ['en-IN'];
  
  // Generate paths for all pages in all languages
  const paths = [];
  
  // Add root pages
  const pages = ['', 'about', 'contact', 'booking', 'services'];
  
  languages.forEach(lang => {
    pages.forEach(page => {
      paths.push({
        lang,
        // If it's the root page, don't include a page segment
        ...(page ? { page } : {})
      });
    });
  });
  
  return paths;
}

export async function generateMetadata({ params }) {
  return {
    alternates: {
      languages: {
        'en-IN': `/${params.lang}`,
      },
    },
  };
}

export default function LangLayout({ children, params }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar lang={params.lang} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={params.lang} />
    </div>
  );
}