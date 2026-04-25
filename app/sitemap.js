import { adminDb } from '../lib/firebaseAdmin';

const LOCALES = ['en', 'en-IN', 'hi'];

// Service names exactly matching toUrlSlug() output from the services page
const SERVICE_SLUGS = [
  'ayurveda',
  'naturopathy',
  'panchakarma',
  'pulse-diagnosis-nadi-pariksha',
  'tongue-diagnosis',
  'rakht-mokshan-and-leech-therapy',
  'agni-karma',
  'yoga-pranayama-and-meditation',
  'depression-and-stress-management',
];

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ayurshuddhiwellness.com';

  // ── Static routes (localized) ──
  const staticRoutes = ['', '/about', '/blog', '/contact', '/gallery', '/services'];

  const staticPages = staticRoutes.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  // ── Non-localized pages ──
  const globalPages = [
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/signup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  // ── Dynamic service pages ──
  const servicePages = SERVICE_SLUGS.flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}/${locale}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  );

  // ── Dynamic blog posts (fetched via Admin SDK) ──
  let blogPages = [];
  try {
    const snapshot = await adminDb
      .collection('blogs')
      .where('status', '==', 'published')
      .get();

    blogPages = snapshot.docs.flatMap((doc) => {
      const data = doc.data();
      const lastModified = data.updatedAt?.toDate?.() || data.createdAt?.toDate?.() || new Date();

      return LOCALES.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${doc.id}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    });
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  return [...staticPages, ...globalPages, ...servicePages, ...blogPages];
}
