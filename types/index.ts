// User/Profile types
export interface Profile {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  points: number;
  created_at: string;
  updated_at: string;
}

// ThreadPost types
export interface ThreadPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  markdown_content?: string;
  embed_urls?: string[];
  is_featured: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  // Relations
  author?: Profile;
  comments?: Comment[];
  is_liked?: boolean;
} 