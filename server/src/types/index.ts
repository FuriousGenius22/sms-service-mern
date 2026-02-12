export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface SendVerificationCodeDTO {
  email: string;
}

export interface VerifyEmailCodeDTO {
  email: string;
  code: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    credits: number;
  };
}

export interface ApiError {
  message: string;
  errors?: any[];
}
