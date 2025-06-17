import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { getToken, clearAuthData } from '../auth';
import { NextRouter } from 'next/router';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;
  private router: NextRouter | null = null; // Store the router instance

  private constructor() {
    console.log('Initializing API client with base URL:', process.env.NEXT_PUBLIC_API_URL);
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://51.20.81.95:3005/',
      timeout: 10000,
    });

    // Add request interceptor to add auth token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        console.log('Request config:', {
          url: config.url,
          method: config.method,
          headers: config.headers,
          hasToken: !!token
        });
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // Add response interceptor to handle token expiration
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('Response received:', {
          url: response.config.url,
          status: response.status,
          data: response.data
        });
        return response;
      },
      (error: AxiosError) => {
        console.error('Response error:', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data
        });
        if (error.response?.status === 401) {
          // Token is invalid or expired
          clearAuthData();
          if (this.router) {
            // Use router.push to avoid page refresh
            this.router.push('/auth/login');
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      console.log('Making GET request to:', url);
      const response = await this.client.get(url, config);
      return response.data;
    } catch (error: unknown) {
      console.error('GET request failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(error.response.data?.message || 'An error occurred');
      }
      throw new ApiError('Network error occurred');
    }
  }

  public async post<T>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post(url, data, config);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(error.response.data?.message || 'An error occurred');
      }
      throw new ApiError('Network error occurred');
    }
  }

  public async put<T>(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put(url, data, config);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(error.response.data?.message || 'An error occurred');
      }
      throw new ApiError('Network error occurred');
    }
  }

  public async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete(url, config);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(error.response.data?.message || 'An error occurred');
      }
      throw new ApiError('Network error occurred');
    }
  }
}

// Create and export a single instance
const apiClient = ApiClient.getInstance();
export { apiClient }; 