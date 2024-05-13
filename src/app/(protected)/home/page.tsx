'use client'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/use-current-user'
import { signOut } from 'next-auth/react'

export default function HomePage() {
  const user = useCurrentUser()
  return (
    <div className="flex flex-col gap-y-4 max-w-2xl py-24 mx-auto">
      <div>Home Page</div>
      <div>
        {user ? (
          <div>
            <div>Session - User </div>
            <div>{JSON.stringify(user)}</div>
            <div className="bg-white p-10 rounded-xl">
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
          </div>
        ) : (
          <div>Not signed in</div>
        )}
      </div>
    </div>
  )
}
