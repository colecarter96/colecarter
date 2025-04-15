// lib/firebaseConfig.ts
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(firebaseConfig),
  });
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };
