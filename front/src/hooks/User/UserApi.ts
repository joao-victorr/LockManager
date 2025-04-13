import type { z } from "zod";
import { UserSchema } from "../../Types/User";
import { api } from "../useApi";

type User = z.infer<typeof UserSchema>;

type ReqSuccess<T> = {
  success: true;
  data: T;
};

type ReqError = {
  success: false;
  error: {
    message: string;
    statusCode?: number;
  };
};

export const UserApi = {
  getUser: async (): Promise<ReqSuccess<User[]> | ReqError> => {
    const token = localStorage.getItem("token");

    try {
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Se quiser validar com o schema, pode fazer:
      const parsed = UserSchema.array().safeParse(res.data);

      if (!parsed.success) {
        return {
          success: false,
          error: {
            message: "Dados inválidos",
          },
        };
      }

      return {
        success: true,
        data: parsed.data,
      };
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string }, status?: number } };
    
        return {
          success: false,
          error: {
            message: err.response?.data?.message || "Erro desconhecido",
            statusCode: err.response?.status,
          },
        };
      }
    
      return {
        success: false,
        error: {
          message: "Erro inesperado",
        },
      };
    }
  },

  getUserImage: async (imageName: string): Promise<ReqSuccess<string> | ReqError> => {
    const token = localStorage.getItem("token");
  
    try {
      const res = await api.get(`/users/image?name=${imageName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // <--- ESSENCIAL
      });
  
      const imageUrl = URL.createObjectURL(res.data as Blob);
  
      return {
        success: true,
        data: imageUrl, // você pode usar isso em um <img src={data} />
      };
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string }, status?: number } };
  
        return {
          success: false,
          error: {
            message: err.response?.data?.message || "Erro desconhecido",
            statusCode: err.response?.status,
          },
        };
      }
  
      return {
        success: false,
        error: {
          message: "Erro inesperado",
        },
      };
    }
  }
  
};
