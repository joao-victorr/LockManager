import axios from "axios";

const axiosInstance = axios.create({
  timeout: 5000, // Aumente o tempo limite para 10 segundos, útil para APIs mais lentas
  validateStatus: (status) => {
    // Considere todas as respostas como válidas para tratamento manual
    return true;
  }
});


export const httpCodeError = (code: number) => {
  const httpCode: Record<string, string> = {
    "401": "User or password incorrect",
    "404": "Device not found",
    "408": "Request Timeout - The server took too long to respond",
    "500": `Internal Server Error`,
  };

  return httpCode[code] || "Unknown error occurred";
}




export default axiosInstance;