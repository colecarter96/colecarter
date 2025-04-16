'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';

interface ContentBlock {
  type: 'paragraph' | 'image' | 'subtitle';
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  contentBlocks: ContentBlock[];
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
            {block.content}
          </p>
        );
      case 'subtitle':
        return (
          <h2 key={index} className="text-2xl font-bold font-['Playfair_Display'] text-gray-900 mb-4">
            {block.content}
          </h2>
        );
      case 'image':
        return (
          <div key={index} className="my-8 flex flex-col items-center">
            <img
              src={block.imageUrl}
              alt={block.imageAlt || 'Blog post image'}
              className="w-full max-w-3xl h-auto rounded-lg shadow-lg"
            />
            {block.imageAlt && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {block.imageAlt}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        {/* <Header /> */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        {/* <Header /> */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-red-600">Error: {error}</p>
        </section>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen">
        {/* <Header /> */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <p>Blog post not found</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <article className="prose prose-lg max-w-none">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] text-gray-900">
              {post.title}
            </h1>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full font-semibold">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="space-y-6">
            {post.contentBlocks.map((block, index) => (
              <div key={index}>
                {renderContentBlock(block, index)}
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
} 