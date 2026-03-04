import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import 'highlight.js/styles/github-dark.css';

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, author, published_at, tags')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .single();

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - 由 ${post.author} 撰写`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title} - 由 ${post.author} 撰写`,
      type: 'article',
      url: `/blog/${slug}`,
      publishedTime: post.published_at,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `${post.title} - 由 ${post.author} 撰写`,
      images: ['/opengraph-image'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .single();

  if (error || !post) {
    notFound();
  }

  const publishedDate = post.published_at || post.created_at;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <Nav />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-stone-400 dark:text-stone-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 mb-10 group"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>返回文章列表</span>
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-xs font-mono text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-6">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700" />
            <time dateTime={publishedDate}>
              {new Date(publishedDate).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="h-px bg-gradient-to-r from-stone-200 via-stone-200/50 to-transparent dark:from-stone-800 dark:via-stone-800/50 mb-10" />

        <div className="prose prose-stone prose-lg dark:prose-invert max-w-none prose-headings:tracking-tight prose-headings:font-bold prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-orange-300 dark:prose-blockquote:border-orange-800 prose-blockquote:not-italic prose-code:text-orange-700 dark:prose-code:text-orange-300 prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-stone-800/30 prose-pre:rounded-xl prose-img:rounded-xl prose-hr:border-stone-200 dark:prose-hr:border-stone-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200/50 dark:border-stone-800/30 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-stone-400 dark:text-stone-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300 group"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:-translate-x-0.5">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>查看更多文章</span>
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .not('published_at', 'is', null);

  return posts?.map((post) => ({
    slug: post.slug,
  })) || [];
}
