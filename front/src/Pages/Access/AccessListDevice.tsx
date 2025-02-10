import { useEffect, useState } from "react"
import type { Device, DeviceBasicInfo } from "../../Types/Device"
import { UseApi } from "../../hooks/useApi"




type Props = {
  props: {
    selectDevices: Array<DeviceBasicInfo>
    handleSelectDevice: (device: DeviceBasicInfo) => void
  }
}


const deviceApi = new UseApi().devicesApi;


export const AccessListDevice = ({ props }: Props) => {
  const [dataDevice, setDataDevice] = useState<DeviceBasicInfo[]>([]);


  useEffect(() => {
    const getDataDevice = async () => {
      const res: Device[] = await deviceApi.getDevices();
  
      setDataDevice(res);
    }
    getDataDevice();
  }, [])


  return (
    <section className="flex flex-row gap-4 overflow-x-auto">
      {dataDevice.map((device: DeviceBasicInfo) => {
        const isChecked = props.selectDevices.some((item) => device.id === item.id);

        const isOnline = device.status === true;

        return (
          <label
            key={device.id}
            className={`p-3 my-2 border rounded-lg cursor-pointer transition-colors duration-200 ${
              isOnline ? (
                isChecked
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
              ) : "disabled: bg-red-500 text-white" 
            }`}
          >
            <span className="whitespace-nowrap">{device.name}</span>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => props.handleSelectDevice(device)}
              className="hidden"
            />
          </label>
        );
      })}
    </section>
  )
}




