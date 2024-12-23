import axios, { type AxiosResponse } from 'axios';

import { ApiError, BadResquestError } from '../../helpers/apiErrors';
import type { DataTimesDeviceCode, Times } from '../../helpers/types';
import { allDevicesSessions } from "../LoginDevice";

//Function to create Devices for Times_Zones and Times_Spans
export async function createTimesDevices(data: Times) {
  const allTimesCodesDevices : Array<DataTimesDeviceCode> = [];

  if(data.devices.length === 0) {
    throw new BadResquestError("Unit is empty")
  }

  //Definition of Times_Zones and Times_Spans data for registered
  const times = data.devices.map(e => {
    //Association of the Device ID with the corresponding session
    const unitData = allDevicesSessions.find(unit => unit.id === e.id);
    if(!unitData) {
        throw new ApiError("Error ao relacionar unidades enviadas com unidades existentes.", 500)
    };

    const time = {
      id: e.id,
      name: data.name,
      ip: unitData.ip,
      session: unitData.session,
      timesSpans: data.timesSpans
    }

    return time;
  })

  //Usser_Group registration in each Device
  for(const time of times) {
    const url = `http://${time.ip}/create_objects.fcgi?session=${time.session}`;

    //Request of create time_zones
    const newZones: AxiosResponse = await axios.post(
      url,
      {
          object: "time_zones",
          values: [{ name: time.name }]
      },
      {
          headers: {
              "content-type": "application/json"
          }
      }
    )
    const dataZones = newZones.data;

    //Request of create time_spans
    const newSpans: AxiosResponse = await axios.post(
      url,
      {
          object: "time_spans",
          values: [{
            time_zone_id: dataZones.ids[0],
            start: time.timesSpans.start,
            end: time.timesSpans.end,
            sun: time.timesSpans.sun,
            mon: time.timesSpans.mon,
            tue: time.timesSpans.tue,
            wed: time.timesSpans.wed,
            thu: time.timesSpans.thu,
            fri: time.timesSpans.fri,
            sat: time.timesSpans.sat,
            hol1: time.timesSpans.hol1,
            hol2: time.timesSpans.hol2,
            hol3: time.timesSpans.hol3
          }]
      },
      {
          headers: {
              "content-type": "application/json"
          }
      }
    )
    const dataSpans = newSpans.data;
    const dataUnitCode = {id: time.id, codeZones: dataZones.ids[0], codeSpans: dataSpans.ids[0]}
    allTimesCodesDevices.push(dataUnitCode);
  }

  return allTimesCodesDevices;
}