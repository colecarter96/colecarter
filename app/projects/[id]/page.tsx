import { adminDb } from '@/lib/firebaseConfig';
import Header from '../../components/Header';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ContentBlock {
  type: 'paragraph' | 'image' | 'subtitle';
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface Project {
  id: string;
  title: string;
  date: Date;
  contentBlocks: ContentBlock[];
  technologies?: string[];
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const doc = await adminDb.collection('projects').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    const data = doc.data();
    return {
      id: doc.id,
      title: data?.title || '',
      date: data?.date?.toDate ? data.date.toDate() : new Date(data?.date || Date.now()),
      contentBlocks: data?.contentBlocks || [],
      technologies: data?.technologies,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

function renderContentBlock(block: ContentBlock, index: number) {
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
            alt={block.imageAlt || 'Project image'}
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
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <article className="prose prose-lg max-w-none">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] text-gray-900">
              {project.title}
            </h1>
            <span className="text-sm px-3 py-1 bg-gray-100 rounded-full font-semibold">
              {new Date(project.date).toLocaleDateString()}
            </span>
          </div>

          <div className="space-y-6">
            {project.contentBlocks.map((block, index) => (
              <div key={index}>
                {renderContentBlock(block, index)}
              </div>
            ))}
          </div>

          {project.technologies && (
            <div className="flex flex-wrap gap-2 mt-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
} 