'use client'
import useCurrentUser from '@/hooks/use-current-user'
import { UserInfo } from '@/components/user-info'

export default function ClientPage() {
  const user = useCurrentUser()
  return (
    <div className="flex flex-col gap-y-4 max-w-2xl py-24 mx-auto">
      <UserInfo user={user} label="📱 Client component" />
    </div>
  )
}
