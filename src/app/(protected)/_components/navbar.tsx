'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="flex items-center justify-between w-[800px] p-4 bg-secondary rounded-2xl shadow-md">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === '/home' ? 'default' : 'outline'}>
          <Link href="/home">Home</Link>
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
      <p>User Button</p>
    </nav>
  )
}
