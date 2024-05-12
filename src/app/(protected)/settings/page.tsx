import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function Page() {
  const session = await auth()
  return (
    <div className="flex flex-col gap-y-4 max-w-2xl py-24 mx-auto">
      <div>{JSON.stringify(session)}</div>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  )
}
