import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validator.middleware.js';
import {
  registerValidator,
  loginValidator,
  sendVerificationCodeValidator,
  verifyEmailCodeValidator,
} from '../validators/auth.validator.js';

const router = Router();
const authController = new AuthController();

// Public routes
router.post(
  '/send-verification-code',
  validate(sendVerificationCodeValidator),
  authController.sendVerificationCode
);
router.post(
  '/verify-email-code',
  validate(verifyEmailCodeValidator),
  authController.verifyEmailCode
);
router.post('/register', validate(registerValidator), authController.register);
router.post('/login', validate(loginValidator), authController.login);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.post('/heartbeat', authenticate, authController.heartbeat);
router.post('/logout', authenticate, authController.logout);

export default router;
