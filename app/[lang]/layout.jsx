import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

// Allow non-pre-rendered [lang] values to work at runtime
export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'en-IN' },
    { lang: 'hi' },
  ];
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