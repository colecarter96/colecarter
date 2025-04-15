import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseConfig';

export async function GET() {
  try {
    const snapshot = await db.collection('projects').orderBy('date', 'desc').get();
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 