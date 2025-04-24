import { apiClient } from '@lib/api/client';
import { ApiError } from '@lib/api/client';
import type { GetPayoutDataResponse } from '../types/api';

export const payoutService = {
  async getPayoutData(): Promise<GetPayoutDataResponse> {
    try {
      console.log('Making API call to /api/admin/getPayoutData');
      const response = await apiClient.get<GetPayoutDataResponse>('/api/admin/getPayoutData');
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
      throw new ApiError('An unexpected error occurred while fetching payout data');
    }
  }
}; 