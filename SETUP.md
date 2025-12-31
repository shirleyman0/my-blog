# 个人博客项目

使用 Next.js、Supabase 和 Vercel 构建的现代化个人博客。

## 🚀 技术栈

- **前端框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **Markdown 渲染**: react-markdown
- **部署**: Vercel
- **语言**: TypeScript

## 📋 功能特性

- ✅ 响应式设计
- ✅ 深色模式支持
- ✅ Markdown 文章编写
- ✅ 标签系统
- ✅ SEO 友好
- ✅ 静态生成（SSG）

## 🛠️ 本地开发设置

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd blog-project
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Supabase

#### 3.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/)
2. 创建一个新项目
3. 等待项目初始化完成

#### 3.2 运行数据库迁移

1. 在 Supabase Dashboard 中，进入 **SQL Editor**
2. 复制 `supabase-schema.sql` 文件的内容
3. 粘贴并运行 SQL 脚本

#### 3.3 获取 API 密钥

1. 进入项目设置 **Settings** → **API**
2. 复制以下信息：
   - `Project URL`
   - `anon` `public` key

### 4. 配置环境变量

编辑 `.env.local` 文件，填入你的 Supabase 凭证：

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的博客！

## 📝 创建新文章

你可以通过两种方式创建文章：

### 方法 1: 使用 Supabase Dashboard

1. 进入 Supabase Dashboard
2. 打开 **Table Editor** → **blog_posts**
3. 点击 **Insert row** 添加新文章
4. 填写以下字段：
   - `title`: 文章标题
   - `slug`: URL 友好的标识符（如：`my-first-post`）
   - `content`: Markdown 格式的文章内容
   - `excerpt`: 文章摘要
   - `author`: 作者名称
   - `published_at`: 发布时间（设置为当前时间即可发布）
   - `tags`: 标签数组（如：`["Next.js", "教程"]`）

### 方法 2: 使用 SQL

在 Supabase SQL Editor 中运行：

```sql
INSERT INTO blog_posts (title, slug, content, excerpt, author, published_at, tags)
VALUES (
    '你的文章标题',
    'your-article-slug',
    '# 你的文章内容

这里是 Markdown 格式的内容...',
    '文章摘要',
    'Admin',
    NOW(),
    ARRAY['标签1', '标签2']
);
```

## 🚀 部署到 Vercel

### 1. 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. 在 Vercel 部署

1. 访问 [Vercel](https://vercel.com/)
2. 点击 **Import Project**
3. 选择你的 GitHub 仓库
4. 配置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. 点击 **Deploy**

## 📁 项目结构

```
blog-project/
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx    # 文章详情页
│   │   │   └── page.tsx        # 文章列表页
│   │   ├── layout.tsx          # 全局布局
│   │   └── page.tsx            # 首页
│   └── lib/
│       └── supabase.ts         # Supabase 客户端配置
├── public/                     # 静态资源
├── supabase-schema.sql         # 数据库架构
├── .env.local                  # 环境变量（不要提交到 Git）
└── package.json
```

## 🎨 自定义

- **样式**: 修改 Tailwind 配置和组件中的 className
- **布局**: 编辑 `src/app/layout.tsx`
- **首页**: 编辑 `src/app/page.tsx`
- **博客页面**: 编辑 `src/app/blog/` 下的文件

## 📚 相关文档

- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Vercel 文档](https://vercel.com/docs)

## 📄 许可证

MIT