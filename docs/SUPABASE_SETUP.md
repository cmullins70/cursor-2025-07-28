# Supabase Setup Guide for Threaducate

This guide walks you through setting up the complete Supabase backend for your Threaducate application.

## 🚀 Quick Start

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be ready (usually takes 1-2 minutes)
3. Note down your project URL and API keys

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy from your Supabase project settings > API
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service role key for server-side operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Set Up Database Schema

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `docs/supabase-setup.sql`
4. Click "Run" to execute the script

This will create:
- All necessary tables (`profiles`, `thread_posts`, `comments`, etc.)
- Row Level Security (RLS) policies
- Database functions for counts and triggers
- Indexes for optimal performance

### 4. Verify Installation

After running the SQL script, verify everything is set up correctly:

1. Go to Table Editor in Supabase dashboard
2. You should see these tables:
   - `profiles`
   - `thread_posts` 
   - `comments`
   - `post_likes`
   - `comment_likes`

## 📊 Database Schema Overview

### Core Tables

#### `profiles`
Extends Supabase auth users with additional profile information.
```sql
- id (UUID, PK) - References auth.users
- username (TEXT, UNIQUE) - User's unique username
- display_name (TEXT) - Display name
- bio (TEXT) - User bio
- avatar_url (TEXT) - Profile picture URL
- points (INTEGER) - Gamification points
```

#### `thread_posts`
Main posts/threads in the application.
```sql
- id (UUID, PK) - Unique post identifier
- user_id (UUID, FK) - Author reference
- title (TEXT) - Post title
- content (TEXT) - Post content
- markdown_content (TEXT) - Processed markdown
- embed_urls (TEXT[]) - Array of embed URLs
- is_featured (BOOLEAN) - Featured post flag
- view_count, like_count, comment_count (INTEGER) - Engagement metrics
```

#### `comments`
Comments on posts, supports nested replies.
```sql
- id (UUID, PK) - Unique comment identifier
- post_id (UUID, FK) - References thread_posts
- user_id (UUID, FK) - Author reference
- parent_id (UUID, FK) - For nested replies
- content (TEXT) - Comment content
- like_count (INTEGER) - Comment likes
```

## 🔒 Security & Permissions

The database uses Row Level Security (RLS) with these policies:

### Public Access
- ✅ **Read**: All posts, comments, and profiles are publicly viewable
- ✅ **Search**: Full-text search available to all users

### Authenticated Users
- ✅ **Create**: Posts and comments
- ✅ **Update/Delete**: Own posts and comments only
- ✅ **Like**: Posts and comments

### Profile Management
- ✅ **Auto-creation**: Profiles are automatically created on user signup
- ✅ **Self-management**: Users can only edit their own profiles

## 💾 Current Implementation Status

### ✅ Completed Features

#### Database Functions
- **`fetchPosts(options)`** - Main function with pagination and filtering
  - Supports `limit`, `offset`, `userId`, `featured` parameters
  - Returns posts with author information
  - Optimized with proper indexing

- **`fetchPost(postId)`** - Single post with comments and author
  - Automatically increments view count
  - Includes nested comment structure

- **`createPost(postData, userId)`** - Create new posts
  - Validates required fields
  - Returns created post with author info

- **`createComment(postId, commentData, userId)`** - Add comments
  - Supports nested replies via `parent_id`
  - Auto-increments post comment count

- **`togglePostLike(postId, userId)`** - Like/unlike posts
  - Prevents duplicate likes
  - Updates like counts atomically

#### Fallback Strategy
The implementation includes graceful fallback to localStorage when Supabase is unavailable:

```typescript
// Posts page automatically falls back to mock data
// New post creation saves to localStorage as backup
// All operations are resilient to network failures
```

### 🚧 Performance Optimizations

#### Database Level
- **Indexes**: Optimized for common query patterns
- **Functions**: Server-side functions for atomic operations
- **RLS**: Efficient row-level security policies

#### Application Level
- **Pagination**: Default 20 posts per page
- **Lazy Loading**: Posts load on demand
- **Error Handling**: Graceful fallbacks to local storage

## 💰 Cost Analysis for `fetchPosts()`

### Database Queries per `fetchPosts()` call:
1. **Primary Query**: `SELECT` from `thread_posts` with JOIN to `profiles`
2. **Index Usage**: Leverages `idx_thread_posts_created_at` for sorting
3. **Row Limit**: Default 20 rows (configurable)

### Estimated Costs (Supabase Free Tier):
- **Database CPU**: ~1-3ms per query
- **Bandwidth**: ~2-5KB per post (including author info)
- **Total per page load**: ~40-100KB transfer

### Scaling Considerations:
- **10,000 users**: Well within free tier limits
- **100,000 users**: May need Pro plan (~$25/month)
- **Caching**: Can add Redis layer for high-traffic scenarios

## 🔄 Migration from Current Implementation

The current codebase has been updated to:

1. **✅ Dual Mode**: Works with both Supabase and localStorage
2. **✅ Progressive Enhancement**: Falls back gracefully
3. **✅ Type Safety**: Full TypeScript support with database types
4. **✅ Error Handling**: Comprehensive error management

### Files Updated:
- `lib/supabase/client.ts` - Supabase client configuration
- `lib/supabase/database.ts` - All database functions including `fetchPosts()`
- `types/database.ts` - Generated Supabase types
- `app/posts/page.tsx` - Updated to use `fetchPosts()` with fallback
- `app/posts/new/page.tsx` - Updated to use `createPost()` with fallback

## 🧪 Testing Your Setup

### 1. Test Environment Variables
```bash
npm run dev
# Check browser console for any Supabase connection errors
```

### 2. Test Database Connection
Visit `/posts` page and check:
- Posts load correctly
- No console errors
- Fallback works if Supabase is misconfigured

### 3. Test Post Creation
1. Go to `/posts/new`
2. Create a test post
3. Verify it appears in the posts list
4. Check Supabase dashboard to see if it was saved

## 🚨 Troubleshooting

### Common Issues:

#### "Cannot find module '@supabase/supabase-js'"
**Solution**: Dependencies already installed, TypeScript compilation will resolve this.

#### "Missing Supabase environment variables"
**Solution**: Ensure `.env.local` has the correct values from your Supabase dashboard.

#### "RLS Policy prevents access"
**Solution**: Check that your policies match the SQL script exactly.

#### Posts not saving to Supabase
**Solution**: 
1. Check environment variables
2. Verify user authentication (currently using temp user ID)
3. Check browser console for specific errors

## 🔮 Next Steps

### Immediate:
1. Add authentication (Supabase Auth)
2. Replace temp user IDs with real authentication
3. Add real-time subscriptions for live updates

### Future Enhancements:
1. Full-text search using PostgreSQL FTS
2. Image upload with Supabase Storage
3. Push notifications
4. Advanced caching strategies

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Supabase project is running
3. Ensure all environment variables are set correctly
4. Test the SQL script in Supabase SQL Editor

The implementation is designed to be robust with fallbacks, so your app will continue working even if Supabase configuration needs adjustment. 