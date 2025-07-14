import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityException } from 'src/infra/error/entity.exception';
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
        .json({ errors: message.message, type: 'validation' })
        .end();
    }
    if (exception instanceof NotFoundError) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({ errors: exception.message, type: 'domain' })
        .end();
    }
    if (exception instanceof EntityException) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ errors: exception.message, type: 'domain' })
        .end();
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
