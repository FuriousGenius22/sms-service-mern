import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import {
  RegisterDTO,
  LoginDTO,
  SendVerificationCodeDTO,
  VerifyEmailCodeDTO,
} from '../types/index.js';

const BROWSER_ID_COOKIE = 'browser_id';
const BROWSER_ID_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000; // 1 year

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  private getRequestMeta(req: Request) {
    const cookies = req.cookies as { browser_id?: string } | undefined;
    return {
      ipAddress: req.ip || req.socket.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
      browserId: cookies?.browser_id || '',
    };
  }

  /** Set browser_id cookie on response if missing (so same-browser is recognized next time). */
  private setBrowserIdCookieIfMissing(req: Request, res: Response): void {
    const cookies = req.cookies as { browser_id?: string } | undefined;
    if (cookies?.browser_id) return;
    const id = randomUUID();
    res.cookie(BROWSER_ID_COOKIE, id, {
      maxAge: BROWSER_ID_MAX_AGE_MS,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: RegisterDTO = req.body;
      const result = await this.authService.register(data, this.getRequestMeta(req));
      this.setBrowserIdCookieIfMissing(req, res);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  sendVerificationCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: SendVerificationCodeDTO = req.body;
      const result = await this.authService.sendVerificationCode(data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  verifyEmailCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: VerifyEmailCodeDTO = req.body;
      const result = await this.authService.verifyEmailCode(data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: LoginDTO = req.body;
      const result = await this.authService.login(data, this.getRequestMeta(req));
      this.setBrowserIdCookieIfMissing(req, res);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader?.replace('Bearer ', '') || '';
      await this.authService.logout(token);
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  };

  heartbeat = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.header('Authorization');
      const token = authHeader?.replace('Bearer ', '') || '';
      await this.authService.refreshSession(token);
      res.json({ message: 'Session refreshed' });
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.userId!;
      const user = await this.authService.getProfile(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
}
