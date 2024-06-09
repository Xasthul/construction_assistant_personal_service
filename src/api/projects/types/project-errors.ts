import { HttpStatus } from "@nestjs/common";
import { ApplicationError, ApplicationErrorCode } from "src/api/common/types/application-error";

export class ProjectNotFoundError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.NOT_FOUND,
            ApplicationErrorCode.projectNotFound,
            "Project not found",
        );
    }
}

export class DeleteProjectFailedError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ApplicationErrorCode.deleteProjectFailed,
            "Delete project failed",
        );
    }
}

export class UserAlreadyAddedToProjectError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.CONFLICT,
            ApplicationErrorCode.userAlreadyAddedToProject,
            "Delete project failed",
        );
    }
}

export class UserNotAddedToProjectError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.NOT_FOUND,
            ApplicationErrorCode.userNotAddedToProject,
            "User is not added to project",
        );
    }
}