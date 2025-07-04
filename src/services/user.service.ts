import { apiClient } from '@lib/api/client';
import { ApiError } from '@lib/api/client';
import type { GetSubscriptionUsersResponse, GetUserProfileResponse, GetUserPayoutResponse, GetUserSubscriptionResponse } from '../types/api';

export const userService = {
  async getSubscriptionUsers(): Promise<GetSubscriptionUsersResponse> {
    try {
      console.log('Making API call to /api/admin/getUserSubscription');
      const response = await apiClient.get<GetSubscriptionUsersResponse>('/api/admin/getUserSubscription');
      console.log('API Response:', response);

      if (!response.success) {
        throw new ApiError(response.message);
      }
      return response;
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred while fetching Subscription users');
    }
  },

  async getUser(userId: string): Promise<GetUserProfileResponse> {
    try {
      
      const response = await apiClient.get<GetUserProfileResponse>(`/api/admin/useroverview?userId=${userId}`);
       if (!response.success) {
        throw new ApiError(response.message);
      }
      return response;
    } catch (error) {
       if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred while fetching Subscription users');
    }
  },

  async getUserSubscriptionDetails(userId: string, startDate?: string, endDate?: string) {
    try {
      
      const queryParams = new URLSearchParams({ userId });
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const response = await apiClient.get<GetUserSubscriptionResponse>(`/api/admin/userSubscriptionData?${queryParams.toString()}`);
      if (!response.success) {
        throw new ApiError(response.message);
      }
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('An unexpected error occurred while fetching subscription users');
    }
  },

  async getUserPayoutDetails(userId: string, startDate?: string, endDate?: string) {
      try {
        
        const queryParams = new URLSearchParams({ userId });
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
  
        const response = await apiClient.get<GetUserPayoutResponse>(`/api/admin/payoutAndRequest?${queryParams.toString()}`);
        if (!response.success) {
          throw new ApiError(response.message);
        }
        return response;
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError('An unexpected error occurred while fetching subscription users');
      }
    },
}; 