export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.formperfect.ai/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
};

export const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
}); 