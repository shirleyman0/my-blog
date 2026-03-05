# My Blog

基于 Next.js App Router + Supabase 的个人博客系统

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Supabase (PostgreSQL + Auth + RLS)
- Tailwind CSS 4

## 本地开发

```bash
pnpm install
pnpm dev
```

默认地址：`http://localhost:3000`

## 环境变量

创建 `.env.local` 并配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 数据库初始化

1. 在 Supabase SQL Editor 执行 `supabase-schema.sql`（会创建数据表、RLS 策略，以及 `blog-images` 图片存储 bucket）
2. 在 Supabase Auth 中创建管理员账号（邮箱/密码）
3. 将该账号加入 `admin_users`：

```sql
INSERT INTO admin_users (user_id)
VALUES ((SELECT id FROM auth.users WHERE email = 'your-admin-email@example.com'))
ON CONFLICT (user_id) DO NOTHING;
```

可选：执行 `insert-sample-posts.sql` 插入演示数据。

## 后台编辑器图片上传

- 支持点击“插入图片”按钮选择本地图片
- 支持在编辑区直接粘贴截图（剪贴板图片）
- 上传前会在浏览器端压缩图片，随后上传到 Supabase Storage 的 `blog-images` bucket
- 上传成功后会自动在 Markdown 内容中插入图片语法

## 常用命令

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## 部署

项目默认按 `pnpm` 在 Vercel 构建（见 `vercel.json`）。
