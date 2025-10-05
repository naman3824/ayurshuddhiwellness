import { Navbar } from '../../components/Navbar';
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

export async function generateMetadata(props) {
  const params = await props.params;
  const { lang } = params;
  return {
    alternates: {
      languages: {
        'en-IN': `/${lang}`,
      },
    },
  };
}

export default async function LangLayout(props) {
  const params = await props.params;
  const { lang } = params;

  const {
    children
  } = props;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar lang={lang} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={lang} />
    </div>
  );
}