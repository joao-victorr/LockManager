import type { NewTimeZones, TimeSpans, TimeZones } from '../../Types/AccessDayTimesSchema';
import type { DeviceBasicInfo } from '../../Types/Device';
import { api } from '../useApi';


type SimpleTimeZones = Pick<TimeZones, 'id' | 'name'>;

type PostAndUpdateTimeZonesReturn = {
  status: boolean;
  code: number;
  message?: string;
}


export type DatatimeZones = {
  id: number,
  name: string,
  timeZonesDevices: Array<{
    id: number,
    idDevices: string,
    idTimeZones: number,
    devices: DeviceBasicInfo
  }>,
  timeSpans: Array<TimeSpans>,
};



export const TimeZonesApi = {

  getTimeZones: async (timeZone?: SimpleTimeZones): Promise<Array<TimeZones> | null> => {
    
    if(timeZone) {

      return null
    }

    const res = await api.get("/times", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = res.data as Array<DatatimeZones>

    const transformedData = data.map((timezone) => ({
      id: timezone.id,
      name: timezone.name,
      devices: timezone.timeZonesDevices.map((tzDevice) => tzDevice.devices),
      timeSpans: timezone.timeSpans,
    }));

    console.log(transformedData)
    

    return transformedData;

    
  },

  postTimeZones: async (newTimeZones: NewTimeZones): Promise<PostAndUpdateTimeZonesReturn> => {

    const res = await api.post("/times", newTimeZones,  {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })

    console.log("Json que voltou", res.data)

    return {status: true, code: 201, message:"Cadastrado com sucesso"} 
  },


  updateTimeZones: async (timeZones: TimeZones): Promise<PostAndUpdateTimeZonesReturn> => {
    
    console.log(timeZones)

    return {status: true, code: 201, message:"Horario atualizado com sucesso"} 
  }

}

