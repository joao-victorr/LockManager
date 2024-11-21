import type { Device } from '../../Types/Device';
import { api } from '../useApi';


type DeviceApiResponse = {
  devices: Device[];
}

type Data = {
  name: string;
  ip: string;
  user: string;
  password: string;
  status: boolean;
}

export const DeviceApi = {

  getDevices: async (id?: string) => {
    const token = localStorage.getItem('token');

    if( id ) {
      const res = await api.get(`/device/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data as Promise<Array<Device>>;
    }

    const res = await api.get('/device', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = res.data as DeviceApiResponse;

    if (!Array.isArray(data.devices)) {
      console.error("Dados não encontrados")
      return []
    }    
    
    return data.devices
  },

  postDevice: async (data: Data) => {
    const token = localStorage.getItem('token');

    const res = await api.post('/device', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    if (res.status !== 201 ) {
      console.error("Não foi possível cadastrar o dispositivo")
      return false
    }

    return true

  }

}