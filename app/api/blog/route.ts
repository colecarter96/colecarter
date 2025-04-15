import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';

export async function GET() {
  try {
    const snapshot = await db.collection('blog').orderBy('date', 'desc').get();
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 