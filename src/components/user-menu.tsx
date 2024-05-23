'use client'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { RxHamburgerMenu } from 'react-icons/rx'
import Link from 'next/link'

function getEmail(user: any) {
  const email = user.emailAddresses[0].emailAddress
  return email
}

export function UserMenu() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isSignedIn) {
    return null
  }
  const email = getEmail(user)
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <RxHamburgerMenu className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          <DropdownMenuItem className="flex-col items-start" asChild>
            <Link id="chat" href="/chat">
              Chat using Vercel
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex-col items-start" asChild>
            <Link id="langchat" href="/langchat">
              Langchat
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex-col items-start" asChild>
            <Link id="langgraph" href="/langgraph">
              Langgraph
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex-col items-start" asChild>
            <Link id="rsc_chat" href="/rsc_chat">
              Chat using RSC
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex-col items-start" asChild>
            <Link id="tools" href="/rsc">
              Tools
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
