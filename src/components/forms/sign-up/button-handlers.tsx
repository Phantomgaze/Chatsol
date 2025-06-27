'use client'
import { Button } from '@/components/ui/button'
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import Link from 'next/link'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

const ButtonHandler = () => {
  const { setCurrentStep, currentStep } = useAuthContextHook()
  const { formState, getFieldState, getValues, trigger } = useFormContext()
  const { onGenerateOTP } = useSignUpForm()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const { isDirty: isName } = getFieldState('fullname', formState)
  const { isDirty: isEmail } = getFieldState('email', formState)
  const { isDirty: isPassword } = getFieldState('password', formState)

  const handleOTPGeneration = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isLoading) return

    try {
      setIsLoading(true)
      const isValid = await trigger(['fullname', 'email', 'password'])
      if (!isValid) {
        setIsLoading(false)
        return
      }

      const email = getValues('email')
      const password = getValues('password')
      await onGenerateOTP(email, password, setCurrentStep)
    } catch (error: any) {
      if (error?.response?.status === 429) {
        toast({
          title: 'Rate limit exceeded',
          description: 'Please wait a few minutes before trying again.',
          variant: 'destructive',
        })
      } else if (error?.response?.status === 401) {
        toast({
          title: 'Authentication error',
          description: 'Please try refreshing the page and try again.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error',
          description: error?.message || 'Something went wrong. Please try again.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleStepTransition = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      const isValid = await trigger(['type'])
      if (!isValid) return
    }
    setCurrentStep((prev: number) => prev + 1)
  }

  if (currentStep === 3) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create an account'}
        </Button>
        <p>
          Already have an account?
          <Link
            href="/auth/sign-in"
            className="font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  if (currentStep === 2) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="button"
          className="w-full"
          onClick={handleOTPGeneration}
          disabled={isLoading}
        >
          {isLoading ? 'Sending OTP...' : 'Continue'}
        </Button>
        <p>
          Already have an account?{' '}
          <Link
            href="/auth/sign-in"
            className="font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="button"
        className="w-full"
        onClick={handleStepTransition}
        disabled={isLoading}
      >
        Continue
      </Button>
      <p>
        Already have an account?{' '}
        <Link
          href="/auth/sign-in"
          className="font-bold"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default ButtonHandler