import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception && (exception.code === '23505' || exception.driverError?.code === '23505')) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Dữ liệu này đã tồn tại trong hệ thống',
        error: 'Bad Request',
        timestamp: new Date().toISOString(),
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json(
        typeof res === 'object'
          ? { ...res, timestamp: new Date().toISOString() }
          : { statusCode: status, message: res, timestamp: new Date().toISOString() },
      );
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Lỗi máy chủ nội bộ',
      timestamp: new Date().toISOString(),
    });
  }
}
