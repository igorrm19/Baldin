import api from './api';

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  cargo: string;
}

export interface RegisterResponse {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>(
      '/auth/register',
      payload,
    );
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', payload);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },
};
