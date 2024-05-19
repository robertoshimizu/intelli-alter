import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { IconSeparator } from '@/components/ui/icons'
import { SideMenu } from '@/components/header-side-menu'
import { UserMenu } from '@/components/user-menu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <SignedOut>
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <SideMenu />
          <IconSeparator className="size-6 text-muted-foreground/50" />
          {/* Mount the UserButton component */}
          <UserMenu />
        </SignedIn>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton showName={true} />
        </SignedIn>
      </div>
    </header>
  )
}
