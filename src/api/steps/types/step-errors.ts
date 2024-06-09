import { HttpStatus } from "@nestjs/common";
import { ApplicationError, ApplicationErrorCode } from "src/api/common/types/application-error";

export class StepNotFoundError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.NOT_FOUND,
            ApplicationErrorCode.stepNotFound,
            "Step not found",
        );
    }
}

export class DeleteStepFailedError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ApplicationErrorCode.deleteStepFailed,
            "Delete step failed",
        );
    }
}

export class StepWithPreviousOrderNotFoundError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.INTERNAL_SERVER_ERROR,
            ApplicationErrorCode.stepWithPreviousOrderNotFound,
            "Step with previous order not found",
        );
    }
}

export class PreviousStepNotCompletedError extends ApplicationError {
    constructor() {
        super(
            HttpStatus.FORBIDDEN,
            ApplicationErrorCode.previousStepNotCompleted,
            "Step with previous order not completed",
        );
    }
}