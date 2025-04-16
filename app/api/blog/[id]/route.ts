import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseConfig';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const doc = await adminDb.collection('blog').doc(id).get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    const data = doc.data();
    const blogPost = {
      id: doc.id,
      title: data?.title || '',
      excerpt: data?.excerpt || '',
      date: data?.date?.toDate ? data.date.toDate().toISOString() : data?.date || new Date().toISOString(),
      contentBlocks: data?.contentBlocks || [],
    };

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 