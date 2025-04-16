import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseConfig';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('blog').orderBy('date', 'desc').get();
    const posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date?.toDate ? data.date.toDate() : new Date(data.date || Date.now()),
      };
    });
    
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 