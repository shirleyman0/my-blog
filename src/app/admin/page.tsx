import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import StatsCard from '@/components/admin/StatsCard'

interface RecentPost {
  id: string
  title: string
  published_at: string | null
  updated_at: string
}

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()

  const [
    { count: totalPosts },
    { count: publishedPosts },
    { data: recentPosts }
  ] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).not('published_at', 'is', null),
    supabase.from('blog_posts').select('id, title, published_at, updated_at').order('updated_at', { ascending: false }).limit(5)
  ])

  const draftPosts = (totalPosts || 0) - (publishedPosts || 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">仪表盘</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">欢迎回来，这是你的博客概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard title="文章总数" value={totalPosts || 0} icon="total" />
        <StatsCard title="已发布" value={publishedPosts || 0} icon="published" />
        <StatsCard title="草稿" value={draftPosts} icon="draft" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">最近更新</h2>
          <Link
            href="/admin/posts"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
          >
            查看全部 →
          </Link>
        </div>

        {recentPosts && recentPosts.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentPosts.map((post: RecentPost) => (
              <li key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      更新于 {new Date(post.updated_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.published_at
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {post.published_at ? '已发布' : '草稿'}
                    </span>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                    >
                      编辑
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            暂无文章，
            <Link href="/admin/posts/new" className="text-blue-600 dark:text-blue-400 hover:underline">
              创建第一篇文章
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
