import axios from 'axios';
import { TimeZonesApi } from './Access/Access';
import { AuthApi } from './AuthApi/AuthApi';
import { DeviceApi } from './DeviceApi/DivecesApi';
import { DevicesGroupsApi } from './GroupsAPi/DevicesGroupsApi';
import { UserApi } from './User/UserApi';
import { UserGroupsApi } from './UserGroups/UserGroups';


export const api = axios.create({
  baseURL: "http://localhost:3000"
})





export class UseApi {

  // Opçãoes de requisições para a rota de login
  authApi = AuthApi;

  // Opçoes de requisições para a rota de Dispositivos
  devicesApi = DeviceApi;

  // Opçoes de requisições para a rota de usuarios
  userApi = UserApi;

  // Opções de requisições para a rota de Grupos por Dispositivos
  devicesGroupsApi = DevicesGroupsApi;


  userGroupsApi = UserGroupsApi;

  TimeZonesApi = TimeZonesApi;

}