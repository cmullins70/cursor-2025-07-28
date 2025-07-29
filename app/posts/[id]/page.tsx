'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft, Heart, Eye, MessageSquare, Send, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// // import ReactPlayer from 'react-player';
// import { ThreadPost, Comment, Profile } from '@/types';
// import { 
//   ThreadPostContentSkeleton, 
//   CommentsSkeleton, 
//   LoadingSpinner 
// } from '@/components/common/loading-skeletons';

// Mock data
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

const mockComments: Comment[] = [
  {
    id: '1',
    post_id: '1',
    user_id: '2',
    content: 'Great post! The App Router really changes the game for Next.js development.',
    markdown_content: 'Great post! The App Router really changes the game for Next.js development.',
    like_count: 5,
    created_at: '2025-07-28T11:00:00Z',
    updated_at: '2025-07-28T11:00:00Z',
    author: mockAuthors.jane_smith,
    replies: [
      {
        id: '3',
        post_id: '1',
        user_id: '1',
        parent_id: '1',
        content: 'Thanks! I agree, the new patterns take some getting used to but are worth it.',
        markdown_content: 'Thanks! I agree, the new patterns take some getting used to but are worth it.',
        like_count: 2,
        created_at: '2025-07-28T11:30:00Z',
        updated_at: '2025-07-28T11:30:00Z',
        author: mockAuthors.john_doe,
      }
    ]
  },
  {
    id: '2',
    post_id: '1',
    user_id: '3',
    content: 'How does this compare to the pages directory approach?',
    markdown_content: 'How does this compare to the pages directory approach?',
    like_count: 3,
    created_at: '2025-07-28T12:00:00Z',
    updated_at: '2025-07-28T12:00:00Z',
    author: mockAuthors.current_user,
  }
];

// Comment component with nesting support
function CommentItem({ 
  comment, 
  onReply,
  depth = 0 
}: { 
  comment: Comment; 
  onReply: (parentId: string) => void;
  depth?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-muted pl-4' : ''}`}>
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {hasReplies && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-0.5 hover:bg-muted rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              <CardDescription>
                {comment.author?.display_name} • {new Date(comment.created_at).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <button className="flex items-center space-x-1 hover:text-foreground">
                <Heart className="h-3 w-3" />
                <span>{comment.like_count}</span>
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {comment.markdown_content || comment.content}
            </ReactMarkdown>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => onReply(comment.id)}
          >
            Reply
          </Button>
        </CardContent>
      </Card>

      {/* Nested replies */}
      {isExpanded && hasReplies && (
        <div>
          {comment.replies!.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Partial<ThreadPost> | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    // Load post with simulated delay
    const loadPost = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Load post from localStorage or use mock data
      const savedPosts = localStorage.getItem('threaducate_posts');
      let foundPost = null;

      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        foundPost = posts.find((p: { id: string }) => p.id === params.id);
        if (foundPost) {
          foundPost.author = mockAuthors.current_user;
        }
      }

      if (!foundPost) {
        // Check mock posts
        const mockPost = params.id === '1' ? {
          id: '1',
          title: 'Getting Started with Next.js 14 App Router',
          content: `# Getting Started with Next.js 14 App Router

The new App Router in Next.js 14 introduces several powerful features:

## Key Features

- **Server Components by default** - Better performance and smaller bundle sizes
- **Nested Layouts** - Share UI between routes
- **Loading UI** - Built-in loading states
- **Error Handling** - Error boundaries at route level

## Example Code

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
\`\`\`

## Benefits

1. Improved performance
2. Better developer experience
3. More intuitive file structure
4. Enhanced SEO capabilities

Check out the [official documentation](https://nextjs.org/docs) for more details!`,
          markdown_content: '',
          embed_urls: ['https://www.youtube.com/watch?v=gSSsZReIFRk'],
          view_count: 125,
          like_count: 23,
          comment_count: mockComments.filter(c => c.post_id === '1').length,
          created_at: '2025-07-28T10:00:00Z',
          author: mockAuthors.john_doe,
        } : params.id === '2' ? {
          id: '2',
          title: 'Building Real-time Features with Supabase',
          content: 'Learn how to implement real-time functionality using Supabase subscriptions...',
          view_count: 90,
          like_count: 15,
          comment_count: 0,
          created_at: '2025-07-27T15:30:00Z',
          author: mockAuthors.jane_smith,
        } : null;

        foundPost = mockPost;
      }

      if (foundPost) {
        // Increment view count
        foundPost.view_count = (foundPost.view_count || 0) + 1;
        setPost(foundPost);
      }
      
      setIsLoading(false);
    };

    loadPost();
  }, [params.id]);

  useEffect(() => {
    // Load comments separately with delay
    const loadComments = async () => {
      if (!post) return;
      
      setIsLoadingComments(true);
      
      // Simulate network delay for comments
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Load comments for this post
      if (params.id === '1') {
        setComments(mockComments.filter(c => c.post_id === '1' && !c.parent_id));
      }
      
      setIsLoadingComments(false);
    };

    loadComments();
  }, [params.id, post]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsAddingComment(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment: Comment = {
      id: Date.now().toString(),
      post_id: params.id as string,
      user_id: '3',
      parent_id: replyingTo || undefined,
      content: newComment,
      markdown_content: newComment,
      like_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: mockAuthors.current_user,
    };

    if (replyingTo) {
      // Add as a reply
      const updateComments = (comments: Comment[]): Comment[] => {
        return comments.map(c => {
          if (c.id === replyingTo) {
            return {
              ...c,
              replies: [...(c.replies || []), comment]
            };
          }
          if (c.replies) {
            return {
              ...c,
              replies: updateComments(c.replies)
            };
          }
          return c;
        });
      };
      setComments(updateComments(comments));
    } else {
      // Add as top-level comment
      setComments([comment, ...comments]);
    }

    setNewComment('');
    setReplyingTo(null);
    setIsAddingComment(false);

    // Update comment count
    if (post) {
      setPost({
        ...post,
        comment_count: (post.comment_count || 0) + 1
      });
    }
  };

  const handleLike = () => {
    if (post) {
      const newLikeCount = isLiked ? post.like_count! - 1 : post.like_count! + 1;
      setPost({
        ...post,
        like_count: newLikeCount
      });
      setIsLiked(!isLiked);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/posts">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to ThreadPosts
                </Button>
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </nav>

        {/* Loading Content */}
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <ThreadPostContentSkeleton />
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <CommentsSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">ThreadPost not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/posts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to ThreadPosts
              </Button>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* ThreadPost Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <CardDescription>
              by {post.author?.display_name} • {new Date(post.created_at!).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.markdown_content || post.content || ''}
              </ReactMarkdown>
            </div>

            {/* Embeds */}
            {post.embed_urls && post.embed_urls.length > 0 && (
              <div className="space-y-4 mb-6">
                {post.embed_urls.map((url, index) => (
                  <div key={index} className="rounded-lg overflow-hidden bg-muted">
                    <div className="bg-muted p-8 text-center rounded-lg">
                      <p className="text-muted-foreground">Video embed: {url}</p>
                    </div>
                  </div>
                ))}            )}

            {/* ThreadPost Stats */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground pt-4 border-t">
              <span className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.view_count} views</span>
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 hover:text-foreground ${
                  isLiked ? 'text-red-500' : ''
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{post.like_count} likes</span>
              </button>
              <span className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comment_count} comments</span>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Comments</h3>

          {/* New Comment Form */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handleComment}>
                {replyingTo && (
                  <div className="mb-2 text-sm text-muted-foreground">
                    Replying to comment...
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                <div className="flex space-x-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyingTo ? "Write your reply..." : "Add a comment..."}
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                    disabled={isAddingComment}
                  />
                  <Button type="submit" size="icon" disabled={isAddingComment}>
                    {isAddingComment ? (
                      <LoadingSpinner className="h-4 w-4" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {isAddingComment && (
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <LoadingSpinner className="h-3 w-3 mr-2" />
                    Adding your comment...
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Markdown formatting is supported
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div>
            {isLoadingComments ? (
              <CommentsSkeleton />
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={setReplyingTo}
                  />
                ))}

                {comments.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-muted-foreground">
                        No comments yet. Be the first to share your thoughts!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 