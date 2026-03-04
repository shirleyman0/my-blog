import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-stone-50/80 dark:bg-stone-950/80 border-b border-stone-200/50 dark:border-stone-800/50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-stone-900 dark:text-stone-100">
          博客
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/blog" className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200">
            文章
          </Link>
          <Link href="/about" className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-200">
            关于
          </Link>
        </div>
      </div>
    </nav>
  );
}
