'use client';

import React, { useState } from 'react';
import { authService } from '../../../services/auth.service';
import AuthLayout from '@components/auth/AuthLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword(email);
      router.push('/auth/verify-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while resetting password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your registered email to reset your password."
      iconSrc="/reset_password.svg"
      iconAlt="Reset Password"
      centerLayout={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="auth-input-container">
          <label htmlFor="email" className="auth-label">
            Work Email*
          </label>
          <div className="relative">
            <div className="auth-input-icon">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="Enter your email address"
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
          {isLoading ? 'Sending...' : 'Reset Password'}
        </button>

        <div className="mb-0 text-center text-sm text-gray-600">
          Don&apos;t have access anymore?
        </div>
        <Link href="/" className="block text-center underline">
          Contact Support
        </Link>
        <Link href="/" className="block text-center underline text-blue-600 hover:text-blue-500">
          Go Back
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage; 