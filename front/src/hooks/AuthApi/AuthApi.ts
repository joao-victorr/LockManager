
import type { LoginData, LoginRes, User } from '../../Types/User';
import { api } from '../useApi';



export const AuthApi = {

  validateToken: async (token: string) => {
    const res = await api.get('/token', {
      params: { token }
    })

    return res.data as User;    
  },

  login: async (data: LoginData): Promise<LoginRes> => {

    const res = await api.post('/login', {
      Headers: 'Content-Type/application/json',
      email: data.email,
      password: data.password,
    })

    return res.data as LoginRes;
    
  },

  logout: () => api.post('/logout'),
}