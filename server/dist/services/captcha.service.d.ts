export declare class CaptchaService {
    generate(): {
        captchaId: string;
        svg: string;
    };
    verify(captchaId: string, userInput: string): boolean;
}
//# sourceMappingURL=captcha.service.d.ts.map