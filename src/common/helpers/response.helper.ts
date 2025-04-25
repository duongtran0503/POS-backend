export interface StandardResponse<T = any> {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  data: T;
}

export const successResponse = <T = any>(
  data: T,
  message = 'Success',
  isSuccess = true,
  statusCode = 200,
): StandardResponse<T> => ({
  statusCode,
  message,
  isSuccess,
  data,
});

export const errorResponse = (
  message = 'Bad Request',
  statusCode = 400,
  isSuccess = false,
): StandardResponse<null> => ({
  statusCode,
  message,
  isSuccess,
  data: null,
});

export const serverErrorResponse = (
  message = 'Internal Server Error',
  statusCode = 500,
  isSuccess = true,
): StandardResponse<null> => ({
  statusCode,
  message,
  isSuccess,
  data: null,
});
