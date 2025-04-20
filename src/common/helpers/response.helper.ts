export interface StandardResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
}

export const successResponse = <T = any>(
  data: T,
  message = 'Success',
  statusCode = 200,
): StandardResponse<T> => ({
  statusCode,
  message,
  data,
});

export const errorResponse = (
  message = 'Bad Request',
  statusCode = 400,
): StandardResponse<null> => ({
  statusCode,
  message,
  data: null,
});

export const serverErrorResponse = (
  message = 'Internal Server Error',
  statusCode = 500,
): StandardResponse<null> => ({
  statusCode,
  message,
  data: null,
});
