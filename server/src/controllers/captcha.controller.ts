import { Request, Response, NextFunction } from 'express';
import { CaptchaService } from '../services/captcha.service.js';

const captchaService = new CaptchaService();

export class CaptchaController {
  generate = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = captchaService.generate();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  verify = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { captchaId, captchaText } = req.body;
      if (!captchaId || !captchaText) {
        res.status(400).json({ status: 'error', message: 'captchaId and captchaText are required' });
        return;
      }

      const valid = captchaService.verify(captchaId, captchaText);
      if (!valid) {
        res.status(400).json({ status: 'error', message: 'Invalid or expired CAPTCHA. Please try again.', verified: false });
        return;
      }

      res.json({ message: 'CAPTCHA verified', verified: true });
    } catch (error) {
      next(error);
    }
  };
}
