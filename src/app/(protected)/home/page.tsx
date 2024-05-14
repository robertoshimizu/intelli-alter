'use client'
import useCurrentUser from '@/hooks/use-current-user'

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
          </div>
        ) : (
          <div>Not signed in</div>
        )}
      </div>
    </div>
  )
}
