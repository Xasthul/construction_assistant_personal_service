import { HttpException } from "@nestjs/common";

export class ApplicationError extends HttpException {
    constructor(statusCode: number, errorCode: number, errorDetails: string) {
        super({
            errorCode: errorCode,
            errorDetails: errorDetails,
        } as ApplicationErrorResponse, statusCode);
    }
}

interface ApplicationErrorResponse {
    readonly errorCode: number

    readonly errorDetails: string
}

export class ApplicationErrorCode {
    static projectNotFound = 1;
    static deleteProjectFailed = 2;
    static userNotFound = 3;
    static userAlreadyAddedToProject = 4;
    static userNotAddedToProject = 5;
}