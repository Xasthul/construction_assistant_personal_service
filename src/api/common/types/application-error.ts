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
    static wrongOldPassword = 6;
    static deleteUserFailed = 7;
    static stepNotFound = 8;
    static deleteStepFailed = 9;
    static stepWithPreviousOrderNotFound = 10;
    static previousStepNotCompleted = 11;
    static emailAlreadyRegistered = 12;
    static wrongCredentials = 13;
    static invalidRefreshToken = 14;
    static invalidAccessToken = 15;
    static cantDeleteCretorFromProject = 16;
}