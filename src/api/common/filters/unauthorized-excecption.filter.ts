import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { InvalidRefreshTokenError } from 'src/api/auth/types/auth-errors';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {

  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<FastifyReply>();
    response.status(401).send(new InvalidRefreshTokenError());
  }
}
