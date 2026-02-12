import { Router } from 'express';
import { CaptchaController } from '../controllers/captcha.controller.js';

const router = Router();
const captchaController = new CaptchaController();

router.get('/generate', captchaController.generate);
router.post('/verify', captchaController.verify);

export default router;
