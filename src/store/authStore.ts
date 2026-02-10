import { create } from 'zustand';
import { User } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  register: (email: string, password: string, name: string) => Promise<{ error: Error | null, user: User | null }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        const error = new Error(data.error || 'Login failed');
        return { error };
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_id', data.id.toString());

      const user: User = {
        id: data.id.toString(),
        email: data.email,
        name: data.name || '',
        avatar: '',
      };

      set({
        user,
        isAuthenticated: true,
        token: data.token,
        isLoading: false,
      });

      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Login failed') };
    }
  },

  signInWithGoogle: async () => {
    return { error: new Error('Google sign-in is not available with local authentication') };
  },

  register: async (email, password, name) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const data = await response.json();
        const error = new Error(data.error || 'Registration failed');
        return { error, user: null };
      }

      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_id', data.id.toString());

      const user: User = {
        id: data.id.toString(),
        email: data.email,
        name: data.name || '',
        avatar: '',
      };

      set({
        user,
        isAuthenticated: true,
        token: data.token,
        isLoading: false,
      });

      return { error: null, user };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error('Registration failed'), user: null };
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
      set({ user: null, isAuthenticated: false, token: null, isLoading: false });
    }
  },

  refreshSession: async () => {
    set({ isLoading: true });
    
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        set({ user: null, isAuthenticated: false, token: null, isLoading: false });
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          id: data.id.toString(),
          email: data.email,
          name: data.name || '',
          avatar: '',
        };

        set({
          user,
          isAuthenticated: true,
          token: data.token,
          isLoading: false,
        });
      } else {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
        set({ user: null, isAuthenticated: false, token: null, isLoading: false });
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      set({ user: null, isAuthenticated: false, token: null, isLoading: false });
    }
  },
}));
