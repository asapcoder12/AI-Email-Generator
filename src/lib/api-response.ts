import { NextResponse } from "next/server";
import type { ApiErrorCode, ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

export function successResponse<TData>(
  data: TData,
  requestId: string,
  init?: ResponseInit,
) {
  const payload: ApiSuccessResponse<TData> = {
    data,
    meta: {
      requestId,
    },
  };

  return NextResponse.json(payload, init);
}

export function errorResponse(
  code: ApiErrorCode,
  message: string,
  status: number,
  requestId: string,
  details?: unknown,
) {
  const payload: ApiErrorResponse = {
    error: {
      code,
      message,
      ...(details === undefined ? {} : { details }),
    },
    meta: {
      requestId,
    },
  };

  return NextResponse.json(payload, { status });
}
