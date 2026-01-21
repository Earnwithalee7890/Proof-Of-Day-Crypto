// Response types for API endpoints
export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface PaginatedRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CampaignListResponse {
  campaigns: Array<{
    id: string;
    title: string;
    budget: number;
    participantCount: number;
    status: string;
  }>;
}

export interface UserProfileResponse {
  fid: number;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
}
