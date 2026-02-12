import { CaptchaService } from '../services/captcha.service.js';
const captchaService = new CaptchaService();
export class CaptchaController {
    generate = async (_req, res, next) => {
        try {
            const result = captchaService.generate();
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    };
    verify = async (req, res, next) => {
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
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=captcha.controller.js.map