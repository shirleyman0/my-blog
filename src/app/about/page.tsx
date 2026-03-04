import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于',
  description: '了解更多关于博客作者的信息',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-8 inline-block"
        >
          ← 返回首页
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          关于我
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              欢迎来到我的博客！我是一名热爱技术的开发者，专注于 Web 开发和软件工程。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              技术栈
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              关于这个博客
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              这个博客使用 Next.js 和 Supabase 构建，旨在分享我在技术学习和项目开发过程中的经验和思考。
              希望这些内容能对你有所帮助。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              联系方式
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              如果你有任何问题或想法，欢迎通过以下方式联系我：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-4 space-y-2">
              <li>GitHub: 暂未公开</li>
              <li>Email: 暂未公开</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
