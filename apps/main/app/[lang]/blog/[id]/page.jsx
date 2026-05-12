import { adminDb } from '../../../../lib/firebaseAdmin';
import BlogPostClient from './BlogPostClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ayurshuddhiwellness.com';

// Strip HTML tags and truncate to maxLen characters
function truncateText(html, maxLen = 150) {
  const text = (html || '').replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen).trim() + '...';
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const docSnap = await adminDb.collection('blogs').doc(id).get();

    if (!docSnap.exists) {
      return {
        title: 'Post Not Found - Ayur Shuddhi Wellness',
        description: 'The requested blog post could not be found.',
      };
    }

    const data = docSnap.data();
    const title = data.title || 'Blog Post';
    const description = truncateText(data.content, 150);

    // Find the first Cloudinary image in the content, or use image_url
    const imgMatch = data.content?.match(/src="(https:\/\/res\.cloudinary\.com[^"]+)"/);
    const ogImage = data.image_url || (imgMatch ? imgMatch[1] : null);

    return {
      title: `${title} - Ayur Shuddhi Wellness`,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `${SITE_URL}/en/blog/${id}`,
        ...(ogImage && {
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }),
        siteName: 'Ayur Shuddhi Wellness',
        publishedTime: data.createdAt?.toDate?.()?.toISOString() || undefined,
        authors: [data.authorName || 'Ayur Shuddhi Wellness'],
      },
      twitter: {
        card: ogImage ? 'summary_large_image' : 'summary',
        title,
        description,
        ...(ogImage && { images: [ogImage] }),
      },
    };
  } catch {
    return {
      title: 'Blog - Ayur Shuddhi Wellness',
      description: 'Read our latest wellness blog posts.',
    };
  }
}

export default async function BlogPostPage({ params }) {
  const { id, lang } = await params;
  return <BlogPostClient id={id} lang={lang} />;
}