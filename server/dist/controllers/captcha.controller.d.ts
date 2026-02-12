import { Request, Response, NextFunction } from 'express';
export declare class CaptchaController {
    generate: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    verify: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=captcha.controller.d.ts.map