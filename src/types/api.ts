export type ApiErrorCode =
  | "AUTH_NOT_CONFIGURED"
  | "DATABASE_ERROR"
  | "INTERNAL_ERROR"
  | "INVALID_JSON"
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR";

export type ApiErrorResponse = {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  };
  meta: {
    requestId: string;
  };
};

export type ApiSuccessResponse<TData> = {
  data: TData;
  meta: {
    requestId: string;
  };
};

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;
