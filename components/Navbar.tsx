import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '' },
  { name: 'About', href: 'about' },
  { name: 'Services', href: 'services' },
  { name: 'Contact', href: 'contact' },
]

export function Navbar({ lang }: { lang: string }) {
  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="text-2xl font-bold text-emerald-700">
              Ayur Shuddhi Wellness
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={`/${lang}/${link.href}`}
                  className="text-base font-medium text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
} 