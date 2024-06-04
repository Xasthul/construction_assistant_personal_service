import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: any, next: () => void) {
    console.log(`${req.method} request received to ${req.url}`);
    next();
  }
}
