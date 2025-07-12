import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class ExceptionFilterImpl implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      const message = exception.getResponse() as { message: string[] };
      return response
        .status(exception.getStatus())
        .json({ errors: message.message, type: 'validation' });
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
