import { Injectable } from "@nestjs/common";
import { JsonWebTokenError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { InvalidAccessTokenError } from "./types/auth-errors";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { 
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (info instanceof JsonWebTokenError) {
          throw new InvalidAccessTokenError();
        }
    
        return super.handleRequest(err, user, info, context, status);
      }
}
