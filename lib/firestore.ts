import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  date: string;
  excerpt?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  image?: string;
  technologies?: string[];
  githubUrl?: string;
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as BlogPost;
}

export async function getProject(slug: string): Promise<Project | null> {
  const projectsRef = collection(db, 'projects');
  const q = query(projectsRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as Project;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const postsRef = collection(db, 'posts');
  const querySnapshot = await getDocs(postsRef);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[];
}

export async function getAllProjects(): Promise<Project[]> {
  const projectsRef = collection(db, 'projects');
  const querySnapshot = await getDocs(projectsRef);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
} 