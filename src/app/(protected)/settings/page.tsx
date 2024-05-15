'use client'

import { FormSettings } from '@/components/form-settings'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <FormSettings />
      </CardContent>
    </Card>
  )
}
