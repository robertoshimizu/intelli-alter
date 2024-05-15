import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }
      if (!data.password && data.newPassword) {
        return false
      }
      return true
    },
    {
      message: 'Password and New Password are required',
      path: ['newPassword']
    }
  )

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  })
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimu 6 characters required'
  })
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(6, {
    message: 'Minimu 6 characters required'
  }),
  name: z.string().min(1, {
    message: 'Name is required'
  })
})
