import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';
  import { Response } from 'express';
  
  @Catch(HttpException, Error)
  export class HttpExceptionFilter<T extends HttpException>
    implements ExceptionFilter
  {
    catch(exception: T, host: ArgumentsHost): Response {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status: HttpStatus = exception.getStatus() || HttpStatus.BAD_REQUEST;
      let exceptionResponse;
  
      if (exception instanceof HttpException) {
        exceptionResponse = exception.getResponse();
      } else {
        exceptionResponse = exception || 'Bad Request';
      }
  
      Logger.error(exception.stack);
  
      const error = this.parseException(exceptionResponse);
      return response.status(status).json({
        status,
        ...error,
      });
    }
  
    private parseException(response: string | object): Record<string, unknown> {
      let message;
      let details = [];
      if (typeof response === 'string') {
        message = response;
      } else if (response['message']) {
        const data = response['message'];
        if (Array.isArray(data)) {
          details = data;
          message = 'See details for more information';
        } else message = data;
      } else {
        message = 'An error occurred, please try again later.';
      }
  
      return { message, details, time: Date.now() };
    }
  }