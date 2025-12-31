import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎来到我的博客
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            分享技术、思考和生活
          </p>
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            阅读文章
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">技术文章</h3>
            <p className="text-gray-600 dark:text-gray-400">
              分享前端、后端和全栈开发经验
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-2">学习笔记</h3>
            <p className="text-gray-600 dark:text-gray-400">
              记录学习过程中的思考和总结
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">项目分享</h3>
            <p className="text-gray-600 dark:text-gray-400">
              展示个人项目和开源贡献
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-600">
            使用 Next.js + Supabase + Vercel 构建
          </p>
        </div>
      </main>
    </div>
  );
}