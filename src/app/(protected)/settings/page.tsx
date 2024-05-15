'use client'

import { settings } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTransition } from 'react'

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition()
  const onClick = () => {
    startTransition(() => {
      settings({ name: 'New Name!' })
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
