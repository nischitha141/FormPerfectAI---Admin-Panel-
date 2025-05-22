import { apiClient } from '@lib/api/client';
import { ApiError } from '@lib/api/client';
import type { GetReferralUsersResponse, GetUserStatusListResponse, GetUserAmbassadorResponse } from '../types/api';

export const ambassadorService = {
  async getReferralUsers(): Promise<GetReferralUsersResponse> {
    try {
      console.log('Making API call to /api/admin/getReferralUser');
      const response = await apiClient.get<GetReferralUsersResponse>('/api/admin/getReferralUser');
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
      throw new ApiError('An unexpected error occurred while fetching referral users');
    }
  },

  async getUserStatusList(): Promise<GetUserStatusListResponse> {
    try {
      console.log('Making API call to /api/admin/getUserChangesStatusList');
      const response = await apiClient.get<GetUserStatusListResponse>('/api/admin/getUserChangesStatusList');
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
      throw new ApiError('An unexpected error occurred while fetching referral users');
    }
  },
  async getUserAmbassodorDetails(userId: string, startDate?: string, endDate?: string) {
    try {
      
      const queryParams = new URLSearchParams({ userId });
      if (startDate) queryParams.append('startDate', startDate);
      if (endDate) queryParams.append('endDate', endDate);

      const response = await apiClient.get<GetUserAmbassadorResponse>(`/api/admin/ambassadorData?${queryParams.toString()}`);
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
  }
}; 