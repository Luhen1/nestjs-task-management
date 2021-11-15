// serialization process using transform.
// serialization is used for controlling data that is exposed and exploit sentisive information
// about the user.
// our @exclude decorator is not enough to protect user data. so a interceptor with transform can
// protect the user in a good manner way through the process of serialization.

import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map((data) => classToPlain(data)));
  }
}
