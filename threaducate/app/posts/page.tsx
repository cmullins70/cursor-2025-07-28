'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { MessageSquare, Heart, Eye, Plus } from 'lucide-react';
import Link from 'next/link';
import { ThreadPost, Profile } from '@/types';
import { ThreadPostSkeleton } from '@/components/common/loading-skeletons';

// Mock author data
const mockAuthors: Record<string, Profile> = {
  'john_doe': { 
    id: '1', 
    username: 'john_doe', 
    display_name: 'John Doe',
    points: 0,
    created_at: '',
    updated_at: ''
  },
  'jane_smith': { 
    id: '2', 
    username: 'jane_smith', 
    display_name: 'Jane Smith',
    points: 0,
    created_at: '',
    updated_at: ''
  },
  'current_user': {
    id: '3',
    username: 'current_user',
    display_name: 'You',
    points: 0,
    created_at: '',
    updated_at: ''
  }
};

// Initial mock data
const initialMockPosts: Partial<ThreadPost>[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 App Router',
    content: 'A comprehensive guide to understanding the new App Router in Next.js 14...',
    view_count: 124,
    like_count: 23,
    comment_count: 8,
    created_at: '2025-07-28T10:00:00Z',
    author: mockAuthors.john_doe,
  },
  {
    id: '2',
    title: 'Building Real-time Features with Supabase',
    content: 'Learn how to implement real-time functionality using Supabase subscriptions...',
    view_count: 89,
    like_count: 15,
    comment_count: 5,
    created_at: '2025-07-27T15:30:00Z',
    author: mockAuthors.jane_smith,
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState<Partial<ThreadPost>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demo purposes
    const loadPosts = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load posts from localStorage
      const savedPosts = localStorage.getItem('threaducate_posts');
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        // Add author info to saved posts
        const postsWithAuthors = parsedPosts.map((post: any) => ({
          ...post,
          author: mockAuthors.current_user,
          view_count: post.view_count || 0,
          like_count: post.like_count || 0,
          comment_count: post.comment_count || 0,
        }));
        setPosts([...postsWithAuthors, ...initialMockPosts]);
      } else {
        setPosts(initialMockPosts);
      }
      
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold">Threaducate</h1>
            </Link>
            <Link href="/posts" className="text-sm font-medium">
              ThreadPosts
            </Link>
            <Link href="/lists" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Lists
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/posts/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New ThreadPost
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Community ThreadPosts</h2>
          <p className="text-muted-foreground">
            Join the conversation and share your knowledge
          </p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            // Loading State
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <ThreadPostSkeleton key={index} />
              ))}
            </>
          ) : (
            // Loaded Content
            <>
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{post.title}</CardTitle>
                          <CardDescription className="mt-1">
                            by {post.author?.display_name} • {new Date(post.created_at!).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {post.content}
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.view_count}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{post.like_count}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comment_count}</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {posts.length === 0 && !isLoading && (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No thread posts yet. Be the first to share!</p>
                    <Link href="/posts/new">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create First ThreadPost
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
} 