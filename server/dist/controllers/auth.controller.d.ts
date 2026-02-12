import { Request, Response, NextFunction } from 'express';
export declare class AuthController {
    private authService;
    constructor();
    private getRequestMeta;
    /** Set browser_id cookie on response if missing (so same-browser is recognized next time). */
    private setBrowserIdCookieIfMissing;
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    sendVerificationCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    verifyEmailCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    heartbeat: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=auth.controller.d.ts.map