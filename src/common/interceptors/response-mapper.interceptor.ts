import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
  } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ResponseMapperInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          const type = Array.isArray(data) ? 'Collection' : 'Object';
          return { data, metadata: { type } };
        }),
      );
    }
  }