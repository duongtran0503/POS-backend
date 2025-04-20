import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  errorResponse,
  serverErrorResponse,
} from 'src/common/helpers/response.helper';
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const message =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        exceptionResponse?.message || exception.message || 'Bad reqest';
      response.status(statusCode).json(errorResponse(message, statusCode));
    } else {
      console.log('server error:', exception);
      response.status(500).json(serverErrorResponse());
    }
  }
}
