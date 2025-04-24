export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  message: string;
  status: string;
  statusCode: number;
  success: boolean;
  data: T;
}

export interface Token {
  token: string;
  expiresIn: number;
}

export interface AuthResponse {
  token: Token;
  user: User;
}

export type LoginResponse = ApiResponse<AuthResponse>;
export type RegisterResponse = ApiResponse<AuthResponse>;
export type ResetPasswordResponse = ApiResponse<{ message: string }>;
export type VerifyEmailResponse = ApiResponse<{ message: string }>;

export interface LoginRequest {
  email: string;
  password: string;
  keepLoggedIn?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyEmailRequest {
  code: string;
}

export interface ReferralUser {
  _id: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    refrerralCode: string;
    referCode: string;
    status: string;
  };
  matchedReferrals: Array<{ _id: string }>;
  totalActiveReferrals: number;
  totalCommission: number;
  planName: string;
  totalReferrals: number;
  conversionRate: number;
}

export interface WeekData {
  weekStart: string;
  weekEnd: string;
  totalReferrals: number;
}

export interface TierWiseData {
  totalActiveAmbassadors: number;
  tierName: string;
}

export interface ReferralStats {
  totalConversionRate: number;
  activeReferralUsers: number;
  filledLast7WeeksData: WeekData[];
  totalRevenue: number;
  totalReferredUser: number;
  totalAmbassador: number;
  totalActiveAmbassadors: number;
  totalActiveAmbassadorsTierWise: TierWiseData[];
}

export interface ReferralPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ReferralResponse {
  stats: ReferralStats;
  referralUsers: ReferralUser[];
  pagination: ReferralPagination;
}

export type GetReferralUsersResponse = ApiResponse<ReferralResponse>

export interface UserStatusListResponseData {
  statusList: string[];
}

export type GetUserStatusListResponse = ApiResponse<UserStatusListResponseData>;

export interface PayoutData {
  _id: string;
  reqAmount: number;
  payment_method: string;
  status: string;
  createdAt: string;
  userId: string;
  username: string;
  email: string;
  tierName: string;
  totalEarnings: number;
}

export interface PayoutStats {
  totalPendingPayouts: number;
  totalApprovedPayouts: number;
  totalRejectedPayouts: number;
  totalReferralPayoutThisMonth: number;
}

export interface PayoutPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PayoutResponse {
  payoutData: PayoutData[];
  payoutStats: PayoutStats;
  pagination: PayoutPagination;
}

export type GetPayoutDataResponse = ApiResponse<PayoutResponse> 