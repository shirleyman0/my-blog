import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { supabase } from '@/lib/supabase';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Fetch the blog post by slug
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <article className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Navigation */}
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          ← 返回博客列表
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          {/* TODO(human) - Add custom styling for the markdown content */}
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← 查看更多文章
          </Link>
        </footer>
      </article>
    </div>
  );
}

// Generate static params for static site generation
export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .not('published_at', 'is', null);

  return posts?.map((post) => ({
    slug: post.slug,
  })) || [];
}