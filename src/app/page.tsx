import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils/utils'
import { Button } from '@/components/ui/button'

export const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            'text-6xl font-semibold text-white drop-shadow-md',
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <Button variant="secondary" size="lg">
            Sign in
          </Button>
        </div>
      </div>
    </main>
  )
}
