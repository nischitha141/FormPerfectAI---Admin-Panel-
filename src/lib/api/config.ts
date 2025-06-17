export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://51.20.81.95:3005/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
};

export const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
}); 