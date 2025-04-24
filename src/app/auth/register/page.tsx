'use client';

import React, { useState } from 'react';
import AuthLayout from '@components/auth/AuthLayout';
import Link from 'next/link';
import Image from 'next/image';
import { authService } from '@services/auth.service';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      router.push('/auth/verify-email');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
  };

  return (
    <AuthLayout 
        title="Create your account" 
        iconSrc="/create_account.svg" 
        iconAlt="Create Account Icon">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Sign up with Google
        </button>

        <div className="auth-input-container">
          <label htmlFor="fullName" className="auth-label">
            Full Name
          </label>
          <div className="relative">
            <div className="auth-input-icon">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="auth-input"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              placeholder="name@company.com"
              required
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              placeholder="••••••••"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Must contain 1 uppercase letter, 1 number, min. 8 characters.
          </p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          By clicking Register, you agree to accept Qurio&apos;s
          </p>
          <Link href="/terms" className="underline text-center block">
            Terms of Service
          </Link>
       

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 underline">
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage; 