'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { BookOpen, Heart, Eye, Plus, Video, FileText, Code } from 'lucide-react';
import Link from 'next/link';
import { ListItemSkeleton } from '@/components/common/loading-skeletons';

// Mock data for demonstration
const mockLists = [
  {
    id: '1',
    title: 'React Best Practices 2025',
    description: 'A curated collection of the latest React patterns and best practices',
    author: { username: 'react_guru', display_name: 'React Guru' },
    item_count: 12,
    view_count: 456,
    like_count: 67,
    created_at: '2025-07-25T09:00:00Z',
    tags: ['react', 'javascript', 'frontend'],
  },
  {
    id: '2',
    title: 'Full-Stack Development Resources',
    description: 'Everything you need to become a proficient full-stack developer',
    author: { username: 'dev_mentor', display_name: 'Dev Mentor' },
    item_count: 24,
    view_count: 789,
    like_count: 124,
    created_at: '2025-07-24T14:30:00Z',
    tags: ['fullstack', 'nodejs', 'database'],
  },
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4" />;
    case 'article':
      return <FileText className="h-4 w-4" />;
    case 'code':
      return <Code className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

export default function ListsPage() {
  const [lists, setLists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const loadLists = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      setLists(mockLists);
      setIsLoading(false);
    };

    loadLists();
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
            <Link href="/posts" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              ThreadPosts
            </Link>
            <Link href="/lists" className="text-sm font-medium">
              Lists
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create List
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Curated Learning Lists</h2>
          <p className="text-muted-foreground">
            Discover handpicked resources on various topics
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ListItemSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <Card key={list.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{list.title}</CardTitle>
                  <CardDescription>
                    by {list.author.display_name} • {list.item_count} items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {list.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {list.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{list.view_count}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{list.like_count}</span>
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      View List
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {lists.length === 0 && !isLoading && (
              <div className="col-span-full">
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No lists yet. Be the first to create one!
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First List
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 