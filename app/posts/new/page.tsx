'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoadingSpinner } from '@/components/common/loading-skeletons';

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [embedUrls, setEmbedUrls] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    
    try {
      // TODO: Save to Supabase
      // For now, we'll just simulate saving and redirect
      const newPost = {
        id: Date.now().toString(),
        title,
        content,
        markdown_content: content,
        embed_urls: embedUrls.split('\n').filter(url => url.trim()),
        created_at: new Date().toISOString(),
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Store in localStorage for demo
      const posts = JSON.parse(localStorage.getItem('threaducate_posts') || '[]');
      posts.unshift(newPost);
      localStorage.setItem('threaducate_posts', JSON.stringify(posts));

      // Success feedback before redirect
      router.push('/posts');
    } catch (error) {
      // Handle error state
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/posts">
              <Button variant="ghost" size="sm" disabled={isSubmitting}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to ThreadPosts
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Create New ThreadPost</CardTitle>
            <CardDescription>
              Share your thoughts and knowledge with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your post title..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Content Editor */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="content" className="block text-sm font-medium">
                    Content (Markdown supported)
                  </label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    disabled={isSubmitting}
                  >
                    {showPreview ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hide Preview
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Show Preview
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full h-96 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                      placeholder="Write your thread post content here...&#10;&#10;You can use Markdown formatting:&#10;# Heading&#10;**bold text**&#10;*italic text*&#10;- List item&#10;[Link](https://example.com)"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {showPreview && (
                    <div className="border rounded-md p-4 overflow-y-auto h-96 prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content || '*Preview will appear here...*'}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

              {/* Embed URLs */}
              <div>
                <label htmlFor="embeds" className="block text-sm font-medium mb-2">
                  Embed URLs (Optional)
                </label>
                <textarea
                  id="embeds"
                  value={embedUrls}
                  onChange={(e) => setEmbedUrls(e.target.value)}
                  className="w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  placeholder="Add YouTube, Loom, or other embed URLs (one per line)&#10;https://www.youtube.com/watch?v=..."
                  disabled={isSubmitting}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Add video or resource URLs to embed them in your post
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link href="/posts">
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting || !title.trim() || !content.trim()}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner className="h-4 w-4 mr-2" />
                      Creating ThreadPost...
                    </>
                  ) : (
                    'Create ThreadPost'
                  )}
                </Button>
              </div>

              {/* Loading feedback */}
              {isSubmitting && (
                <div className="flex items-center justify-center text-sm text-muted-foreground py-4">
                  <LoadingSpinner className="h-4 w-4 mr-2" />
                  Saving your thread post...
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Markdown Help */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Markdown Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Headers</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  # H1<br />
                  ## H2<br />
                  ### H3
                </code>
              </div>
              <div>
                <p className="font-medium mb-1">Emphasis</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  **bold**<br />
                  *italic*<br />
                  ~~strikethrough~~
                </code>
              </div>
              <div>
                <p className="font-medium mb-1">Lists</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  - Item 1<br />
                  - Item 2<br />
                  1. First<br />
                  2. Second
                </code>
              </div>
              <div>
                <p className="font-medium mb-1">Links</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  [text](url)
                </code>
              </div>
              <div>
                <p className="font-medium mb-1">Images</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  ![alt](url)
                </code>
              </div>
              <div>
                <p className="font-medium mb-1">Code</p>
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  `inline`<br />
                  ```block```
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 