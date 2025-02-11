import type { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../helpers/AxiosInstance";
// import { ApiError } from "../helpers/apiErrors";


// Classe AuthDevice
export class AuthDevice {
  ip: string;
  username: string;
  password: string;
  private baseUrl: string;

  constructor(ip: string, username: string, password: string) {
    this.ip = ip;
    this.username = username;
    this.password = password;
    this.baseUrl = `http://${this.ip}`;
  }

  // Wrapper para chamadas POST com tratamento de erros centralizado
  private async post(endpoint: string, data?: object): Promise<AxiosResponse | null> {
    try {
      return await axiosInstance.post(`${this.baseUrl}${endpoint}`, data);
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        return null; // Retorna `null` no caso de timeout
      }
      throw error; // Relança outros erros
    }
  }

  // Método para autenticar o token
  async authenticateToken(token: string): Promise<boolean> {
    const response = await this.post(`/session_is_valid.fcgi?session=${token}`);
    if (!response) {
      return false;
    }
  
    return response.data.session_is_valid || false;
  }

  // Método para login
  async login(): Promise<{ session: string | null; code: number }> {
    const data = await this.post("/login.fcgi", {
      login: this.username,
      password: this.password,
    });
  
    if (!data) {
      return { session: null, code: 408 }; // Código HTTP 408 para indicar timeout
    }
  
    return { session: data.data.session, code: data.status };
  }

  // Método para logout
  async logout(token: string): Promise<{ success: boolean; error?: string }> {
    if (!token) {
      return { success: false, error: "Token é obrigatório para logout." };
    }
  
    const data = await this.post(`/logout.fcgi?session=${token}`);
  
    if (!data) {
      return { success: false, error: "Timeout ao tentar realizar o logout." };
    }
  
    return { success: data.statusText.toLowerCase() === "ok" };
  }
  
}
