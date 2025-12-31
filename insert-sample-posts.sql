-- 先检查是否已有数据，如果有则不插入
-- 只插入示例文章（不会重复创建表和策略）

-- 删除可能已存在的示例文章（避免重复）
DELETE FROM blog_posts WHERE slug IN ('welcome-to-my-blog', 'nextjs-supabase-guide');

-- 插入两篇示例文章
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
    );