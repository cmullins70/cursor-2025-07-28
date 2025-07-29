import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { MessageSquare, BookOpen, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">Threaducate</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/posts">
              <Button variant="ghost">Browse ThreadPosts</Button>
            </Link>
            <Link href="/lists">
              <Button variant="ghost">Explore Lists</Button>
            </Link>
            <Button>Sign In</Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Learn Together, Grow Together
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join a conversation-centric community platform for curated learning and shared knowledge
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/posts">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/style-guide">
              <Button size="lg" variant="outline">View Style Guide</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Core Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Threaded Discussions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Engage in meaningful conversations with nested comments and real-time updates
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Curated Learning Lists</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create and share collections of resources including videos, articles, and tools
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Smooth Loading States</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Experience seamless interactions with skeleton loaders and real-time feedback
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community and start sharing knowledge today
          </p>
          <Link href="/posts/new">
            <Button size="lg">Create Your First ThreadPost</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Threaducate. Built with Next.js and Supabase.</p>
        </div>
      </footer>
    </div>
  );
}
