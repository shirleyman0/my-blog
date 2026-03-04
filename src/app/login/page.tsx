import type { Metadata } from 'next'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: '管理员登录',
  robots: {
    index: false,
    follow: false,
  },
}

interface LoginPageProps {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const initialError =
    params.error === 'forbidden'
      ? '当前账号没有后台管理权限'
      : params.error === 'auth_failed'
        ? '登录会话校验失败，请重新登录'
        : null

  return <LoginForm initialError={initialError} />
}
