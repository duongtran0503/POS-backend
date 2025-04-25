import { successResponse } from './../helpers/response.helper';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res: Response = ctx.getResponse();

    return next.handle().pipe(
      map((data: { message: string; data: undefined | null }) => {
        const statusCode = res.statusCode ?? 200;
        const message = data?.message;
        const result = data?.data ?? data;

        return successResponse(result, message, true, statusCode);
      }),
    );
  }
}
