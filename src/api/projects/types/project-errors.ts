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
            "User already added to project",
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

export class DeleteCreatorFromProjectError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.FORBIDDEN,
            ApplicationErrorCode.cantDeleteCretorFromProject,
            "Can't delete creator from project",
        );
    }
}