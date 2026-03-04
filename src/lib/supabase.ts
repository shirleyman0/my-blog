import { createClient } from '@supabase/supabase-js';
import { getSupabaseEnv } from '@/lib/env';

const { supabaseUrl, supabaseAnonKey } = getSupabaseEnv();

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Database types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[];
}
