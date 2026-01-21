// Error types for consistent error handling
export type ErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT';

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
  retryable: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface APIErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
    validationErrors?: ValidationError[];
  };
  status: number;
}

export const isAppError = (error: unknown): error is AppError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  );
};
