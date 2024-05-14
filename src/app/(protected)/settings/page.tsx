import { auth } from '@/auth'

export default async function Page() {
  const session = await auth()
  return (
    <div className="flex flex-col gap-y-4 max-w-2xl py-24 mx-auto">
      <div>{JSON.stringify(session)}</div>
    </div>
  )
}
