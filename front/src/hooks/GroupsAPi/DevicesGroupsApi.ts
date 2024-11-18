
import type { DevicesGroup } from '../../Types/DevicesGroups';
import { api } from '../useApi';


interface DevicesGroupRes {
  groupsLocks: Array<DevicesGroup>
}


export const DevicesGroupsApi = {
  

  getDevices: async () => {
    const token = localStorage.getItem('token');

    const res = await api.get('/devices_groups', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = res.data as DevicesGroupRes;

    if (!Array.isArray(data.groupsLocks)) {
      console.error("Dados não encontrados")
      return null;
    }    
    
    return data.groupsLocks
    
  }
}