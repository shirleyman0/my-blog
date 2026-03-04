'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MarkdownEditor from '@/components/editor/MarkdownEditor'
import type { BlogPost } from '@/lib/supabase'
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from '@/app/admin/posts/actions'

interface PostFormProps {
  post?: BlogPost
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter()
  const isEditing = !!post

  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [tagsInput, setTagsInput] = useState(post?.tags?.join(', ') || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!isEditing && !slug) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (isDraft: boolean) => {
    if (!title.trim()) {
      setError('请输入文章标题')
      return
    }
    if (!content.trim()) {
      setError('请输入文章内容')
      return
    }

    setError(null)
    setLoading(true)

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    const finalSlug = slug || generateSlug(title)
    const payload = {
      title: title.trim(),
      slug: finalSlug,
      content: content.trim(),
      excerpt: excerpt.trim() || undefined,
      tags,
      publish: !isDraft,
    }

    try {
      if (isEditing) {
        await updatePostAction(post.id, payload)
      } else {
        await createPostAction(payload)
      }

      router.push('/admin/posts')
      router.refresh()
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : '提交失败，请稍后重试'
      setError(message)
      setLoading(false)
      return
    }
  }

  const handleDelete = async () => {
    if (!post || !confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
      return
    }

    setLoading(true)

    try {
      await deletePostAction(post.id)
      router.push('/admin/posts')
      router.refresh()
    } catch (deleteError) {
      const message =
        deleteError instanceof Error ? deleteError.message : '删除失败，请稍后重试'
      setError(message)
      setLoading(false)
      return
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/posts"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
          >
            ← 返回文章列表
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {isEditing ? '编辑文章' : '新建文章'}
          </h1>
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
          >
            删除文章
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            标题 *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="输入文章标题"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm"
            placeholder="url-friendly-slug"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            用于 URL 的唯一标识符，留空将自动生成
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            内容 *
          </label>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            placeholder="使用 Markdown 格式编写文章内容..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            摘要
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            placeholder="文章摘要，用于列表展示和 SEO"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            标签
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="标签1, 标签2, 标签3"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            多个标签用逗号分隔
          </p>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/admin/posts"
            className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            取消
          </Link>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {loading ? '保存中...' : '保存草稿'}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? '发布中...' : (isEditing && post?.published_at ? '更新发布' : '发布文章')}
          </button>
        </div>
      </div>
    </div>
  )
}
