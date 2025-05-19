import { ApiClient, ApiError } from '@lib/api/client';
import { getToken, clearAuthData, setAuthData } from '@lib/auth';
import type { LoginResponse, RegisterResponse, ResetPasswordResponse, VerifyEmailResponse, ApiResponse } from '../types/api';

const apiClient = ApiClient.getInstance();

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
      if (!response.success) {
        throw new ApiError(response.message);
      }
      
      // Store token and expiry time
      const { token, user } = response.data;
      const expiryTime = Date.now() + (token.expiresIn * 1000); // Convert seconds to milliseconds
      setAuthData(token.token, expiryTime, user);
      
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred during login');
    }
  },

  async register(userData: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/api/auth/register', userData);
      if (!response.success) {
        throw new ApiError(response.message);
      }
      
      // Store token and expiry time
      const { token, user } = response.data;
      const expiryTime = Date.now() + (token.expiresIn * 1000); // Convert seconds to milliseconds
      setAuthData(token.token, expiryTime, user);
      
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred during registration');
    }
  },

  async resetPassword(email: string): Promise<ResetPasswordResponse> {
    try {
      const response = await apiClient.post<ResetPasswordResponse>('/api/auth/forgot-password', { email });
      if (!response.success) {
        throw new ApiError(response.message);
      }
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred during password reset');
    }
  },

  async verifyForgotPasswordOTP(email: string, otp: string): Promise<VerifyEmailResponse> {
    try {
      const response = await apiClient.post<ApiResponse<VerifyEmailResponse>>('/api/auth/verify-forgotOtp', { email, otp });
      if (!response.success) {
        throw new ApiError(response.message);
      }
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred during OTP verification');
    }
  },

  logout() {
    clearAuthData();
  },

  isAuthenticated(): boolean {
    return !!getToken();
  },

}; 