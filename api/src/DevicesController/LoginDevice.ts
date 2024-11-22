import axios from "axios";

// Interfaces para as respostas da API
interface SessionResponse {
  session: string;
}

interface SessionValidityResponse {
  session_is_valid: boolean;
}

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
  private async post<T>(endpoint: string, data?: object): Promise<T | null> {
    try {
      const res = await axios.post<T>(`${this.baseUrl}${endpoint}`, data);
      return res.data;
    } catch (error) {
      console.error(`Erro ao acessar ${endpoint}:`, error);
      return null;
    }
  }

  // Método para autenticar o token
  async authenticateToken(token: string): Promise<boolean> {
    const data = await this.post<SessionValidityResponse>(
      `/session_is_valid.fcgi?session=${token}`
    );
    return data?.session_is_valid || false;
  }

  // Método para login
  async login(): Promise<{ success: boolean; session?: string; error?: string }> {
    if (!this.username || !this.password) {
      return { success: false, error: "Username e senha são obrigatórios." };
    }

    const data = await this.post<SessionResponse>("/login.fcgi", {
      username: this.username,
      password: this.password,
    });

    if (!data) {
        return { success: false, error: "Erro ao realizar o login." };
    }

    return { success: true, session: data.session };
  }

  // Método para logout
  async logout(token: string): Promise<{ success: boolean; error?: string }> {
    if (!token) {
      return { success: false, error: "Token é obrigatório para logout." };
    }

    const success = await this.post<{ success: boolean }>(
      `/logout.fcgi?session=${token}`
    );

    if (!success) {
        return { success: false, error: "Erro ao realizar o logout." };
    }

    return { success: true };
  }
}
