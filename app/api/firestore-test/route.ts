import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }
    const docRef = await db.collection('testCollection').add({
      message,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 