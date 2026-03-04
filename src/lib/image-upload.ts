import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export const IMAGE_BUCKET = 'blog-images'
export const MAX_SOURCE_BYTES = 15 * 1024 * 1024
export const MAX_OUTPUT_BYTES = 5 * 1024 * 1024
const MAX_EDGE = 1920
const WEBP_QUALITY = 0.82

const COMPRESSIBLE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
])

const ALLOWED_IMAGE_TYPES = new Set([
  ...COMPRESSIBLE_TYPES,
  'image/gif',
])

type UploadedImage = {
  publicUrl: string
  path: string
  fileName: string
  bytes: number
  mimeType: string
}

function formatMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

function ensureBrowserRuntime() {
  if (typeof window === 'undefined') {
    throw new Error('图片上传仅支持在浏览器中执行')
  }
}

function getExtensionFromType(mimeType: string): string {
  const ext = mimeType.split('/')[1] || 'bin'
  return ext === 'jpeg' ? 'jpg' : ext
}

function toUploadName(fileName: string): string {
  const nameWithoutExt = fileName.replace(/\.[^.]+$/, '').trim()
  return nameWithoutExt ? `${nameWithoutExt}.webp` : 'image.webp'
}

function createObjectPath(file: File): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const randomPart =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10)
  const ext = getExtensionFromType(file.type)

  return `posts/${year}/${month}/${day}/${Date.now()}-${randomPart}.${ext}`
}

function validateImageFile(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('仅支持 JPG、PNG、WEBP 或 GIF 图片')
  }

  if (file.size > MAX_SOURCE_BYTES) {
    throw new Error(`原图不能超过 ${formatMb(MAX_SOURCE_BYTES)}`)
  }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('读取图片失败，请重试'))
    }

    image.src = objectUrl
  })
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('图片压缩失败，请重试'))
          return
        }
        resolve(blob)
      },
      'image/webp',
      WEBP_QUALITY
    )
  })
}

async function compressImage(file: File): Promise<File> {
  if (!COMPRESSIBLE_TYPES.has(file.type)) {
    if (file.size > MAX_OUTPUT_BYTES) {
      throw new Error(`图片不能超过 ${formatMb(MAX_OUTPUT_BYTES)}`)
    }
    return file
  }

  const image = await loadImage(file)
  const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height))
  const targetWidth = Math.max(1, Math.round(image.width * scale))
  const targetHeight = Math.max(1, Math.round(image.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('浏览器不支持图片压缩，请尝试更换浏览器')
  }

  context.drawImage(image, 0, 0, targetWidth, targetHeight)
  const compressedBlob = await canvasToBlob(canvas)

  if (compressedBlob.size > MAX_OUTPUT_BYTES) {
    throw new Error(`压缩后仍超过 ${formatMb(MAX_OUTPUT_BYTES)}，请换一张图片`)
  }

  if (compressedBlob.size >= file.size && file.size <= MAX_OUTPUT_BYTES) {
    return file
  }

  return new File([compressedBlob], toUploadName(file.name), { type: 'image/webp' })
}

export async function uploadImageToSupabase(file: File): Promise<UploadedImage> {
  ensureBrowserRuntime()
  validateImageFile(file)

  const optimizedFile = await compressImage(file)
  const path = createObjectPath(optimizedFile)
  const supabase = createBrowserSupabaseClient()

  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, optimizedFile, {
    cacheControl: '31536000',
    upsert: false,
    contentType: optimizedFile.type,
  })

  if (error) {
    throw new Error(`上传图片失败：${error.message}`)
  }

  const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path)

  if (!data.publicUrl) {
    throw new Error('图片上传成功但无法获取访问地址')
  }

  return {
    publicUrl: data.publicUrl,
    path,
    fileName: optimizedFile.name,
    bytes: optimizedFile.size,
    mimeType: optimizedFile.type,
  }
}
