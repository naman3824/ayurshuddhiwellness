import type { Metadata } from 'next'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'

export async function generateStaticParams() {
  return [{ lang: 'en-IN' }]
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    alternates: {
      languages: {
        'en-IN': `/${params.lang}`,
      },
    },
  }
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar lang={params.lang} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer lang={params.lang} />
    </div>
  )
} 