import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: '博客文章',
  description: '探索我的技术文章和思考',
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  // Fetch blog posts from Supabase
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← 返回首页
          </Link>
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            博客文章
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            探索我的技术文章和思考
          </p>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-8">
          {posts && posts.length > 0 ? (
            posts.map((post: BlogPost) => {
              const publishedDate = post.published_at || post.created_at;

              return (
                <article
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time dateTime={publishedDate}>
                      {new Date(publishedDate).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>

                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                暂无文章，敬请期待...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
