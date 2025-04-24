import { User } from "../types/api";

export const setAuthData = (token: string, expiryTime: number, user: User): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiry', expiryTime.toString());
  localStorage.setItem('user', JSON.stringify(user));
};

export const isTokenExpired = (): boolean => {
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  if (!tokenExpiry) return true;

  const expiryTime = parseInt(tokenExpiry);
  const currentTime = Date.now();

  return currentTime >= expiryTime;
};

export const getToken = (): string | null => {
  if (isTokenExpired()) {
    clearAuthData();
    return null;
  }
  return localStorage.getItem('token');
};

export const clearAuthData = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('user');
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.log(e)
    return null;
  }
}; 