import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({ subsets: ['latin'], weight: ['600'] })

interface HeaderProps {
  label: string
}

const Header = ({ label }: HeaderProps) => {
  return (
    <header className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(font, 'text-3xl font-semibold font.className')}>
        🔐 Auth
      </h1>
      <p className="">{label}</p>
    </header>
  )
}

export default Header
