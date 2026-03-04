import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '关于',
  description: '了解更多关于博客作者的信息',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-stone-400 dark:text-stone-600 mb-4">
          About
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-10">
          关于我
        </h1>

        <div className="space-y-8">
          <div className="rounded-2xl p-8 md:p-10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-stone-200/80 dark:border-stone-800/60">
            <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
              欢迎来到我的博客！我是一名热爱技术的开发者，专注于 Web 开发和软件工程。
            </p>
          </div>

          <div className="rounded-2xl p-8 md:p-10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-stone-200/80 dark:border-stone-800/60">
            <h2 className="text-xl font-bold tracking-tight mb-5">
              技术栈
            </h2>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                <span key={tech} className="px-3.5 py-1.5 text-sm font-mono rounded-full bg-stone-100/80 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700/50 transition-colors duration-200 hover:border-orange-300/60 dark:hover:border-orange-800/40 hover:text-orange-600 dark:hover:text-orange-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-8 md:p-10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-stone-200/80 dark:border-stone-800/60">
            <h2 className="text-xl font-bold tracking-tight mb-4">
              关于这个博客
            </h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              这个博客使用 Next.js 和 Supabase 构建，旨在分享我在技术学习和项目开发过程中的经验和思考。
              希望这些内容能对你有所帮助。
            </p>
          </div>

          <div className="rounded-2xl p-8 md:p-10 bg-white/60 dark:bg-white/[0.03] backdrop-blur-md border border-stone-200/80 dark:border-stone-800/60">
            <h2 className="text-xl font-bold tracking-tight mb-4">
              联系方式
            </h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
              如果你有任何问题或想法，欢迎通过以下方式联系我：
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-stone-500 dark:text-stone-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 dark:bg-orange-500 shrink-0" />
                GitHub: 暂未公开
              </li>
              <li className="flex items-center gap-3 text-stone-500 dark:text-stone-400">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 dark:bg-orange-500 shrink-0" />
                Email: 暂未公开
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
