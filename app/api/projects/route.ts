import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseConfig';

export async function GET() {
  try {
    const snapshot = await adminDb.collection('projects').orderBy('date', 'desc').get();
    const projects = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // If date is already a string or number, use it as is
        // If it's a Firestore Timestamp, convert it to Date
        date: data.date?.toDate ? data.date.toDate() : new Date(data.date || Date.now()),
      };
    });
    
    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 