import type { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function requireAdminUser(): Promise<User> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('UNAUTHENTICATED')
  }

  const { data: adminRecord, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (adminError || !adminRecord) {
    throw new Error('FORBIDDEN')
  }

  return user
}

export async function requireAdminUserOrRedirect(): Promise<User> {
  try {
    return await requireAdminUser()
  } catch {
    redirect('/login?error=forbidden')
  }
}
