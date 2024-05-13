'use client'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

export default function HomePage() {
  const session = useSession()
  return (
    <div className="flex flex-col gap-y-4 max-w-2xl py-24 mx-auto">
      <div>Home Page</div>
      <div>
        {session ? (
          <div>
            <div>Session</div>
            <div>{JSON.stringify(session)}</div>
            <Button
              onClick={() => {
                console.log('Logging out ...')
                signOut()
              }}
              type="button"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>Not signed in</div>
        )}
      </div>
    </div>
  )
}
