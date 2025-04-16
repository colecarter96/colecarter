import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseConfig';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, title, excerpt, date, technologies, contentBlocks } = body;

    // Validate required fields
    if (!type || !title || !excerpt || !date || !contentBlocks) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the document data
    const docData = {
      title,
      excerpt,
      date: new Date(date),
      contentBlocks,
      ...(type === 'project' && { technologies }),
    };

    // Add to the appropriate collection
    const docRef = await adminDb.collection(type === 'project' ? 'projects' : 'blog').add(docData);

    return NextResponse.json({ id: docRef.id });
  } catch (error: any) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 