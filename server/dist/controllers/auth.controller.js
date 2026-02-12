import { randomUUID } from 'crypto';
import { AuthService } from '../services/auth.service.js';
const BROWSER_ID_COOKIE = 'browser_id';
const BROWSER_ID_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // 1 year
export class AuthController {
    authService;
    constructor() {
        this.authService = new AuthService();
    }
    getRequestMeta(req) {
        const cookies = req.cookies;
        return {
            ipAddress: req.ip || req.socket.remoteAddress || '',
            userAgent: req.headers['user-agent'] || '',
            browserId: cookies?.browser_id || '',
        };
    }
    /** Set browser_id cookie on response if missing (so same-browser is recognized next time). */
    setBrowserIdCookieIfMissing(req, res) {
        const cookies = req.cookies;
        if (cookies?.browser_id)
            return;
        const id = randomUUID();
        res.cookie(BROWSER_ID_COOKIE, id, {
            maxAge: BROWSER_ID_MAX_AGE_MS,
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
    }
    register = async (req, res, next) => {
        try {
            const data = req.body;
            const result = await this.authService.register(data, this.getRequestMeta(req));
            this.setBrowserIdCookieIfMissing(req, res);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    sendVerificationCode = async (req, res, next) => {
        try {
            const data = req.body;
            const result = await this.authService.sendVerificationCode(data);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    };
    verifyEmailCode = async (req, res, next) => {
        try {
            const data = req.body;
            const result = await this.authService.verifyEmailCode(data);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const data = req.body;
            const result = await this.authService.login(data, this.getRequestMeta(req));
            this.setBrowserIdCookieIfMissing(req, res);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    };
    logout = async (req, res, next) => {
        try {
            const authHeader = req.header('Authorization');
            const token = authHeader?.replace('Bearer ', '') || '';
            await this.authService.logout(token);
            res.json({ message: 'Logged out successfully' });
        }
        catch (error) {
            next(error);
        }
    };
    heartbeat = async (req, res, next) => {
        try {
            const authHeader = req.header('Authorization');
            const token = authHeader?.replace('Bearer ', '') || '';
            await this.authService.refreshSession(token);
            res.json({ message: 'Session refreshed' });
        }
        catch (error) {
            next(error);
        }
    };
    getProfile = async (req, res, next) => {
        try {
            const userId = req.userId;
            const user = await this.authService.getProfile(userId);
            res.json(user);
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map