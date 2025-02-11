import { useState } from "react";
// import { Btn } from "../../Components/Buttons/Btn";
import { Inp } from "../../Components/Inputs/Inp";

const DeviceForm = () => {
  const [deviceName, setDeviceName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [deviceUser, setDeviceUser] = useState("");
  const [devicePassword, setDevicePassword] = useState("");
  const [deviceStatus, setDeviceStatus] = useState(false);

  const sendForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ deviceName, ipAddress, deviceUser, devicePassword, deviceStatus });
  };

  return (
    <aside className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
      <form onSubmit={sendForm} className="space-y-4">
        <Inp props={{
          type: "text",
          placeholder: "Nome do dispositivo",
          value: deviceName,
          onChange: setDeviceName,
          label: "Nome do Dispositivo"
        }} />

        <Inp props={{
          type: "text",
          placeholder: "IP Address do dispositivo",
          value: ipAddress,
          onChange: setIpAddress,
          label: "IP Address"
        }} />

        <Inp props={{
          type: "text",
          placeholder: "Usuário do dispositivo",
          value: deviceUser,
          onChange: setDeviceUser,
          label: "Usuário"
        }} />

        <Inp props={{
          type: "password",
          placeholder: "Senha do dispositivo",
          value: devicePassword,
          onChange: setDevicePassword,
          label: "Senha"
        }} />

        <label className="flex items-center gap-2 text-gray-700">
          <span>Status:</span>
          <input
            type="checkbox"
            checked={deviceStatus}
            onChange={(event) => setDeviceStatus(event.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className={deviceStatus ? "text-green-600" : "text-red-600"}>{deviceStatus ? "Ativo" : "Inativo"}</span>
        </label>
      </form>
    </aside>
  );
};

export default DeviceForm;
