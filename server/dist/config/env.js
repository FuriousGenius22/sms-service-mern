import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/sms-service',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-this-in-production',
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtExpiresIn: '7d',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpFrom: process.env.SMTP_FROM || 'no-reply@sms-service.local',
    appUrl: process.env.APP_URL || '',
};
//# sourceMappingURL=env.js.map