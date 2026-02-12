import { Router } from 'express';
import authRoutes from './auth.routes.js';
import captchaRoutes from './captcha.routes.js';
const router = Router();
router.use('/auth', authRoutes);
router.use('/captcha', captchaRoutes);
// Health check
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
export default router;
//# sourceMappingURL=index.js.map