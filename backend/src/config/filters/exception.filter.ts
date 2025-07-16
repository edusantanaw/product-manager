import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityException } from 'src/infra/error/entity.exception';
import { InvalidUploadError } from 'src/modules/product/error/invalid-upload';
import { NotFoundError } from 'src/modules/product/error/not-found.error';

@Catch(Error)
export class ExceptionFilterImpl implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      const message = exception.getResponse() as { message: string[] };
      return response
        .status(exception.getStatus())
        .json({ error: message.message[0], type: 'validation' })
        .end();
    }
    if (exception instanceof NotFoundError) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({ error: exception.message, type: 'domain' })
        .end();
    }
    if (exception instanceof EntityException) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: exception.message, type: 'domain' })
        .end();
    }
    if (exception instanceof InvalidUploadError) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: exception.message, type: 'validation' })
        .end();
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
