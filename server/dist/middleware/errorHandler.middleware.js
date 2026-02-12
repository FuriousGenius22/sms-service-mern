export class AppError extends Error {
    statusCode;
    message;
    isOperational;
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
export const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
        return;
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors: err.message,
        });
        return;
    }
    // Mongoose duplicate key error
    if (err.name === 'MongoServerError' && err.code === 11000) {
        res.status(400).json({
            status: 'error',
            message: 'Email already exists',
        });
        return;
    }
    // Default error
    console.error('Error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};
//# sourceMappingURL=errorHandler.middleware.js.map