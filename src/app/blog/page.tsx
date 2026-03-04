import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: '博客文章',
  description: '探索我的技术文章和思考',
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-14">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-600 mb-4">
            All Posts
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            博客文章
          </h1>
          <p className="text-stone-500 dark:text-stone-400">
            探索我的技术文章和思考
          </p>
        </div>

        <div className="space-y-5">
          {posts && posts.length > 0 ? (
            posts.map((post: BlogPost) => {
              const publishedDate = post.published_at || post.created_at;

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <article className="rounded-2xl p-6 md:p-8 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-stone-200/80 dark:border-stone-800/60 transition-all duration-500 hover:border-orange-300/60 dark:hover:border-orange-800/40 hover:shadow-xl hover:shadow-orange-600/[0.04]">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-xs font-mono text-stone-400 dark:text-stone-500 mb-3 uppercase tracking-wider">
                          <time dateTime={publishedDate}>
                            {new Date(publishedDate).toLocaleDateString('zh-CN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                          <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700" />
                          <span>{post.author}</span>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag: string) => (
                              <span key={tag} className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="hidden md:flex items-center gap-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1">
                        <span>阅读</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-400 dark:text-stone-500">
                暂无文章，敬请期待...
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
