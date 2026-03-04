import { createServerSupabaseClient } from '@/lib/supabase-server'
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: '后台管理',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: adminRecord } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!adminRecord) {
    redirect('/login?error=forbidden')
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header userEmail={user?.email} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
