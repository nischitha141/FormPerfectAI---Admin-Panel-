'use client';

import React, { useState } from 'react';
import AuthLayout from '@components/auth/AuthLayout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@services/auth.service';
import { ApiError } from '@lib/api/client';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({
        email,
        password
      });

      console.log(response);

      // Store token based on keepLoggedIn preference
      const storage = keepLoggedIn ? localStorage : sessionStorage;
      storage.setItem('token', response.data.token.token);
      storage.setItem('tokenExpiry', String(Date.now() + response.data.token.expiresIn * 1000));
      
      // Store user data
      storage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to ambassador program page
      router.push('/ambassador-program');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || 'Login failed. Please check your credentials.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
  };

  return (
    <AuthLayout title="Welcome back">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Image
            src="/google-icon.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>

        <div className="auth-input-container">
          <label htmlFor="email" className="auth-label">
            Work Email
          </label>
          <div className="relative">
            <div className="auth-input-icon">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="name@company.com"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="auth-input-container">
          <label htmlFor="password" className="auth-label">
            Password
          </label>
          <div className="relative">
            <div className="auth-input-icon">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <input
              id="keepLoggedIn"
              name="keepLoggedIn"
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-[#E0E0E1] rounded cursor-pointer shadow-[0px_2px_2px_0px_#1B1C1D1F]"
              disabled={isLoading}
            />
            <label htmlFor="keepLoggedIn" className="text-sm text-gray-700 cursor-pointer">
              Keep me logged in
            </label>
          </div>
          <Link href="/auth/reset-password" className="text-sm text-[#666A73] hover:text-[#666A73]/80 underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            </div>
          ) : (
            'Sign in'
          )}
        </button>

        {/* <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div> */}
      </form>
    </AuthLayout>
  );
};

export default LoginPage;