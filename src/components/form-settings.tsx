import { settings } from '@/actions/settings'
import { SettingsSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/use-current-user'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { UserRole } from '@prisma/client'
import { Switch } from './ui/switch'

export const FormSettings = () => {
  const user = useCurrentUser()

  const { update } = useSession()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      password: undefined,
      newPassword: undefined
    }
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    console.log('values', values)
    startTransition(() => {
      settings(values)
        .then((data: any) => {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => setError('An error occurred'))
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    placeholder="John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="email"
                    placeholder="john.doe@example.com"
                    disabled={isPending}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="password"
                    placeholder="password"
                    disabled={isPending}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newPassword">New password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="newPassword"
                    placeholder="************"
                    disabled={isPending}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="role">Role</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={UserRole.USER}>User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-6">
                  <FormLabel htmlFor="isTwoFactorEnabled">
                    Two Factor Authentication
                  </FormLabel>
                  <FormDescription>
                    Enable two factor authentication for your account
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          Save
        </Button>
      </form>
    </Form>
  )
}
