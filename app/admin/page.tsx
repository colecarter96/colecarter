'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';

interface ContentBlock {
  type: 'paragraph' | 'image' | 'subtitle';
  content: string;
  imageUrl?: string;
  imageAlt?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [contentType, setContentType] = useState<'project' | 'blog'>('project');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [currentBlock, setCurrentBlock] = useState<ContentBlock>({
    type: 'paragraph',
    content: '',
  });

  const addContentBlock = () => {
    if (currentBlock.type === 'image') {
      if (!currentBlock.imageUrl) {
        alert('Please provide an image URL');
        return;
      }
      if (!currentBlock.imageAlt) {
        alert('Please provide an image alt text');
        return;
      }
    } else if (!currentBlock.content) {
      alert('Please provide content');
      return;
    }

    setContentBlocks([...contentBlocks, currentBlock]);
    setCurrentBlock({
      type: 'paragraph',
      content: '',
    });
  };

  const addTechnology = () => {
    if (newTech && !technologies.includes(newTech)) {
      setTechnologies([...technologies, newTech]);
      setNewTech('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: contentType,
          title,
          excerpt,
          date,
          technologies: contentType === 'project' ? technologies : undefined,
          contentBlocks,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save content');
      }

      const data = await response.json();
      if(contentType === 'project') {
        router.push(`/${contentType}s/${data.id}`);
      } else{
        router.push(`/${contentType}/${data.id}`);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
    }
  };

  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold font-['Playfair_Display'] text-gray-900 mb-8">
          Create New Content
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setContentType('project')}
              className={`px-4 py-2 rounded ${
                contentType === 'project'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              Project
            </button>
            <button
              type="button"
              onClick={() => setContentType('blog')}
              className={`px-4 py-2 rounded ${
                contentType === 'blog'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              Blog Post
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {contentType === 'project' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Add a technology"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() =>
                        setTechnologies(technologies.filter((t) => t !== tech))
                      }
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content Blocks
            </label>
            <div className="space-y-4">
              {contentBlocks.map((block, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md">
                  {block.type === 'paragraph' && (
                    <p className="text-gray-700">{block.content}</p>
                  )}
                  {block.type === 'subtitle' && (
                    <h3 className="text-xl font-bold font-['Playfair_Display']">
                      {block.content}
                    </h3>
                  )}
                  {block.type === 'image' && (
                    <div>
                      <img
                        src={block.imageUrl}
                        alt={block.imageAlt}
                        className="max-w-full h-auto rounded-lg"
                      />
                      {block.imageAlt && (
                        <p className="text-sm text-gray-500 mt-1">{block.imageAlt}</p>
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setContentBlocks(
                        contentBlocks.filter((_, i) => i !== index)
                      )
                    }
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 border border-gray-200 rounded-md">
              <div className="flex gap-4 mb-4">
                <select
                  value={currentBlock.type}
                  onChange={(e) =>
                    setCurrentBlock({
                      ...currentBlock,
                      type: e.target.value as ContentBlock['type'],
                      content: '',
                      imageUrl: '',
                      imageAlt: '',
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="subtitle">Subtitle</option>
                  <option value="image">Image</option>
                </select>
              </div>

              {currentBlock.type === 'image' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={currentBlock.imageUrl || ''}
                      onChange={(e) =>
                        setCurrentBlock({
                          ...currentBlock,
                          imageUrl: e.target.value,
                        })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Alt Text
                    </label>
                    <input
                      type="text"
                      value={currentBlock.imageAlt || ''}
                      onChange={(e) =>
                        setCurrentBlock({
                          ...currentBlock,
                          imageAlt: e.target.value,
                        })
                      }
                      placeholder="Description of the image"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {currentBlock.imageUrl && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <img
                        src={currentBlock.imageUrl}
                        alt="Preview"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  value={currentBlock.content}
                  onChange={(e) =>
                    setCurrentBlock({
                      ...currentBlock,
                      content: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder={
                    currentBlock.type === 'paragraph'
                      ? 'Enter paragraph text...'
                      : 'Enter subtitle text...'
                  }
                />
              )}

              <button
                type="button"
                onClick={addContentBlock}
                className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md"
              >
                Add Block
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
          >
            Save {contentType === 'project' ? 'Project' : 'Blog Post'}
          </button>
        </form>
      </section>
    </main>
  );
} 