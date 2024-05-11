'use client'

import { LoginForm } from '@/components/auth/login-form'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return <LoginForm />
}
