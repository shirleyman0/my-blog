# 个人博客系统需求分析文档

## 1. 项目概述

### 1.1 项目背景
本项目是一个面向个人用户的中文博客系统，旨在提供一个简洁、高效的内容发布和展示平台。

### 1.2 技术选型
| 技术 | 用途 |
|------|------|
| Next.js 16 (App Router) | 前端框架，支持 SSR/SSG |
| TypeScript | 类型安全 |
| Supabase (PostgreSQL) | 数据库后端 |
| Tailwind CSS | 样式框架 |
| react-markdown + remark-gfm | Markdown 渲染 |
| Vercel | 部署平台 |

### 1.3 目标用户
- 博客作者：发布和管理文章
- 访客读者：浏览和阅读文章

---

## 2. 功能需求

### 2.1 前台功能（访客端）

#### 2.1.1 首页
- [x] 展示博客品牌和简介
- [x] 提供导航入口到文章列表
- [x] 展示博客特色板块（技术文章、学习笔记、项目分享）
- [ ] 展示最新/热门文章推荐

#### 2.1.2 文章列表页
- [x] 按发布时间倒序展示已发布文章
- [x] 显示文章标题、作者、发布日期、摘要
- [x] 显示文章标签
- [ ] 分页功能
- [ ] 按标签筛选文章
- [ ] 搜索功能

#### 2.1.3 文章详情页
- [x] 展示文章完整内容（Markdown 渲染）
- [x] 显示文章元信息（标题、作者、发布日期、标签）
- [x] 返回列表导航
- [ ] 目录导航（TOC）
- [ ] 上一篇/下一篇导航
- [ ] 阅读时间估算
- [ ] 代码高亮

#### 2.1.4 其他页面
- [ ] 关于页面（作者介绍）
- [ ] 归档页面（按时间归档）
- [ ] 标签页面（标签云/标签列表）

### 2.2 后台功能（管理端）

#### 2.2.1 文章管理
- [ ] 文章列表（含草稿和已发布）
- [ ] 创建新文章
- [ ] 编辑文章
- [ ] 删除文章
- [ ] 发布/取消发布文章
- [ ] Markdown 编辑器

#### 2.2.2 用户认证
- [ ] 管理员登录
- [ ] 登录状态管理
- [ ] 权限控制

---

## 3. 非功能需求

### 3.1 性能要求
- 首页加载时间 < 2 秒
- 文章页支持静态生成（SSG）以提升访问速度
- 图片懒加载

### 3.2 SEO 要求
- 支持自定义页面标题和描述
- 生成 sitemap.xml
- 支持 Open Graph 元标签
- 语义化 HTML 结构

### 3.3 响应式设计
- 支持桌面端、平板、移动端
- 适配深色/浅色模式

### 3.4 可访问性
- 符合 WCAG 2.1 基本标准
- 支持键盘导航
- 图片提供 alt 文本

### 3.5 安全性
- 使用 Supabase RLS（行级安全）控制数据访问
- 公开读取，认证用户写入
- 防止 XSS 攻击（Markdown 内容安全渲染）

---

## 4. 数据模型

### 4.1 blog_posts 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键，自动生成 |
| title | TEXT | 文章标题，必填 |
| slug | TEXT | URL 友好标识，唯一 |
| content | TEXT | 文章内容（Markdown），必填 |
| excerpt | TEXT | 文章摘要 |
| author | TEXT | 作者，默认 'Admin' |
| published_at | TIMESTAMPTZ | 发布时间，null 表示草稿 |
| created_at | TIMESTAMPTZ | 创建时间 |
| updated_at | TIMESTAMPTZ | 更新时间 |
| tags | TEXT[] | 标签数组 |

### 4.2 索引
- `idx_blog_posts_slug`: slug 字段索引，加速文章查询
- `idx_blog_posts_published`: published_at 降序索引，加速列表排序

### 4.3 RLS 策略
- 公开读取：`published_at IS NOT NULL` 的文章可被任何人读取
- 认证写入：仅认证用户可创建和更新文章

---

## 5. 页面路由结构

```
/                    # 首页
/blog                # 文章列表页
/blog/[slug]         # 文章详情页
/about               # 关于页面（待开发）
/tags                # 标签页面（待开发）
/tags/[tag]          # 标签文章列表（待开发）
/archives            # 归档页面（待开发）
/admin               # 后台管理（待开发）
/admin/login         # 管理员登录（待开发）
/admin/posts         # 文章管理（待开发）
/admin/posts/new     # 新建文章（待开发）
/admin/posts/[id]    # 编辑文章（待开发）
```

---

## 6. 开发优先级

### P0 - 核心功能（已完成）
- [x] 首页展示
- [x] 文章列表
- [x] 文章详情
- [x] Markdown 渲染
- [x] 数据库集成

### P1 - 高优先级
- [ ] 分页功能
- [ ] 标签筛选
- [ ] 代码高亮
- [ ] SEO 优化（meta 标签、sitemap）
- [ ] 关于页面

### P2 - 中优先级
- [ ] 后台管理系统
- [ ] 文章搜索
- [ ] 目录导航
- [ ] 归档页面
- [ ] RSS 订阅

### P3 - 低优先级
- [ ] 评论系统
- [ ] 阅读统计
- [ ] 社交分享
- [ ] 多语言支持

---

## 7. 环境配置

### 7.1 环境变量
```env
NEXT_PUBLIC_SUPABASE_URL=<Supabase 项目 URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Supabase 匿名密钥>
```

### 7.2 开发命令
```bash
pnpm run dev      # 启动开发服务器
pnpm run build    # 构建生产版本
pnpm run lint     # 代码检查
```

---

## 8. 附录

### 8.1 参考资料
- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)