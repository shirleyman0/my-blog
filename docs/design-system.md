# 设计系统 (Design System)

基于 Next.js + Tailwind CSS 4 的个人博客设计系统详细文档。

---

## 1. 设计原则

### 1.1 核心理念

| 原则 | 描述 |
|------|------|
| **简洁清晰** | 以内容为中心，减少视觉干扰 |
| **一致性** | 统一的视觉语言和交互模式 |
| **可访问性** | 支持深色模式，良好的对比度 |
| **响应式** | 移动优先，适配各种屏幕尺寸 |

### 1.2 设计风格

- **极简主义**：干净的布局，充足的留白
- **中文优化**：字体选择和行高针对中文阅读优化
- **技术感**：适合技术博客的专业视觉风格

---

## 2. 色彩系统

### 2.1 基础色板

```css
:root {
  /* 背景色 */
  --background: #ffffff;
  --foreground: #171717;

  /* 主题色 */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### 2.2 色彩变量

| 色彩类型 | 浅色模式 | 深色模式 | 用途 |
|---------|---------|---------|------|
| **背景色** | `#ffffff` | `#0a0a0a` | 页面背景 |
| **前景色** | `#171717` | `#ededed` | 主要文字 |
| **主色调** | `blue-600` (#2563eb) | `blue-400` (#60a5fa) | 链接、按钮、强调 |
| **次级背景** | `gray-50` (#f9fafb) | `gray-900` (#111827) | 卡片背景、区块 |
| **卡片背景** | `white` | `gray-800` (#1f2937) | 文章卡片 |
| **边框色** | `gray-200` (#e5e7eb) | `gray-800` (#1f2937) | 分割线、边框 |
| **辅助文字** | `gray-600` (#4b5563) | `gray-400` (#9ca3af) | 次要信息 |
| **淡化文字** | `gray-500` (#6b7280) | `gray-400` (#9ca3af) | 元数据、时间戳 |

### 2.3 渐变色

```tsx
// Hero 渐变背景
<div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">

// 标题渐变文字
<h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
```

### 2.4 标签色彩

```tsx
// 标签样式
<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
  标签
</span>
```

---

## 3. 字体系统

### 3.1 字体家族

```tsx
// layout.tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

| 字体 | CSS 变量 | 用途 |
|------|---------|------|
| **Geist Sans** | `--font-geist-sans` | 正文、UI 元素 |
| **Geist Mono** | `--font-geist-mono` | 代码块、技术内容 |
| **系统字体** | `Arial, Helvetica, sans-serif` | 降级字体 |

### 3.2 字号规范

| 级别 | Tailwind 类 | 像素值 | 使用场景 |
|------|------------|--------|---------|
| **特大标题** | `text-5xl` | 48px | 首页 Hero 标题 |
| **页面标题** | `text-4xl` | 36px | 页面主标题 |
| **文章标题** | `text-2xl` | 24px | 文章列表标题 |
| **小标题** | `text-xl` | 20px | 卡片标题、副标题 |
| **正文大** | `text-lg` | 18px | Prose 内容 |
| **正文** | `text-base` | 16px | 默认正文 |
| **辅助文字** | `text-sm` | 14px | 元数据、标签 |
| **小字** | `text-xs` | 12px | 标签内文字 |

### 3.3 字重

| 字重 | Tailwind 类 | 用途 |
|------|------------|------|
| **粗体** | `font-bold` | 标题、强调 |
| **半粗体** | `font-semibold` | 按钮、小标题 |
| **中等** | `font-medium` | 链接强调 |
| **常规** | `font-normal` | 正文 |

---

## 4. 间距系统

### 4.1 基础间距

使用 Tailwind 的 4px 基准间距系统：

| 值 | 像素 | 用途 |
|----|------|------|
| `1` | 4px | 微小间距 |
| `2` | 8px | 元素内间距 |
| `3` | 12px | 小间距 |
| `4` | 16px | 常规间距、px-4 |
| `6` | 24px | 中等间距 |
| `8` | 32px | 大间距、section 间距 |
| `12` | 48px | 页面内间距 |
| `16` | 64px | 页面顶底间距 py-16 |

### 4.2 容器宽度

```tsx
// 文章列表容器
<div className="container mx-auto px-4 max-w-4xl">

// 文章详情容器
<article className="container mx-auto px-4 max-w-3xl">
```

| 容器 | 最大宽度 | 场景 |
|------|---------|------|
| `max-w-4xl` | 896px | 首页、博客列表 |
| `max-w-3xl` | 768px | 文章详情页 |

---

## 5. 组件规范

### 5.1 按钮 (Button)

**主要按钮**
```tsx
<button className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
  按钮文字
</button>
```

**属性规范：**
- 圆角：`rounded-lg` (8px)
- 内边距：`px-8 py-3`
- 字重：`font-semibold`
- 过渡：`transition-colors`

### 5.2 链接 (Link)

**文本链接**
```tsx
<Link className="text-blue-600 hover:text-blue-700 font-medium">
  链接文字
</Link>
```

**返回链接**
```tsx
<Link className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
  ← 返回首页
</Link>
```

### 5.3 卡片 (Card)

**文章卡片**
```tsx
<article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  {/* 内容 */}
</article>
```

**属性规范：**
- 背景：`bg-white dark:bg-gray-800`
- 圆角：`rounded-lg`
- 阴影：`shadow-md`
- 内边距：`p-6`
- 悬停效果：`hover:shadow-lg transition-shadow`

**特性卡片**
```tsx
<div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
  <div className="text-3xl mb-4">📝</div>
  <h3 className="text-xl font-semibold mb-2">标题</h3>
  <p className="text-gray-600 dark:text-gray-400">描述文字</p>
</div>
```

### 5.4 标签 (Tag)

```tsx
<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
  标签名
</span>
```

**属性规范：**
- 内边距：`px-3 py-1`
- 圆角：`rounded-full`
- 字号：`text-xs` 或 `text-sm`

### 5.5 元数据 (Metadata)

```tsx
<div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
  <span>{author}</span>
  <span>•</span>
  <time dateTime={date}>{formattedDate}</time>
</div>
```

---

## 6. 布局系统

### 6.1 页面结构

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  (返回链接、导航)                                 │
├─────────────────────────────────────────────────┤
│                                                  │
│                 Main Content                     │
│           (container mx-auto px-4)              │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │           Hero / Page Title              │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │              Content Area                │    │
│  │         (Articles / Grid)                │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
├─────────────────────────────────────────────────┤
│                    Footer                        │
└─────────────────────────────────────────────────┘
```

### 6.2 栅格系统

```tsx
// 三列网格 (响应式)
<div className="grid md:grid-cols-3 gap-8">
  {/* 卡片 */}
</div>
```

### 6.3 列表布局

```tsx
// 垂直列表
<div className="space-y-8">
  {/* 文章卡片 */}
</div>
```

---

## 7. 动效系统

### 7.1 过渡效果

| 效果 | Tailwind 类 | 用途 |
|------|------------|------|
| **颜色过渡** | `transition-colors` | 链接、按钮悬停 |
| **阴影过渡** | `transition-shadow` | 卡片悬停 |
| **全属性过渡** | `transition-all` | 复杂动效 |

### 7.2 悬停状态

```tsx
// 颜色变化
className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"

// 阴影增强
className="hover:shadow-lg transition-shadow"

// 按钮深色
className="hover:bg-blue-700"
```

---

## 8. 响应式设计

### 8.1 断点

| 断点 | 前缀 | 最小宽度 | 场景 |
|------|------|---------|------|
| 默认 | (无) | 0px | 移动设备 |
| `md` | `md:` | 768px | 平板/笔记本 |
| `lg` | `lg:` | 1024px | 桌面 |

### 8.2 响应式示例

```tsx
// 响应式标题
<h1 className="text-4xl md:text-5xl font-bold">

// 响应式网格
<div className="grid md:grid-cols-3 gap-8">
```

---

## 9. 深色模式

### 9.1 实现方式

使用系统偏好设置自动切换：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### 9.2 Tailwind 深色模式类

```tsx
// 背景
className="bg-gray-50 dark:bg-gray-900"

// 文字
className="text-gray-900 dark:text-white"

// 边框
className="border-gray-200 dark:border-gray-700"
```

---

## 10. 排版规范

### 10.1 Prose 样式

文章内容使用 Tailwind Typography 插件：

```tsx
<div className="prose prose-lg dark:prose-invert max-w-none">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {content}
  </ReactMarkdown>
</div>
```

### 10.2 Markdown 渲染

- 使用 `react-markdown` 渲染
- 使用 `remark-gfm` 支持 GFM 语法
- 支持表格、任务列表、删除线等

---

## 11. 设计令牌 (Design Tokens)

### 11.1 推荐的 CSS 变量扩展

```css
:root {
  /* 色彩 */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #7c3aed;

  /* 间距 */
  --spacing-page-x: 1rem;
  --spacing-page-y: 4rem;
  --spacing-section: 4rem;
  --spacing-card: 1.5rem;

  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;

  /* 阴影 */
  --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-card-hover: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* 容器 */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 896px;
}
```

---

## 12. 组件库规划

### 12.1 基础组件

| 组件 | 状态 | 描述 |
|------|------|------|
| Button | 待实现 | 主要/次要/幽灵按钮 |
| Link | 已实现 | 文本链接样式 |
| Card | 已实现 | 文章卡片、特性卡片 |
| Tag | 已实现 | 标签组件 |
| Badge | 待实现 | 状态标记 |
| Input | 待实现 | 表单输入框 |

### 12.2 布局组件

| 组件 | 状态 | 描述 |
|------|------|------|
| Container | 已实现 | 页面容器 |
| Grid | 已实现 | 响应式网格 |
| Stack | 已实现 | 垂直堆叠 |
| Header | 待实现 | 页面头部 |
| Footer | 待实现 | 页面底部 |

### 12.3 内容组件

| 组件 | 状态 | 描述 |
|------|------|------|
| Hero | 已实现 | 首页 Hero 区块 |
| ArticleCard | 已实现 | 文章列表卡片 |
| ArticleHeader | 已实现 | 文章详情头部 |
| Prose | 已实现 | Markdown 内容区 |
| Metadata | 已实现 | 作者/时间信息 |

---

## 13. 文件结构规划

```
src/
├── app/
│   ├── globals.css          # 全局样式、CSS 变量
│   ├── layout.tsx           # 根布局
│   └── ...
├── components/
│   ├── ui/                   # 基础 UI 组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Tag.tsx
│   │   └── ...
│   ├── layout/               # 布局组件
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── blog/                 # 博客相关组件
│       ├── ArticleCard.tsx
│       ├── ArticleHeader.tsx
│       └── ...
├── lib/
│   └── utils.ts              # 工具函数 (如 cn)
└── styles/
    └── tokens.css            # 设计令牌 (可选)
```

---

## 14. 使用指南

### 14.1 添加新组件

1. 遵循现有的 Tailwind 类命名模式
2. 确保支持深色模式 (`dark:` 前缀)
3. 添加适当的过渡效果
4. 保持响应式设计

### 14.2 颜色使用

- 主要操作使用 `blue-600` / `blue-400`
- 背景层次使用 `gray-50` → `white` (浅色) / `gray-900` → `gray-800` (深色)
- 文字层次使用 `gray-900` → `gray-600` → `gray-500` (浅色)

### 14.3 间距使用

- 页面边距：`px-4`
- 页面上下：`py-16`
- 区块间距：`mt-16` / `mb-12`
- 卡片内边距：`p-6`
- 元素间隙：`gap-4` / `gap-8`

---

## 附录：快速参考

### A. 常用 Tailwind 类组合

```tsx
// 页面容器
"container mx-auto px-4 py-16 max-w-4xl"

// 文章卡片
"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"

// 主按钮
"inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"

// 文本链接
"text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"

// 标签
"px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"

// 渐变标题
"bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
```

### B. 色彩速查

| 用途 | 浅色 | 深色 |
|------|------|------|
| 页面背景 | `bg-gray-50` | `dark:bg-gray-900` |
| 卡片背景 | `bg-white` | `dark:bg-gray-800` |
| 主要文字 | `text-gray-900` | `dark:text-white` |
| 次要文字 | `text-gray-600` | `dark:text-gray-400` |
| 链接 | `text-blue-600` | `dark:text-blue-400` |
| 边框 | `border-gray-200` | `dark:border-gray-700` |

---

*文档版本：1.0.0*
*最后更新：2026-01-14*
*适用项目：Next.js 16 + Tailwind CSS 4 博客*