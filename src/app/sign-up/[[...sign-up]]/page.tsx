import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <SignUp />
    </div>
  )
}
