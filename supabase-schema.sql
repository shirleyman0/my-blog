-- Enable extension for UUID generation
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author TEXT NOT NULL DEFAULT 'Admin',
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}'
);

-- Create an admin user mapping table
CREATE TABLE IF NOT EXISTS admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Reset old policies to keep this script idempotent
DROP POLICY IF EXISTS "Allow public read access" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated insert" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated update" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated delete" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated read all" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin read all" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin insert" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin update" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin delete" ON blog_posts;

DROP POLICY IF EXISTS "Admin users can read own row" ON admin_users;

-- admin_users policies
CREATE POLICY "Admin users can read own row" ON admin_users
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- blog_posts policies
CREATE POLICY "Allow public read access" ON blog_posts
    FOR SELECT
    USING (published_at IS NOT NULL);

CREATE POLICY "Allow admin read all" ON blog_posts
    FOR SELECT TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM admin_users
        WHERE admin_users.user_id = auth.uid()
      )
    );

CREATE POLICY "Allow admin insert" ON blog_posts
    FOR INSERT TO authenticated
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM admin_users
        WHERE admin_users.user_id = auth.uid()
      )
    );

CREATE POLICY "Allow admin update" ON blog_posts
    FOR UPDATE TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM admin_users
        WHERE admin_users.user_id = auth.uid()
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1
        FROM admin_users
        WHERE admin_users.user_id = auth.uid()
      )
    );

CREATE POLICY "Allow admin delete" ON blog_posts
    FOR DELETE TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM admin_users
        WHERE admin_users.user_id = auth.uid()
      )
    );

-- Storage bucket for post images
-- NOTE:
-- In some environments, the executing role is not the owner of storage tables.
-- We avoid direct ALTER TABLE on storage.objects and gracefully skip policy setup
-- if privilege is insufficient.
DO $$
BEGIN
  BEGIN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('blog-images', 'blog-images', true)
    ON CONFLICT (id) DO UPDATE
    SET public = EXCLUDED.public;

    DROP POLICY IF EXISTS "Public read blog images" ON storage.objects;
    DROP POLICY IF EXISTS "Admin upload blog images" ON storage.objects;
    DROP POLICY IF EXISTS "Admin update blog images" ON storage.objects;
    DROP POLICY IF EXISTS "Admin delete blog images" ON storage.objects;

    CREATE POLICY "Public read blog images" ON storage.objects
        FOR SELECT
        USING (bucket_id = 'blog-images');

    CREATE POLICY "Admin upload blog images" ON storage.objects
        FOR INSERT TO authenticated
        WITH CHECK (
          bucket_id = 'blog-images'
          AND EXISTS (
            SELECT 1
            FROM public.admin_users
            WHERE admin_users.user_id = auth.uid()
          )
        );

    CREATE POLICY "Admin update blog images" ON storage.objects
        FOR UPDATE TO authenticated
        USING (
          bucket_id = 'blog-images'
          AND EXISTS (
            SELECT 1
            FROM public.admin_users
            WHERE admin_users.user_id = auth.uid()
          )
        )
        WITH CHECK (
          bucket_id = 'blog-images'
          AND EXISTS (
            SELECT 1
            FROM public.admin_users
            WHERE admin_users.user_id = auth.uid()
          )
        );

    CREATE POLICY "Admin delete blog images" ON storage.objects
        FOR DELETE TO authenticated
        USING (
          bucket_id = 'blog-images'
          AND EXISTS (
            SELECT 1
            FROM public.admin_users
            WHERE admin_users.user_id = auth.uid()
          )
        );
  EXCEPTION
    WHEN insufficient_privilege THEN
      RAISE NOTICE 'Skip storage bucket/policy setup: insufficient privilege on storage schema. Configure blog-images policies in Supabase Dashboard if needed.';
  END;
END
$$;

-- Insert sample posts
INSERT INTO blog_posts (title, slug, content, excerpt, author, published_at, tags)
VALUES
    (
        '欢迎来到我的博客',
        'welcome-to-my-blog',
        '# 欢迎来到我的博客

这是我的第一篇博客文章！我很高兴能够分享我的想法和经验。

## 关于这个博客

这个博客使用以下技术栈构建：
- **Next.js**: React 框架
- **Supabase**: 后端即服务
- **Vercel**: 部署平台
- **Tailwind CSS**: 样式框架

## 接下来的计划

我将在这里分享关于 Web 开发、编程和技术的文章。敬请期待！',
        '这是我的第一篇博客文章！欢迎来到我使用 Next.js 和 Supabase 构建的博客。',
        'Admin',
        NOW(),
        ARRAY['欢迎', '介绍', 'Next.js']
    ),
    (
        'Next.js 和 Supabase 入门指南',
        'nextjs-supabase-guide',
        '# Next.js 和 Supabase 入门指南

在这篇文章中，我将介绍如何使用 Next.js 和 Supabase 构建全栈应用。

## 为什么选择这个技术栈？

- **Next.js** 提供出色的开发体验和性能
- **Supabase** 简化了后端开发
- **TypeScript** 提供类型安全

## 开始使用

首先，创建一个新的 Next.js 项目...

```bash
npx create-next-app@latest my-app
```

然后安装 Supabase 客户端...

```bash
npm install @supabase/supabase-js
```

## 配置 Supabase

创建一个 Supabase 客户端实例...

这只是开始！',
        '学习如何使用 Next.js 和 Supabase 构建现代全栈应用。',
        'Admin',
        NOW(),
        ARRAY['Next.js', 'Supabase', '教程']
    )
ON CONFLICT (slug) DO NOTHING;

-- After creating your first Supabase auth user, register it as admin:
-- INSERT INTO admin_users (user_id)
-- VALUES ((SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'))
-- ON CONFLICT (user_id) DO NOTHING;
