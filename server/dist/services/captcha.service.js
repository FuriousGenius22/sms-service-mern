import svgCaptcha from 'svg-captcha';
import { randomBytes } from 'crypto';
const captchaStore = new Map();
const CAPTCHA_TTL_MS = 5 * 60 * 1000; // 5 minutes
// Clean expired entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [id, session] of captchaStore.entries()) {
        if (now > session.expiresAt)
            captchaStore.delete(id);
    }
}, 60_000);
export class CaptchaService {
    generate() {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 4,
            color: true,
            background: '#0c1020',
            width: 280,
            height: 100,
            fontSize: 56,
            charPreset: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789',
        });
        const captchaId = randomBytes(24).toString('hex');
        captchaStore.set(captchaId, {
            text: captcha.text,
            expiresAt: Date.now() + CAPTCHA_TTL_MS,
        });
        return { captchaId, svg: captcha.data };
    }
    verify(captchaId, userInput) {
        const session = captchaStore.get(captchaId);
        if (!session)
            return false;
        // One-time use
        captchaStore.delete(captchaId);
        if (Date.now() > session.expiresAt)
            return false;
        // Case-insensitive comparison
        return session.text.toLowerCase() === userInput.trim().toLowerCase();
    }
}
//# sourceMappingURL=captcha.service.js.map