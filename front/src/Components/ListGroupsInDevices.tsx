import type { Device } from "../Types/Device"



interface Props {
  props: {
    devices: Device
  }
}

export const ListGroupsInDevices = ({ props }: Props) => {

  const devices = props.devices

  return(
    <article
      key={devices.id}
      data-unit-id={devices.id}
      className=" flex flex-col gap-2 border-black border-0"
    >
      <span className=" bg-green-300 p-2 rounded-md flex justify-center items-center">
        <span>{devices.name}</span>
      </span>
      <ul className=" h-full flex flex-col gap-1 pl-4">
        {devices.GroupsDevices.map((device) => (
          <li key={device.groups.id} className="bg-blue-500 flex gap-1 rounded-md p-2">
            <input
              type="checkbox"
              id={`device-${device.id}`}
              name={devices.id}
              data-dept-id={device.groups.id}
            />
            <label htmlFor={`device-${device.id}`}>{device.groups.name}</label>
          </li>
        ))}
      </ul>
    </article>


  )
}