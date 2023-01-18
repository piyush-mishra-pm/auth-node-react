export default class ErrorObject extends Error {
    statusCode: number;
    code: number;

    constructor(statusCode: number, message: string) {
        // Add custom "message" for the Error Object:
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        // Sets Error name:
        this.name = Error.name;

        // Adds a "code" property:
        this.statusCode = statusCode;
        this.code = statusCode;

        Error.captureStackTrace(this);
    }
}