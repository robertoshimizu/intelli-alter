'use client'

import { settings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSession } from 'next-auth/react'
import { useTransition } from 'react'

export default function SettingsPage() {
  // Need to update the session to changes take place
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(() => {
      settings({ name: 'Roberto Shimizu' }).then(() => {
        update()
      })
    })
  }
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick} className="w-full">
          Update Name
        </Button>
      </CardContent>
    </Card>
  )
}
