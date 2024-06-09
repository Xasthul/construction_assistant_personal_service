import { HttpStatus } from "@nestjs/common";
import { ApplicationError, ApplicationErrorCode } from "src/api/common/types/application-error";

export class UserNotFoundError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.NOT_FOUND,
            ApplicationErrorCode.userNotFound,
            "Project not found",
        );
    }
}