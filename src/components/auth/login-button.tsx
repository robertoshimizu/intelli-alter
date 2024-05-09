'use client'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export default function LoginButton({
  children,
  mode = 'redirect',
  asChild
}: LoginButtonProps) {
  const onClick = () => {
    console.log('Login Button clicked')
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
