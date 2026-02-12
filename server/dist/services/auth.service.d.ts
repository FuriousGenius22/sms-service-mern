import { RegisterDTO, LoginDTO, AuthResponse, SendVerificationCodeDTO, VerifyEmailCodeDTO } from '../types/index.js';
export declare class AuthService {
    private emailVerificationStore;
    private verificationTtlMs;
    private generateToken;
    private normalizeEmail;
    private generateVerificationCode;
    private getUserCredits;
    private buildVerificationEmailHtml;
    private sendVerificationEmail;
    sendVerificationCode(data: SendVerificationCodeDTO): Promise<{
        message: string;
    }>;
    verifyEmailCode(data: VerifyEmailCodeDTO): Promise<{
        message: string;
        verified: boolean;
    }>;
    private createSession;
    refreshSession(token: string): Promise<void>;
    register(data: RegisterDTO, meta: {
        ipAddress: string;
        userAgent: string;
        browserId: string;
    }): Promise<AuthResponse>;
    login(data: LoginDTO, meta: {
        ipAddress: string;
        userAgent: string;
        browserId: string;
    }): Promise<AuthResponse>;
    logout(token: string): Promise<void>;
    getProfile(userId: string): Promise<{
        credits: number;
        _id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        comparePassword: (candidatePassword: string) => Promise<boolean>;
        __v: number;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map