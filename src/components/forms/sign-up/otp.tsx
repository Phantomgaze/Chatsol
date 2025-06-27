import React, { useState } from 'react'
import { useSignUpForm } from '../../../hooks/sign-up/use-sign-up'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  onNext: () => void
}

export const OTPForm = ({ onNext }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm()
  const { register, formState: { errors } } = methods

  return (
    <form onSubmit={onHandleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">Enter OTP Code</Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter the code sent to your email"
          {...register('otp')}
          disabled={loading}
        />
        {errors.otp && (
          <p className="text-sm text-red-500">{errors.otp.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>
    </form>
  )
} 