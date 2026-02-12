import { API_URL } from '@/config';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SendVerificationCodeData {
  email: string;
}

interface VerifyEmailCodeData {
  email: string;
  code: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    credits: number;
  };
}

interface ApiValidationError {
  msg?: string;
}

interface ApiErrorResponse {
  message?: string;
  errors?: ApiValidationError[];
}

const parseApiErrorMessage = async (response: Response, fallback: string): Promise<string> => {
  let payload: ApiErrorResponse | null = null;

  try {
    payload = await response.json();
  } catch {
    return fallback;
  }

  if (payload?.errors?.length && payload.errors[0]?.msg) {
    return payload.errors[0].msg;
  }

  return payload?.message || fallback;
};

export const authService = {
  async sendVerificationCode(data: SendVerificationCodeData): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/auth/send-verification-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const message = await parseApiErrorMessage(response, 'Failed to send verification code');
      throw new Error(message);
    }

    return response.json();
  },

  async verifyEmailCode(data: VerifyEmailCodeData): Promise<{ message: string; verified: boolean }> {
    const response = await fetch(`${API_URL}/auth/verify-email-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const message = await parseApiErrorMessage(response, 'Failed to verify email');
      throw new Error(message);
    }

    return response.json();
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const message = await parseApiErrorMessage(response, 'Registration failed');
      throw new Error(message);
    }

    const result = await response.json();
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    return result;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const message = await parseApiErrorMessage(response, 'Login failed');
      throw new Error(message);
    }

    const result = await response.json();
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    return result;
  },

  async getProfile() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  async logout() {
    const token = localStorage.getItem('token');
    // Call server to invalidate session
    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      } catch {
        // Best-effort; clear local state regardless
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async heartbeat() {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch(`${API_URL}/auth/heartbeat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch {
      // silent
    }
  },
};
