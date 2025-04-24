'use client';

import React, { useState } from 'react';
import { authService } from '../../../services/auth.service';
import AuthLayout from '@components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface VerifyEmailPageProps {
  email?: string | undefined;
}

const VerifyEmailClient = ({ email }: VerifyEmailPageProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }

    try {
      await authService.verifyForgotPasswordOTP(email, verificationCode);
      router.push('/auth/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while verifying OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      description="We've sent a code to your email"
      iconSrc="/verify_email.svg"
      iconAlt="Verify Email"
      centerLayout={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="auth-input-container">
          <label htmlFor="verificationCode" className="auth-label">
            Verification Code
          </label>
          <div className="relative">
            <div className="auth-input-icon">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="auth-input"
              placeholder="Enter the 6-digit code"
              required
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Submit Code'}
        </button>

        <div className="mb-0 text-center text-sm text-gray-600">
          Experiencing issues receiving the code?
        </div>
        <Link href="/" className="block text-center underline">
          Resend code
        </Link>
      </form>
    </AuthLayout>
  );
};

export default VerifyEmailClient;
