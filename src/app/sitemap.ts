import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { getSiteUrl } from '@/lib/env';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .not('published_at', 'is', null);

  if (error) {
    console.error('Error generating sitemap posts:', error);
  }

  const postUrls: MetadataRoute.Sitemap = posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...postUrls,
  ];
}
