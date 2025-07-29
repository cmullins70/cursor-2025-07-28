import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Base Skeleton component
export function Skeleton({ 
  className = "", 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
      {...props}
    />
  );
}

// ThreadPost Card Skeleton
export function ThreadPostSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex items-center space-x-6 pt-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Individual ThreadPost Content Skeleton
export function ThreadPostContentSkeleton() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="space-y-3">
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Content skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          {/* Embed placeholder */}
          <Skeleton className="h-64 w-full rounded-lg" />
          
          {/* Stats skeleton */}
          <div className="flex items-center space-x-6 pt-4 border-t">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Comment Skeleton
export function CommentSkeleton({ isReply = false }: { isReply?: boolean }) {
  return (
    <div className={`${isReply ? 'ml-8 border-l-2 border-muted pl-4' : ''}`}>
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-12" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Comments Section Skeleton
export function CommentsSkeleton() {
  return (
    <div className="space-y-4">
      <CommentSkeleton />
      <CommentSkeleton isReply />
      <CommentSkeleton />
    </div>
  );
}

// List Item Skeleton
export function ListItemSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading Spinner for inline actions
export function LoadingSpinner({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
} 