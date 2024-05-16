'use client'
import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center justify-between w-[800px] p-4 bg-secondary rounded-2xl shadow-md">
      <div className="flex gap-x-2">
        <SignOutButton>
          <Button>SignOut</Button>
        </SignOutButton>
      </div>
      <div className="flex gap-x-2"></div>
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === '/admin' ? 'default' : 'outline'}>
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <div className="flex gap-x-2">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
      </div>
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === '/chat' ? 'default' : 'outline'}>
          <Link href="/chat">Chat</Link>
        </Button>
      </div>
    </nav>
  )
}
