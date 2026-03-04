import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/50 dark:border-stone-800/30">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-stone-400 dark:text-stone-600 tracking-wide">
          Next.js · Supabase · Vercel
        </p>
        <div className="flex items-center gap-6">
          <Link href="/blog" className="text-xs text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-200">
            文章
          </Link>
          <Link href="/about" className="text-xs text-stone-400 dark:text-stone-600 hover:text-stone-600 dark:hover:text-stone-400 transition-colors duration-200">
            关于
          </Link>
        </div>
      </div>
    </footer>
  );
}
