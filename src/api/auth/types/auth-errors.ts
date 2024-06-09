import { HttpStatus } from "@nestjs/common";
import { ApplicationError, ApplicationErrorCode } from "src/api/common/types/application-error";

export class EmailAlreadyRegisteredError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.CONFLICT,
            ApplicationErrorCode.emailAlreadyRegistered,
            "User with such email already registered",
        );
    }
}

export class WrongCredentialsError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.UNAUTHORIZED,
            ApplicationErrorCode.wrongCredentials,
            "Wrong email or password",
        );
    }
}

export class InvalidRefreshTokenError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.UNAUTHORIZED,
            ApplicationErrorCode.invalidRefreshToken,
            "Invalid refresh token",
        );
    }
}

export class InvalidAccessTokenError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.UNAUTHORIZED,
            ApplicationErrorCode.invalidAccessToken,
            "Invalid access token",
        );
    }
}