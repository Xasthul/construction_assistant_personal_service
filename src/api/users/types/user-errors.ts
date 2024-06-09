import { HttpStatus } from "@nestjs/common";
import { ApplicationError, ApplicationErrorCode } from "src/api/common/types/application-error";

export class UserNotFoundError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.NOT_FOUND,
            ApplicationErrorCode.userNotFound,
            "User not found",
        );
    }
}

export class WrongOldPasswordError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.UNAUTHORIZED,
            ApplicationErrorCode.wrongOldPassword,
            "Wrong old password",
        );
    }
}

export class DeleteUserFailedError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ApplicationErrorCode.deleteUserFailed,
            "Delete user failed",
        );
    }
}