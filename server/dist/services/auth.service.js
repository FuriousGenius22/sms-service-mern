import jwt from 'jsonwebtoken';
import { randomInt } from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/User.model.js';
import Credit from '../models/Credit.model.js';
import ActiveSession from '../models/ActiveSession.model.js';
import { config } from '../config/env.js';
import { AppError } from '../middleware/errorHandler.middleware.js';
const SESSION_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours
export class AuthService {
    emailVerificationStore = new Map();
    verificationTtlMs = 10 * 60 * 1000;
    generateToken(userId) {
        return jwt.sign({ userId }, config.jwtSecret, {
            expiresIn: '3h',
        });
    }
    normalizeEmail(email) {
        return email.trim().toLowerCase();
    }
    generateVerificationCode() {
        return String(randomInt(0, 1_000_000)).padStart(6, '0');
    }
    async getUserCredits(userId) {
        const credit = await Credit.findOne({ userId });
        return credit?.balance ?? 0;
    }
    // ── Email template ───────────────────────────────────────
    buildVerificationEmailHtml(code) {
        const logoUrl = config.appUrl
            ? `${config.appUrl}/logo/icon_colorful.png`
            : 'https://via.placeholder.com/48x48/4f46e5/ffffff?text=T';
        return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:48px 16px;">
    <tr><td align="center">
      <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
        <tr><td style="text-align:center;padding-bottom:32px;">
          <img src="${logoUrl}" alt="TrustSMS" width="48" height="48" style="display:inline-block;border-radius:12px;" />
        </td></tr>
        <tr><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.06);overflow:hidden;">
            <tr><td style="height:6px;background:linear-gradient(90deg,#6366f1,#a855f7,#ec4899);"></td></tr>
            <tr><td style="padding:40px 36px;">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;text-align:center;line-height:1.3;">Verify your email</h1>
              <p style="margin:0 0 32px;font-size:15px;color:#6b7280;text-align:center;line-height:1.6;">Use the code below to complete your registration.<br/>This code expires in <strong style="color:#4f46e5;">10 minutes</strong>.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td align="center">
                  <div style="display:inline-block;background-color:#f8fafc;border:2px dashed #e2e8f0;border-radius:12px;padding:20px 40px;">
                    <div style="font-size:36px;font-weight:800;font-family:'Menlo','Courier New',monospace;color:#1e1b4b;letter-spacing:8px;line-height:1;user-select:all;-webkit-user-select:all;-moz-user-select:all;">${code}</div>
                  </div>
                </td></tr>
              </table>
              <p style="margin:20px 0 0;font-size:13px;color:#9ca3af;text-align:center;">Click the code to select it, then copy &amp; paste into the app.</p>
            </td></tr>
            <tr><td style="padding:0 36px;"><div style="height:1px;background-color:#f1f5f9;"></div></td></tr>
            <tr><td style="padding:24px 36px;">
              <p style="margin:0;font-size:13px;color:#9ca3af;text-align:center;line-height:1.5;">If you didn&rsquo;t create an account, you can safely ignore this email.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:28px 0 0;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">&copy; ${new Date().getFullYear()} TrustSMS. All rights reserved.</p>
          <p style="margin:0;font-size:11px;color:#c9cdd5;">Secure SMS Verification Platform</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
    }
    async sendVerificationEmail(email, code) {
        const canSendWithSmtp = Boolean(config.smtpHost) &&
            Boolean(config.smtpUser) &&
            Boolean(config.smtpPass);
        if (!canSendWithSmtp) {
            console.log(`[DEV] Email verification code for ${email}: ${code}`);
            return;
        }
        const transporter = nodemailer.createTransport({
            host: config.smtpHost,
            port: config.smtpPort,
            secure: config.smtpPort === 465,
            auth: { user: config.smtpUser, pass: config.smtpPass },
        });
        await transporter.sendMail({
            from: `"TrustSMS" <${config.smtpFrom}>`,
            to: email,
            subject: 'Your verification code is ' + code,
            text: `Your TrustSMS verification code is ${code}. It expires in 10 minutes. If you didn't request this, please ignore this email.`,
            html: this.buildVerificationEmailHtml(code),
        });
    }
    // ── Email verification ───────────────────────────────────
    async sendVerificationCode(data) {
        const email = this.normalizeEmail(data.email);
        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new AppError(400, 'Email is already registered');
        const code = this.generateVerificationCode();
        this.emailVerificationStore.set(email, {
            code,
            expiresAt: Date.now() + this.verificationTtlMs,
            verified: false,
        });
        await this.sendVerificationEmail(email, code);
        return { message: 'Verification code sent successfully' };
    }
    async verifyEmailCode(data) {
        const email = this.normalizeEmail(data.email);
        const state = this.emailVerificationStore.get(email);
        if (!state)
            throw new AppError(400, 'Please request a verification code first');
        if (Date.now() > state.expiresAt) {
            this.emailVerificationStore.delete(email);
            throw new AppError(400, 'Verification code has expired. Please request a new code');
        }
        if (state.code !== data.code.trim())
            throw new AppError(400, 'Invalid verification code');
        this.emailVerificationStore.set(email, { ...state, verified: true });
        return { message: 'Email verified successfully', verified: true };
    }
    // ── Session management ───────────────────────────────────
    async createSession(userId, token, meta) {
        const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
        await ActiveSession.create({
            userId,
            token,
            browserId: meta.browserId || '',
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            expiresAt,
        });
    }
    async refreshSession(token) {
        const newExpiry = new Date(Date.now() + SESSION_TTL_MS);
        await ActiveSession.updateOne({ token }, { lastActiveAt: new Date(), expiresAt: newExpiry });
    }
    // ── Register ─────────────────────────────────────────────
    async register(data, meta) {
        const email = this.normalizeEmail(data.email);
        const verificationState = this.emailVerificationStore.get(email);
        if (!verificationState || !verificationState.verified) {
            throw new AppError(400, 'Please verify your email before creating an account');
        }
        if (Date.now() > verificationState.expiresAt) {
            this.emailVerificationStore.delete(email);
            throw new AppError(400, 'Email verification expired. Please verify again');
        }
        const existingUser = await User.findOne({ email });
        if (existingUser)
            throw new AppError(400, 'User already exists');
        // Create user
        const user = await User.create({ ...data, email });
        // Create credit record with 0 balance
        await Credit.create({ userId: user._id, balance: 0 });
        const token = this.generateToken(user._id.toString());
        this.emailVerificationStore.delete(email);
        await this.createSession(user._id.toString(), token, meta);
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                credits: 0,
            },
        };
    }
    // ── Login ────────────────────────────────────────────────
    async login(data, meta) {
        const user = await User.findOne({ email: data.email });
        if (!user)
            throw new AppError(401, 'Invalid credentials');
        const isMatch = await user.comparePassword(data.password);
        if (!isMatch)
            throw new AppError(401, 'Invalid credentials');
        // Block only if there is an active session from a *different* browser (cookie)
        const existingSession = await ActiveSession.findOne({
            userId: user._id,
            expiresAt: { $gt: new Date() },
        });
        const incomingBrowserId = (meta.browserId || '').trim();
        if (existingSession?.browserId && incomingBrowserId && existingSession.browserId !== incomingBrowserId) {
            throw new AppError(403, 'Suspicious login detected. Your account is already active in another browser or device. Please log out there first or wait for the session to expire.');
        }
        const token = this.generateToken(user._id.toString());
        await this.createSession(user._id.toString(), token, meta);
        const credits = await this.getUserCredits(user._id.toString());
        return {
            token,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                credits,
            },
        };
    }
    // ── Logout ───────────────────────────────────────────────
    async logout(token) {
        await ActiveSession.deleteOne({ token });
    }
    // ── Profile ──────────────────────────────────────────────
    async getProfile(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user)
            throw new AppError(404, 'User not found');
        const credits = await this.getUserCredits(userId);
        return { ...user.toJSON(), credits };
    }
}
//# sourceMappingURL=auth.service.js.map