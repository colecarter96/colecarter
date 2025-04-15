import Header from '../components/Header';
import Link from 'next/link';
import { headers } from 'next/headers';

async function getBaseUrl() {
  const h = await headers();
  const host = h.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${host}`;
}

async function getPosts() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  return res.json();
}

export default async function BlogPage() {
  let posts = [];
  let error = null;
  try {
    posts = await getPosts();
  } catch (e: any) {
    error = e.message;
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-10 py-12">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {!error && posts.length === 0 && <div className="text-gray-500">No blog posts found.</div>}
        <div className="flex flex-col gap-6">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block hover:border p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold font-['Playfair_Display'] text-gray-900">{post.title}</h2>
                <span className="text-xs px-2 py-1 font-semibold w-max">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 text-base sm:text-lg">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
} 