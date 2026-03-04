'use client'

import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { uploadImageToSupabase } from '@/lib/image-upload'
import 'highlight.js/styles/github-dark.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const insertImageMarkdown = (imageUrl: string, imageName: string) => {
    const textarea = textareaRef.current
    const currentValue = textarea?.value ?? value
    const selectionStart = textarea?.selectionStart ?? currentValue.length
    const selectionEnd = textarea?.selectionEnd ?? currentValue.length
    const before = currentValue.slice(0, selectionStart)
    const after = currentValue.slice(selectionEnd)
    const altText = imageName
      .replace(/\.[^.]+$/, '')
      .replace(/[\[\]()]/g, ' ')
      .trim() || 'image'
    const leadingBreak = before && !before.endsWith('\n') ? '\n' : ''
    const trailingBreak = after && !after.startsWith('\n') ? '\n' : ''
    const markdown = `${leadingBreak}![${altText}](${imageUrl})${trailingBreak}`
    const nextValue = `${before}${markdown}${after}`
    const nextCaretPos = before.length + markdown.length

    onChange(nextValue)
    requestAnimationFrame(() => {
      const field = textareaRef.current
      if (!field) {
        return
      }
      field.focus()
      field.setSelectionRange(nextCaretPos, nextCaretPos)
    })
  }

  const handleImageUpload = async (file: File) => {
    if (isUploading) {
      setUploadError('图片正在上传，请稍候')
      return
    }

    setUploadError(null)
    setIsUploading(true)

    try {
      const uploaded = await uploadImageToSupabase(file)
      insertImageMarkdown(uploaded.publicUrl, uploaded.fileName)
    } catch (error) {
      const message = error instanceof Error ? error.message : '图片上传失败，请稍后重试'
      setUploadError(message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    await handleImageUpload(file)
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const imageItem = Array.from(event.clipboardData.items).find((item) =>
      item.type.startsWith('image/')
    )

    if (!imageItem) {
      return
    }

    const file = imageItem.getAsFile()
    if (!file) {
      return
    }

    event.preventDefault()
    void handleImageUpload(file)
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? '上传中...' : '插入图片'}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          支持点击上传或直接粘贴截图
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {uploadError && (
        <div className="px-4 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-b border-red-300 dark:border-red-700">
          {uploadError}
        </div>
      )}

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
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onPaste={handlePaste}
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
