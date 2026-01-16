# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 常用命令

```bash
npm run dev      # 启动开发服务器 (http://localhost:3000)
npm run build    # 构建生产版本
npm run lint     # 运行 ESLint 检查
```

## 架构概述

这是一个使用 Next.js App Router 构建的中文个人博客，数据存储在 Supabase (PostgreSQL)。

### 技术栈
- Next.js 16 (App Router) + TypeScript
- Supabase 作为数据库后端
- Tailwind CSS 样式
- react-markdown + remark-gfm 渲染 Markdown 内容

### 数据流
- 博客文章存储在 Supabase 的 `blog_posts` 表中
- 页面使用 Server Components 直接从 Supabase 获取数据
- 文章详情页使用 `generateStaticParams` 实现静态生成 (SSG)
- 只有 `published_at` 不为 null 的文章才会显示

### 路径别名
使用 `@/*` 映射到 `./src/*`

### 环境变量
需要在 `.env.local` 中配置：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 数据库 Schema
`blog_posts` 表结构定义在 `supabase-schema.sql`，包含 RLS 策略（公开读取，认证用户写入）。

### 注意事项
- 项目使用pnpm包管理工具