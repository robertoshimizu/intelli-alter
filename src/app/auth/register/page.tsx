'use client'

import { RegisterForm } from '@/components/auth/register-form'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  return <RegisterForm />
}
