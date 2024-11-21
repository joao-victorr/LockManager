
import { useCallback, useEffect, useState } from "react";
import type { Device } from "../Types/Device";
import { UseApi } from "../hooks/useApi";




const deviceApi = new UseApi().devicesApi;

export const Devices = () => {
 

  const [deviceName, setDeviceName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [deviceUser, setDeviceUser] = useState("");
  const [devicePassword, setDevicePassword] = useState("");
  const [deviceStatus, setDeviceStatus] = useState(false);
  
  const [allDevices, setAllDevices] = useState<Device[]>([]);


  const sendForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: deviceName,
      ip: ipAddress,
      user: deviceUser,
      password: devicePassword,
      status: deviceStatus
    }
    if (!data.name || !data.ip || !data.user || !data.password || !data.status ) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    const res = await deviceApi.postDevice(data);

    if (res) {
      console.log("Dispositivo cadastrado com sucesso")
      setDeviceName("");
      setIpAddress("");
      setDeviceUser("");
      setDevicePassword("");
      setDeviceStatus(false);
      getAllDevice();      
    }

  }


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const getAllDevice = useCallback(async () => {
    const data = await deviceApi.getDevices();
    setAllDevices(data);
  }, [deviceApi]);

  const listDevices = (data: Array<Device>) => {
    return data.map((device) => {
      return (
        <tr key={device.id} className="border-b border-gray-300">
          <td className="border-r border-gray-300 p-2">{device.name}</td>
          <td className="border-r border-gray-300 p-2">{device.ip}</td>
          <td className="border-r border-gray-300 p-2">{device.users}</td>
          <td className="border-r border-gray-300 p-2">{device.password}</td>
          <td className="border-r border-gray-300 p-2">{device.UsersDevices.length}</td>
          <td className="border-r border-gray-300 p-2">{device.GroupsDevices.length}</td>
          <td className="border-r border-gray-300">{device.status ? "Ativo" : "Inativo"}</td>
          <td className="p-2"><button type="button">Editar</button></td>
        </tr>
      )
    })
  }

  useEffect(() => {
    getAllDevice()

  }, [getAllDevice])


return(
<div>
   <aside>
    <h1 >Dispositivos</h1>
    <form onSubmit={sendForm}>
      <input
        type="text"
        placeholder="Nome do dispositivo"
        value={deviceName}
        onChange={(event) => {setDeviceName(event.target.value);}}
      />
      <input
        type="text"
        placeholder="IPAddress do dispositivo"
        value={ipAddress}
        onChange={(event) => {setIpAddress(event.target.value);}}
      />
      <input
        type="text"
        placeholder="Usuario do dispositivo"
        value={deviceUser}
        onChange={(event) => {setDeviceUser(event.target.value);}}
      />
      <input
        type="password"
        placeholder="Senha do dispositivo"
        value={devicePassword}
        onChange={(event) => {setDevicePassword(event.target.value);}}
      />
      <label className="flex items-center gap-2">
        <span>Status:</span>
        <input
          type="checkbox"
          checked={deviceStatus}
          onChange={(event) => setDeviceStatus(event.target.checked)}
        />
        <span>{deviceStatus ? "Ativo" : "Inativo"}</span>
      </label>

      <button type="submit">Adicionar</button>
    </form>
   </aside>

   <hr />

   <main>
    <h2>Dispositivos</h2>


    {allDevices.length > 0 ? <table className="bg-slate-500 w-full">
        <thead className=" bg-teal-400 border border-gray-300 p-4">
          <tr className="border-b border-gray-300">
            <th className="border-r border-gray-300 p-2 w-1/5">Nome</th>
            <th className="border-r border-gray-300 p-2 w-1/12">IPAddress</th>
            <th className="border-r border-gray-300 p-2 w-1/5">Usuario</th>
            <th className="border-r border-gray-300 p-2 w-1/5">Senha</th>
            <th className="border-r border-gray-300 p-2 w-1/12">N° Cadastros</th>
            <th className="border-r border-gray-300 p-2 w-1/12">N° Departamentos</th>
            <th className="border-r border-gray-300 p-2 w-1/12">Status</th>
            <th className="p-2 w-1/12">Ação</th>
          </tr>
        </thead>
        <tbody className="p-4 border border-gray-300">
        {listDevices(allDevices)}
        </tbody>

      </table>
    : "Sem dispositivos cadastrados"}
    
   </main>

  <div>

  </div>

</div>
)
}