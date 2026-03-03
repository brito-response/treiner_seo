export class ApiError extends Error {
    constructor(public message: string, public status = 500) {
        super(message);
    };
};