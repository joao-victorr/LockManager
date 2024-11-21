
import axios, { type AxiosResponse } from 'axios';

import { ApiError, BadResquestError } from '../../helpers/apiErrors';
import type { AccessRules, DataDeviceCode } from '../../helpers/types';
import { allDevicesSessions } from "../LoginDevice";

//Function to create Devices for access rules
export async function createAccessRulesDevices(data: Array<AccessRules>) {
  const allGroupCodesDevices : Array<DataDeviceCode> = [];

  if(data.length === 0) {
    throw new BadResquestError("Unit is empty")
  }

  //Definition of access_rules data for registered
  const dataAccessRules = data.map(e => {
    //Association of the Device ID with the corresponding session
    const devicesData = allDevicesSessions.find(devices => devices.id === e.id);
    if(!devicesData) {
      throw new ApiError("Error ao relacionar unidades enviadas com unidades existentes.", 500)
    };

    const dataAccessRules = {
      id: e.id,
      ip: devicesData.ip,
      session: devicesData.session,
      groupsDevices: e.GroupsDevices[0].code,
      timeZonesDevices: e.TimeZonesDevices[0].code
    }

    return dataAccessRules;
  })
  
  //Access_rules registration in each Device
  for(const accessRules of dataAccessRules) {
    const url = `http://${accessRules.ip}/create_objects.fcgi?session=${accessRules.session}`;

    //Request create object Access_rules
    const newAccessRules: AxiosResponse = await axios.post(
        url,
        {
            object: "access_rules",
            values: [{ 
              "name": `(Regra de Acesso automaticamente criada para o Grupo ${accessRules.groupsDevices})`,
              "type": 1,
              "priority": 0
            }]
        },
        {
            headers: {
                "content-type": "application/json"
            }
        }
    )
    const resAccessRules = newAccessRules.data

    //Request to create a Group association object in Access_Rules
    const newGroupAccessRules: AxiosResponse = await axios.post(
      url,
      {
          object: "group_access_rules",
          values: [{ 
            "group_id": accessRules.groupsDevices,
            "access_rule_id": resAccessRules.ids[0]
          }]
      },
      {
          headers: {
              "content-type": "application/json"
          }
      }
    )
    const resGroupAccessRules = newGroupAccessRules.data

    ////Request to create a TimeZones association object in Access_Rules
    const resAccessRulesTimeZones: AxiosResponse = await axios.post(
      url,
      {
          object: "access_rule_time_zones",
          values: [{ 
            "access_rule_id": resAccessRules.ids[0],
            "time_zone_id": accessRules.timeZonesDevices
          }]
      },
      {
          headers: {
              "content-type": "application/json"
          }
      }
    )    
    const dataUnitCode = {id: accessRules.id, code: resAccessRules.ids[0]}
    allGroupCodesDevices.push(dataUnitCode);
  }

  return allGroupCodesDevices;
}