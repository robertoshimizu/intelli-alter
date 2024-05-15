import { UserInfo } from '@/components/user-info'
import { currentUser } from '@/lib/auth'

export default async function ServerPage() {
  const user = await currentUser()
  return (
    <div className="flex flex-col gap-y-4 max-w-2xl py-24 mx-auto">
      <UserInfo user={user} label="💻 Server component" />
    </div>
  )
}
