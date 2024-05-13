'use client'
import { newVerification } from '@/actions/new-verification'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'

export const NewPasswordForm = () => {
  function Search() {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const searchParams = useSearchParams()
    const token = searchParams.get('token') ?? ''

    const onSubmit = useCallback(() => {
      if (success || error) return

      if (!token) {
        setError('Missing token!')
        return
      }
      newVerification(token)
        .then((data) => {
          setSuccess(data.success)
          setError(data.error)
        })
        .catch((error) => {
          setError(error)
        })
    }, [token, success, error])
    useEffect(() => {
      onSubmit()
    }, [onSubmit])

    return (
      <>
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </>
    )
  }

  return (
    <CardWrapper
      headerLabel="Verifying email..."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <Suspense>
          <Search />
        </Suspense>
      </div>
    </CardWrapper>
  )
}
