'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { BlogPost } from '@/lib/supabase'
import { deletePostAction, togglePublishAction } from '@/app/admin/posts/actions'

interface PostActionsProps {
  post: BlogPost
}

export default function PostActions({ post }: PostActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleTogglePublish = async () => {
    setLoading(true)

    try {
      await togglePublishAction(post.id, !post.published_at)
      router.refresh()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '操作失败，请稍后重试'
      alert('操作失败：' + message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
      return
    }

    setLoading(true)
    try {
      await deletePostAction(post.id)
      router.refresh()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '删除失败，请稍后重试'
      alert('删除失败：' + message)
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-end space-x-2">
      <Link
        href={`/admin/posts/${post.id}/edit`}
        className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
      >
        编辑
      </Link>
      <button
        onClick={handleTogglePublish}
        disabled={loading}
        className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
      >
        {post.published_at ? '取消发布' : '发布'}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
      >
        删除
      </button>
    </div>
  )
}
