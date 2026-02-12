import { validationResult } from 'express-validator';
export const validate = (validations) => {
    return async (req, res, next) => {
        for (const validation of validations) {
            await validation.run(req);
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: errors.array(),
            });
            return;
        }
        next();
    };
};
//# sourceMappingURL=validator.middleware.js.map