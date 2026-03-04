import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const revalidate = 60;

export default async function Home() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(5);

  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1) || [];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden">
      <Nav />

      <main>
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center px-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] left-[15%] w-[28rem] h-[28rem] bg-gradient-to-br from-orange-200/40 to-amber-100/30 dark:from-orange-900/20 dark:to-amber-900/10 rounded-full blur-3xl animate-orb-1" />
            <div className="absolute top-[30%] right-[15%] w-[22rem] h-[22rem] bg-gradient-to-br from-rose-200/30 to-pink-100/20 dark:from-rose-900/15 dark:to-pink-900/5 rounded-full blur-3xl animate-orb-2" />
            <div className="absolute bottom-[20%] left-[35%] w-[20rem] h-[20rem] bg-gradient-to-br from-amber-200/35 to-yellow-100/25 dark:from-amber-900/15 dark:to-yellow-900/5 rounded-full blur-3xl animate-orb-3" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-sm font-mono tracking-[0.25em] uppercase text-stone-400 dark:text-stone-600 mb-8 animate-fade-up">
              Thoughts & Code
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] mb-8 animate-fade-up [animation-delay:100ms]">
              <span className="bg-gradient-to-br from-stone-900 via-stone-700 to-stone-500 dark:from-stone-100 dark:via-stone-300 dark:to-stone-500 bg-clip-text text-transparent">
                分享技术
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 dark:from-orange-400 dark:via-amber-300 dark:to-orange-400 bg-clip-text text-transparent">
                思考与生活
              </span>
            </h1>
            <p className="text-lg text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed mb-12 animate-fade-up [animation-delay:200ms]">
              记录开发旅程中的每一个发现与感悟
            </p>
            <div className="flex items-center justify-center gap-4 animate-fade-up [animation-delay:300ms]">
              <Link
                href="/blog"
                className="px-8 py-3 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/15 dark:hover:shadow-stone-100/15 hover:scale-[1.03]"
              >
                阅读文章
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border border-stone-300 dark:border-stone-700 rounded-full text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900 hover:scale-[1.03] transition-all duration-300"
              >
                了解更多
              </Link>
            </div>
          </div>
        </section>

        {featuredPost && (
          <section className="max-w-5xl mx-auto px-6 pb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-600">
                Latest
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-stone-200 dark:from-stone-800 to-transparent" />
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="relative rounded-2xl p-8 md:p-10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-stone-200/80 dark:border-stone-800/60 transition-all duration-500 hover:border-orange-300/60 dark:hover:border-orange-800/40 hover:shadow-2xl hover:shadow-orange-600/[0.06]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-50/50 via-transparent to-transparent dark:from-orange-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 text-xs font-mono text-stone-400 dark:text-stone-500 mb-4 uppercase tracking-wider">
                    <time dateTime={featuredPost.published_at || featuredPost.created_at}>
                      {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.excerpt && (
                        <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-2xl">
                          {featuredPost.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300 shrink-0">
                      <span>阅读</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-5">
                      {featuredPost.tags.map((tag: string) => (
                        <span key={tag} className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          </section>
        )}

        {recentPosts.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 pb-24">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-600">
                Recent
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-stone-200 dark:from-stone-800 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recentPosts.map((post: BlogPost) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="h-full rounded-xl p-6 bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm border border-stone-200/60 dark:border-stone-800/50 transition-all duration-500 hover:bg-white/70 dark:hover:bg-white/[0.05] hover:border-orange-200/50 dark:hover:border-orange-900/30 hover:shadow-lg hover:shadow-stone-900/[0.04]">
                    <time dateTime={post.published_at || post.created_at} className="text-xs font-mono text-stone-400 dark:text-stone-500 uppercase tracking-wider">
                      {new Date(post.published_at || post.created_at).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <h3 className="text-lg font-bold tracking-tight mt-2 mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-stone-100/60 dark:bg-stone-800/60 text-stone-400 dark:text-stone-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-stone-400 dark:text-stone-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 group"
              >
                <span>查看全部文章</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </section>
        )}

        {!posts?.length && (
          <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
            <p className="text-stone-400 dark:text-stone-500">
              暂无文章，敬请期待...
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
