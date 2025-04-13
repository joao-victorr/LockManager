
import type { LoginData, LoginRes, UserWeb } from '../../Types/Auth';
import { api } from '../useApi';



export const AuthApi = {

  validateToken: async (token: string) => {
    const res = await api.get('/token', {
      params: { token }
    })

    return res.data as UserWeb;    
  },

  login: async (data: LoginData): Promise<LoginRes> => {
    console.log(import.meta.env.VITE_API_BASE_URL)

    console.log(data)
    const res = await api.post('/login', {
      Headers: 'Content-Type/application/json',
      email: data.email,
      password: data.password,
    })

    console.log("res: ", res)

    return res.data as LoginRes;
    
  },

  logout: () => api.post('/logout'),
}