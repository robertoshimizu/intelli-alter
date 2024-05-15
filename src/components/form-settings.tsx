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
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/use-current-user'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'

export const FormSettings = () => {
  const user = useCurrentUser()

  const { update } = useSession()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined
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
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
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
