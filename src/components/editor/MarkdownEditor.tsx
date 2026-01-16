'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="md:hidden flex border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'edit'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          编辑
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          预览
        </button>
      </div>

      <div className="hidden md:flex border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
          Markdown 编辑
        </div>
        <div className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          实时预览
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className={`w-full md:w-1/2 ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-96 p-4 resize-none focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
            placeholder={placeholder || '在此输入 Markdown 内容...'}
          />
        </div>
        <div className={`w-full md:w-1/2 md:border-l border-gray-200 dark:border-gray-700 ${activeTab === 'edit' ? 'hidden md:block' : ''}`}>
          <div className="prose prose-lg dark:prose-invert max-w-none p-4 h-96 overflow-auto bg-gray-50 dark:bg-gray-900">
            {value ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {value}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic">预览区域</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
