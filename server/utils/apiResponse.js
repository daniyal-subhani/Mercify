export class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.name = this.constructor.name; // Custom error name
        this.details = details; // Additional error details
        // Keep track of the original stack trace - this helps in debugging - this shows where the error was created - without this it logs and also show the constructor (new AppError(...)) in the stack trace - (excluding the constructor call).
        Error.captureStackTrace(this, this.constructor);
        // Restore prototype chain (important for instanceof checks)
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        // Prevent accidental mutation of the error object
        Object.freeze(this);
    }
    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            name: this.name,
            isOperational: this.isOperational,
            ...(this.details && { details: this.details })
        };
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Validation Error', details) {
        super(message, 400, true);
    }
}

export class AuthError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, true);
    }
}