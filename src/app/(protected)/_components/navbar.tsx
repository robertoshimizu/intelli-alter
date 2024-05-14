'use client'

import UserButton from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center justify-between w-[800px] p-4 bg-secondary rounded-2xl shadow-md">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === '/server' ? 'default' : 'outline'}
        >
          <Link href="/server">Server</Link>
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === '/client' ? 'default' : 'outline'}
        >
          <Link href="/client">Client</Link>
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === '/admin' ? 'default' : 'outline'}>
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === '/chat' ? 'default' : 'outline'}>
          <Link href="/chat">Chat</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}
