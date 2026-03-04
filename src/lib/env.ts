const FALLBACK_SITE_URL = 'https://example.com'

export function getSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL. ' +
        'Please configure it in your runtime environment before starting the app.'
    )
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY. ' +
        'Please configure it in your runtime environment before starting the app.'
    )
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  }
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL

  try {
    return new URL(raw).origin
  } catch {
    throw new Error(
      'Invalid NEXT_PUBLIC_SITE_URL. Expected a full URL such as https://blog.example.com'
    )
  }
}
