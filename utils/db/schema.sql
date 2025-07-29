-- Threaducate Database Schema
-- Version: 1.0
-- Date: 2025-07-28

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    markdown_content TEXT,
    embed_urls TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table (threaded)
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    markdown_content TEXT,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Curated Lists table
CREATE TABLE public.lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- List Items table
CREATE TABLE public.list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    list_id UUID NOT NULL REFERENCES public.lists(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    resource_type TEXT CHECK (resource_type IN ('video', 'article', 'doc', 'tool', 'other')),
    thumbnail_url TEXT,
    position INTEGER NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(list_id, position)
);

-- Likes table (polymorphic)
CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_id UUID NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('post', 'comment', 'list')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, item_id, item_type)
);

-- Notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('reply', 'mention', 'like', 'list_update')),
    title TEXT NOT NULL,
    content TEXT,
    item_id UUID,
    item_type TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX idx_lists_user_id ON public.lists(user_id);
CREATE INDEX idx_list_items_list_id ON public.list_items(list_id);
CREATE INDEX idx_likes_item ON public.likes(item_id, item_type);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id, is_read);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone" 
    ON public.posts FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can create posts" 
    ON public.posts FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" 
    ON public.posts FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" 
    ON public.posts FOR DELETE 
    USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" 
    ON public.comments FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can create comments" 
    ON public.comments FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" 
    ON public.comments FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" 
    ON public.comments FOR DELETE 
    USING (auth.uid() = user_id);

-- Lists policies
CREATE POLICY "Public lists are viewable by everyone" 
    ON public.lists FOR SELECT 
    USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create lists" 
    ON public.lists FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lists" 
    ON public.lists FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own lists" 
    ON public.lists FOR DELETE 
    USING (auth.uid() = user_id);

-- List items policies
CREATE POLICY "List items viewable if list is viewable" 
    ON public.list_items FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.lists 
            WHERE lists.id = list_items.list_id 
            AND (lists.is_public = true OR lists.user_id = auth.uid())
        )
    );

CREATE POLICY "Users can manage items in own lists" 
    ON public.list_items FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.lists 
            WHERE lists.id = list_items.list_id 
            AND lists.user_id = auth.uid()
        )
    );

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" 
    ON public.likes FOR SELECT 
    USING (true);

CREATE POLICY "Authenticated users can manage own likes" 
    ON public.likes FOR ALL 
    USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" 
    ON public.notifications FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" 
    ON public.notifications FOR UPDATE 
    USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION public.increment_view_count(item_id UUID, item_type TEXT)
RETURNS void AS $$
BEGIN
    IF item_type = 'post' THEN
        UPDATE public.posts SET view_count = view_count + 1 WHERE id = item_id;
    ELSIF item_type = 'list' THEN
        UPDATE public.lists SET view_count = view_count + 1 WHERE id = item_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lists_updated_at BEFORE UPDATE ON public.lists
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_list_items_updated_at BEFORE UPDATE ON public.list_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column(); 