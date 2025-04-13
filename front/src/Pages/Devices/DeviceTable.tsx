import { useState } from "react";
import { Btn } from "../../Components/Buttons/Btn";
import { Table } from "../../Components/Table/Table";
import type { Device } from "../../Types/Device";


type Props = {
  props: {
    data: Array<Device>;
  };
}

export const DeviceTable = ({ props }: Props) => {
  const [isVisiblePassWordDevices, setIsVisiblePassWordDevices] = useState(false);

  const data = props.data

  const tableHeanders = [
    {
      content: <input type="checkbox" className="w-4 h-4" />
    },
    { content: "Nome" },
    { content: "IP Address" },
    { content: "Usuario" },
    { content: "Senha" },
    { content: "Status" },
    { content: "Editar" }
  ];


  const tableRows = data.map((device) => [
    {
      content: <input type="checkbox" className="w-4 h-4" />
    },
    { content: device.name },
    { content: device.ip },
    { content: device.user },
    { content: device.password },
    {
      content: (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            device.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {device.status ? "Ativo" : "Inativo"}
        </span>
      ),
    },
    {
      content: <Btn props={{ text: "Editar", type: "button", onClick: () => {} }} />
    }
  ])

// 

  return (

    <Table
      headers={tableHeanders}
      rows={tableRows}
    />

  //   <section>
  //   <table className="bg-slate-500 w-full">
  //     <thead className="bg-amber-600 text-white">
  //       <tr>
  //         <th className="p-2 border border-gray-300">
  //             <input type="checkbox" className="w-4 h-4" />
  //         </th>
  //         <th className="p-2 border border-gray-300">Nome</th>
  //         <th className="p-2 border border-gray-300">IP Address</th>
  //         <th className="p-2 border border-gray-300">Usuario</th>
  //         <th className="p-2 border border-gray-300">Senha</th>
  //         <th className="p-2 border border-gray-300">Status</th>
  //         <th className="p-2 border border-gray-300">Editar</th>
  //       </tr>
  //     </thead>
  //     <tbody className="overflow-y-scroll">
  //       {props.data.length !== 0 ? (
  //         props.data.map((device) => {
  //           return (
  //             <tr key={device.id}>
  //               <th className="p-2 border border-gray-300">
  //                   <input type="checkbox" className="w-4 h-4" />
  //               </th>
  //               <th className="p-2 border border-gray-300">{device.name}</th>
  //               <th className="p-2 border border-gray-300">{device.ip}</th>
  //               <th className="p-2 border border-gray-300">{device.user}</th>
  //               {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
  //               <th className="p-2 border border-gray-300" onClick={() => setIsVisiblePassWordDevices(!isVisiblePassWordDevices)}>{isVisiblePassWordDevices ? device.password : "******"}</th>
  //               <th className={`p-2 border border-gray-300 ${device.status ? "text-green-500" : "text-red-500"}`}>{device.status ? "Ativo" : "Inativo"}</th>
  //               <td className="p-2 border border-gray-300 text-center">
  //                 <Btn props={{ text: "Editar", type: "button", onClick: () => {} }} />
  //               </td>
  //             </tr>
  //           )
  //         })
  //       ) : (
  //         <tr>
  //           <td colSpan={7} className="text-center text-gray-500">
  //             Nenhum dispositivo cadastrado
  //           </td>
  //         </tr>
  //       )}
        
  //     </tbody>
  //   </table>
  // </section>
  )
}