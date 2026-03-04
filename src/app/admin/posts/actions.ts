'use server'

import { revalidatePath } from 'next/cache'
import { requireAdminUser } from '@/lib/admin-auth'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const MAX_TITLE_LENGTH = 180
const MAX_EXCERPT_LENGTH = 400

type PostMutationInput = {
  title: string
  slug?: string
  content: string
  excerpt?: string
  tags?: string[]
  publish: boolean
}

function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function normalizeInput(input: PostMutationInput) {
  const title = input.title.trim()
  const content = input.content.trim()
  const excerpt = input.excerpt?.trim() || null
  const tags = (input.tags || []).map((tag) => tag.trim()).filter(Boolean)
  const slug = normalizeSlug(input.slug?.trim() || title)

  if (!title) {
    throw new Error('请输入文章标题')
  }

  if (title.length > MAX_TITLE_LENGTH) {
    throw new Error(`标题不能超过 ${MAX_TITLE_LENGTH} 个字符`)
  }

  if (!content) {
    throw new Error('请输入文章内容')
  }

  if (!slug) {
    throw new Error('Slug 不能为空')
  }

  if (excerpt && excerpt.length > MAX_EXCERPT_LENGTH) {
    throw new Error(`摘要不能超过 ${MAX_EXCERPT_LENGTH} 个字符`)
  }

  return {
    title,
    slug,
    content,
    excerpt,
    tags,
    publish: input.publish,
  }
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const supabase = await createServerSupabaseClient()

  let query = supabase.from('blog_posts').select('id').eq('slug', slug).limit(1)

  if (excludeId) {
    query = query.neq('id', excludeId)
  }

  const { data, error } = await query.maybeSingle()

  if (error) {
    throw new Error(`检查 Slug 唯一性失败：${error.message}`)
  }

  if (data) {
    throw new Error('Slug 已存在，请更换后重试')
  }
}

function revalidateBlogPages(slug?: string) {
  revalidatePath('/admin')
  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  revalidatePath('/sitemap.xml')

  if (slug) {
    revalidatePath(`/blog/${slug}`)
  }
}

export async function createPostAction(input: PostMutationInput) {
  const user = await requireAdminUser()
  const normalized = normalizeInput(input)

  await ensureUniqueSlug(normalized.slug)

  const supabase = await createServerSupabaseClient()
  const now = new Date().toISOString()

  const { error } = await supabase.from('blog_posts').insert({
    title: normalized.title,
    slug: normalized.slug,
    content: normalized.content,
    excerpt: normalized.excerpt,
    tags: normalized.tags,
    author: user.email || 'Admin',
    published_at: normalized.publish ? now : null,
    updated_at: now,
  })

  if (error) {
    throw new Error(`创建文章失败：${error.message}`)
  }

  revalidateBlogPages(normalized.slug)
}

export async function updatePostAction(postId: string, input: PostMutationInput) {
  await requireAdminUser()
  const normalized = normalizeInput(input)

  const supabase = await createServerSupabaseClient()

  const { data: existing, error: existingError } = await supabase
    .from('blog_posts')
    .select('id, slug, published_at')
    .eq('id', postId)
    .maybeSingle()

  if (existingError) {
    throw new Error(`读取文章失败：${existingError.message}`)
  }

  if (!existing) {
    throw new Error('文章不存在或已删除')
  }

  await ensureUniqueSlug(normalized.slug, postId)

  const now = new Date().toISOString()
  const publishedAt = normalized.publish ? existing.published_at || now : null

  const { error } = await supabase
    .from('blog_posts')
    .update({
      title: normalized.title,
      slug: normalized.slug,
      content: normalized.content,
      excerpt: normalized.excerpt,
      tags: normalized.tags,
      published_at: publishedAt,
      updated_at: now,
    })
    .eq('id', postId)

  if (error) {
    throw new Error(`更新文章失败：${error.message}`)
  }

  revalidateBlogPages(existing.slug)
  if (existing.slug !== normalized.slug) {
    revalidateBlogPages(normalized.slug)
  }
}

export async function togglePublishAction(postId: string, publish: boolean) {
  await requireAdminUser()

  const supabase = await createServerSupabaseClient()
  const { data: existing, error: existingError } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('id', postId)
    .maybeSingle()

  if (existingError) {
    throw new Error(`读取文章失败：${existingError.message}`)
  }

  if (!existing) {
    throw new Error('文章不存在或已删除')
  }

  const now = new Date().toISOString()

  const { error } = await supabase
    .from('blog_posts')
    .update({
      published_at: publish ? now : null,
      updated_at: now,
    })
    .eq('id', postId)

  if (error) {
    throw new Error(`更新发布状态失败：${error.message}`)
  }

  revalidateBlogPages(existing.slug)
}

export async function deletePostAction(postId: string) {
  await requireAdminUser()

  const supabase = await createServerSupabaseClient()
  const { data: existing, error: existingError } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('id', postId)
    .maybeSingle()

  if (existingError) {
    throw new Error(`读取文章失败：${existingError.message}`)
  }

  const { error } = await supabase.from('blog_posts').delete().eq('id', postId)

  if (error) {
    throw new Error(`删除文章失败：${error.message}`)
  }

  revalidateBlogPages(existing?.slug)
}
