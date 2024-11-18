import axios from 'axios';
import { AuthApi } from './AuthApi/AuthApi';
import { DeviceApi } from './DeviceApi/DivecesApi';
import { DevicesGroupsApi } from './GroupsAPi/DevicesGroupsApi';


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})



export class UseApi {

  // Opçãoes de requisições para a rota de login
  authApi = AuthApi;

  // Opçoes de requisições para a rota de Dispositivos (Locks)
  devicesApi = DeviceApi


  // Opções de requisições para a rota de Grupos por Dispositivos
  devicesGroupsApi = DevicesGroupsApi

}