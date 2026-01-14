# UI 设计说明文档

基于 Next.js + Tailwind CSS 4 的现代博客 UI 设计规范。

---

## 1. 设计理念

### 1.1 核心原则

| 原则 | 描述 |
|------|------|
| **内容优先** | 以阅读体验为核心，减少视觉干扰 |
| **极简克制** | 少即是多，每个元素都有存在的理由 |
| **呼吸感** | 充足的留白，让内容自然呈现 |
| **一致性** | 统一的视觉语言和交互模式 |
| **包容性** | 支持深色模式，良好的可访问性 |

### 1.2 设计风格

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     现代极简 · 中文优化 · 技术感 · 沉浸阅读                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**关键词**：
- 干净的布局
- 柔和的渐变
- 精致的圆角
- 微妙的阴影
- 流畅的过渡

---

## 2. 色彩系统

### 2.1 基础色板

#### 浅色模式

```css
:root {
  --background: #ffffff;      /* 纯白背景 */
  --foreground: #171717;      /* 深灰文字 */
}
```

#### 深色模式

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;    /* 近黑背景 */
    --foreground: #ededed;    /* 浅灰文字 */
  }
}
```

### 2.2 语义色彩

| 用途 | 浅色模式 | 深色模式 | Tailwind 类 |
|------|----------|----------|-------------|
| **页面背景** | `#f9fafb` | `#111827` | `bg-gray-50` / `dark:bg-gray-900` |
| **卡片背景** | `#ffffff` | `#1f2937` | `bg-white` / `dark:bg-gray-800` |
| **主要文字** | `#111827` | `#ffffff` | `text-gray-900` / `dark:text-white` |
| **次要文字** | `#4b5563` | `#9ca3af` | `text-gray-600` / `dark:text-gray-400` |
| **辅助文字** | `#6b7280` | `#9ca3af` | `text-gray-500` / `dark:text-gray-400` |
| **边框** | `#e5e7eb` | `#374151` | `border-gray-200` / `dark:border-gray-700` |

### 2.3 品牌色

| 色彩 | 色值 | 用途 |
|------|------|------|
| **主色** | `#2563eb` (blue-600) | 链接、按钮、强调 |
| **主色悬停** | `#1d4ed8` (blue-700) | 悬停状态 |
| **辅助色** | `#7c3aed` (purple-600) | 渐变、装饰 |

### 2.4 渐变色

```tsx
// Hero 区域背景渐变
className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"

// 标题文字渐变
className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
```

### 2.5 标签色彩

```tsx
// 标签样式
className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
```

---

## 3. 字体系统

### 3.1 字体家族

| 字体 | 用途 | CSS 变量 |
|------|------|----------|
| **Geist Sans** | 正文、UI | `--font-geist-sans` |
| **Geist Mono** | 代码 | `--font-geist-mono` |
| **系统字体** | 降级 | `Arial, Helvetica, sans-serif` |

### 3.2 字号层级

| 级别 | Tailwind | 像素 | 使用场景 |
|------|----------|------|----------|
| **Hero** | `text-5xl` | 48px | 首页主标题 |
| **H1** | `text-4xl` | 36px | 页面标题 |
| **H2** | `text-2xl` | 24px | 文章标题 |
| **H3** | `text-xl` | 20px | 卡片标题 |
| **Body Large** | `text-lg` | 18px | 文章正文 |
| **Body** | `text-base` | 16px | 默认正文 |
| **Small** | `text-sm` | 14px | 元数据 |
| **XSmall** | `text-xs` | 12px | 标签 |

### 3.3 字重

| 字重 | Tailwind | 用途 |
|------|----------|------|
| **Bold** | `font-bold` | 主标题 |
| **Semibold** | `font-semibold` | 副标题、按钮 |
| **Medium** | `font-medium` | 链接强调 |
| **Normal** | `font-normal` | 正文 |

### 3.4 行高

| 场景 | 推荐行高 | 说明 |
|------|----------|------|
| 标题 | 1.2 - 1.3 | 紧凑 |
| 正文 | 1.6 - 1.8 | 舒适阅读 |
| 代码 | 1.5 | 清晰 |

---

## 4. 间距系统

### 4.1 基础单位

基于 4px 网格系统：

| 值 | 像素 | Tailwind | 用途 |
|----|------|----------|------|
| 1 | 4px | `p-1` | 微小间距 |
| 2 | 8px | `p-2` | 紧凑间距 |
| 3 | 12px | `p-3` | 小间距 |
| 4 | 16px | `p-4` | 常规间距 |
| 6 | 24px | `p-6` | 卡片内边距 |
| 8 | 32px | `p-8` | 区块间距 |
| 12 | 48px | `py-12` | 大区块 |
| 16 | 64px | `py-16` | 页面间距 |

### 4.2 页面布局间距

```
┌─────────────────────────────────────────────────────────────┐
│                        py-16 (64px)                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │  px-4 (16px)              内容区              px-4    │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                   max-w-4xl                     │  │  │
│  │  │                   (896px)                       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                        py-16 (64px)                         │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 组件间距

| 组件 | 间距 | Tailwind |
|------|------|----------|
| 页面容器 | 上下 64px，左右 16px | `py-16 px-4` |
| 区块间距 | 64px | `mt-16` |
| 卡片内边距 | 24px | `p-6` |
| 卡片间距 | 32px | `space-y-8` |
| 元素间隙 | 8-16px | `gap-2` / `gap-4` |

---

## 5. 组件规范

### 5.1 按钮 (Button)

#### 主要按钮

```tsx
<button className="
  inline-block
  bg-blue-600
  text-white
  px-8 py-3
  rounded-lg
  font-semibold
  hover:bg-blue-700
  transition-colors
">
  按钮文字
</button>
```

**规格**：
- 圆角：8px (`rounded-lg`)
- 内边距：32px × 12px (`px-8 py-3`)
- 字重：Semibold
- 过渡：颜色 150ms

#### 按钮状态

| 状态 | 背景色 | 文字色 |
|------|--------|--------|
| 默认 | `blue-600` | `white` |
| 悬停 | `blue-700` | `white` |
| 禁用 | `gray-300` | `gray-500` |

### 5.2 链接 (Link)

#### 文本链接

```tsx
<Link className="
  text-blue-600
  hover:text-blue-700
  dark:hover:text-blue-400
  transition-colors
">
  链接文字
</Link>
```

#### 返回链接

```tsx
<Link className="
  text-blue-600
  hover:text-blue-700
  mb-4
  inline-block
">
  ← 返回首页
</Link>
```

### 5.3 卡片 (Card)

#### 文章卡片

```tsx
<article className="
  bg-white dark:bg-gray-800
  rounded-lg
  shadow-md
  p-6
  hover:shadow-lg
  transition-shadow
">
  {/* 内容 */}
</article>
```

**规格**：
- 背景：白色 / 深灰
- 圆角：8px
- 阴影：`shadow-md` → `shadow-lg`
- 内边距：24px
- 过渡：阴影 150ms

#### 特性卡片

```tsx
<div className="
  p-6
  border border-gray-200 dark:border-gray-800
  rounded-lg
">
  <div className="text-3xl mb-4">📝</div>
  <h3 className="text-xl font-semibold mb-2">标题</h3>
  <p className="text-gray-600 dark:text-gray-400">描述</p>
</div>
```

### 5.4 标签 (Tag)

```tsx
<span className="
  px-3 py-1
  bg-blue-100 dark:bg-blue-900
  text-blue-800 dark:text-blue-200
  text-xs
  rounded-full
">
  标签名
</span>
```

**规格**：
- 圆角：全圆 (`rounded-full`)
- 内边距：12px × 4px
- 字号：12px

### 5.5 元数据 (Metadata)

```tsx
<div className="
  flex items-center gap-4
  text-sm
  text-gray-500 dark:text-gray-400
">
  <span>{author}</span>
  <span>•</span>
  <time>{date}</time>
</div>
```

---

## 6. 布局系统

### 6.1 页面结构

```
┌─────────────────────────────────────────────────────────────┐
│                         Header                               │
│                    (返回链接、导航)                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                      Hero Section                            │
│                   (渐变背景、主标题)                          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                     Content Area                             │
│                  (文章列表 / 详情)                            │
│                                                              │
│    ┌─────────────────────────────────────────────────┐      │
│    │                  max-w-4xl                       │      │
│    │               container mx-auto                  │      │
│    └─────────────────────────────────────────────────┘      │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                         Footer                               │
│                      (技术栈信息)                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 容器宽度

| 容器 | 最大宽度 | 场景 |
|------|----------|------|
| `max-w-4xl` | 896px | 首页、列表页 |
| `max-w-3xl` | 768px | 文章详情页 |
| `max-w-2xl` | 672px | 窄内容区 |

### 6.3 栅格系统

```tsx
// 三列网格（响应式）
<div className="grid md:grid-cols-3 gap-8">
  {/* 卡片 */}
</div>

// 垂直列表
<div className="space-y-8">
  {/* 文章卡片 */}
</div>
```

---

## 7. 动效系统

### 7.1 过渡时长

| 类型 | 时长 | 用途 |
|------|------|------|
| 快速 | 150ms | 颜色、透明度 |
| 标准 | 200ms | 阴影、变换 |
| 慢速 | 300ms | 复杂动画 |

### 7.2 过渡效果

```tsx
// 颜色过渡
className="transition-colors"

// 阴影过渡
className="transition-shadow"

// 全属性过渡
className="transition-all"
```

### 7.3 悬停状态

| 元素 | 悬停效果 |
|------|----------|
| 链接 | 颜色加深 |
| 按钮 | 背景加深 |
| 卡片 | 阴影增强 |
| 标题 | 颜色变化 |

```tsx
// 链接悬停
className="hover:text-blue-700 dark:hover:text-blue-400"

// 卡片悬停
className="hover:shadow-lg"

// 按钮悬停
className="hover:bg-blue-700"
```

---

## 8. 响应式设计

### 8.1 断点

| 断点 | 前缀 | 最小宽度 | 设备 |
|------|------|----------|------|
| 默认 | - | 0px | 手机 |
| `sm` | `sm:` | 640px | 大手机 |
| `md` | `md:` | 768px | 平板 |
| `lg` | `lg:` | 1024px | 笔记本 |
| `xl` | `xl:` | 1280px | 桌面 |

### 8.2 响应式策略

**移动优先**：默认样式针对移动端，通过断点前缀扩展到大屏幕。

```tsx
// 响应式标题
<h1 className="text-4xl md:text-5xl font-bold">

// 响应式网格
<div className="grid md:grid-cols-3 gap-8">

// 响应式间距
<div className="px-4 md:px-8">
```

### 8.3 移动端适配

| 元素 | 移动端 | 桌面端 |
|------|--------|--------|
| 标题 | `text-4xl` | `text-5xl` |
| 网格 | 单列 | 三列 |
| 边距 | `px-4` | `px-4` |

---

## 9. 深色模式

### 9.1 实现方式

使用系统偏好自动切换：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### 9.2 Tailwind 深色类

```tsx
// 背景
className="bg-gray-50 dark:bg-gray-900"

// 文字
className="text-gray-900 dark:text-white"

// 边框
className="border-gray-200 dark:border-gray-700"

// 卡片
className="bg-white dark:bg-gray-800"
```

### 9.3 深色模式色彩对照

| 元素 | 浅色 | 深色 |
|------|------|------|
| 页面背景 | `gray-50` | `gray-900` |
| 卡片背景 | `white` | `gray-800` |
| 主要文字 | `gray-900` | `white` |
| 次要文字 | `gray-600` | `gray-400` |
| 链接 | `blue-600` | `blue-400` |
| 边框 | `gray-200` | `gray-700` |

---

## 10. 可访问性

### 10.1 对比度

确保文字与背景的对比度符合 WCAG 2.1 AA 标准：

| 组合 | 对比度 | 状态 |
|------|--------|------|
| `gray-900` on `white` | 15.8:1 | ✅ |
| `gray-600` on `white` | 5.7:1 | ✅ |
| `white` on `gray-900` | 15.8:1 | ✅ |
| `gray-400` on `gray-900` | 5.5:1 | ✅ |

### 10.2 焦点状态

```tsx
// 链接焦点
className="focus:outline-none focus:ring-2 focus:ring-blue-500"

// 按钮焦点
className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
```

### 10.3 语义化

- 使用 `<article>` 包裹文章卡片
- 使用 `<time>` 标记日期
- 使用 `<nav>` 包裹导航
- 使用 `<main>` 包裹主内容

---

## 11. 页面示例

### 11.1 首页布局

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    渐变背景 (gray-50 → white)                │
│                                                             │
│                  ┌─────────────────────┐                    │
│                  │   欢迎来到我的博客    │  ← 渐变文字        │
│                  │   分享技术、思考和生活 │                   │
│                  │     [阅读文章]       │  ← 主按钮          │
│                  └─────────────────────┘                    │
│                                                             │
│    ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│    │ 📝       │    │ 💡       │    │ 🚀       │            │
│    │ 技术文章  │    │ 学习笔记  │    │ 项目分享  │            │
│    │ 描述...   │    │ 描述...   │    │ 描述...   │            │
│    └──────────┘    └──────────┘    └──────────┘            │
│                                                             │
│              使用 Next.js + Supabase 构建                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 11.2 文章列表布局

```
┌─────────────────────────────────────────────────────────────┐
│  ← 返回首页                                                  │
│                                                             │
│  博客文章                                                    │
│  探索我的技术文章和思考                                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  文章标题                                            │    │
│  │  作者 • 2026年1月14日                                │    │
│  │  文章摘要内容...                                      │    │
│  │  [标签1] [标签2]                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  另一篇文章                                          │    │
│  │  ...                                                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. 快速参考

### 12.1 常用类组合

```tsx
// 页面容器
"min-h-screen bg-gray-50 dark:bg-gray-900"

// 内容容器
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

// 元数据
"flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
```

### 12.2 色彩速查

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
