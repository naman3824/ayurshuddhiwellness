import PostCard from '../components/PostCard';


const posts = [
  {
    slug: 'benefits-of-ayurveda',
    title: 'Benefits of Ayurveda',
    excerpt:
      'Discover how the ancient science of Ayurveda can help balance your mind, body, and spirit through personalised, natural treatments.',
    tag: 'Ayurveda Basics',
    likes: 24,
    date: 'May 10, 2026',
  },
  {
    slug: 'benefits-of-ayurveda',
    title: 'Understanding Your Dosha',
    excerpt:
      'Learn about Vata, Pitta, and Kapha — the three energies that define your unique constitution and influence your health.',
    tag: 'Body & Mind',
    likes: 18,
    date: 'May 8, 2026',
  },
  {
    slug: 'benefits-of-ayurveda',
    title: 'Panchakarma: The Ultimate Detox',
    excerpt:
      'Explore the five purification therapies of Panchakarma and how they cleanse, rejuvenate, and restore balance to your body.',
    tag: 'Therapies',
    likes: 31,
    date: 'May 5, 2026',
  },
  {
    slug: 'benefits-of-ayurveda',
    title: 'Ayurvedic Diet Tips for Summer',
    excerpt:
      'Stay cool and balanced this summer with Pitta-pacifying foods, hydrating routines, and seasonal Ayurvedic wisdom.',
    tag: 'Nutrition',
    likes: 12,
    date: 'May 2, 2026',
  },
  {
    slug: 'benefits-of-ayurveda',
    title: 'Yoga & Pranayama for Beginners',
    excerpt:
      'A gentle introduction to foundational yoga postures and breathing techniques rooted in ancient Ayurvedic practice.',
    tag: 'Yoga',
    likes: 27,
    date: 'Apr 28, 2026',
  },
  {
    slug: 'benefits-of-ayurveda',
    title: 'Herbs That Heal: An Ayurvedic Guide',
    excerpt:
      'From Ashwagandha to Turmeric — discover the most powerful medicinal herbs in the Ayurvedic pharmacopoeia.',
    tag: 'Herbal Medicine',
    likes: 35,
    date: 'Apr 25, 2026',
  },
];

export default function BlogHomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-white">Ayur Shuddhi</span>{' '}
            <span className="text-green-400">Blog</span>
          </h1>
          <span className="hidden sm:inline text-xs text-gray-500 tracking-wide uppercase">
            Holistic Wellness Insights
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section label */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-300">Latest Articles</h2>
          <p className="text-sm text-gray-500 mt-1">
            Explore Ayurveda, natural healing, and mindful living.
          </p>
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
