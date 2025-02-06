import { type ReactNode, useState } from "react";
import { Btn } from "../../Components/Buttons/Btn";
import { Modal } from "../../Components/Modal/Modal";


type Data = Array<{
  id: string
  name: string
  startDate: string;
  endDate: string;
  daysOfWeek: Array<boolean>;
}>



type Props = {
  props: {
    data?: Data
  };
  children?: ReactNode;
}



export const AccessTable = ({ props }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = props.data;



  return (
    <table className="relative w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="p-2 border border-gray-300">
                      <input type="checkbox" className="w-4 h-4" />
                  </th>
                  <th className="p-2 border border-gray-300">Nome</th>
                  <th className="p-2 border border-gray-300">inicio</th>
                  <th className="p-2 border border-gray-300">Fim</th>
                  <th className="p-2 border border-gray-300">Domingo</th>
                  <th className="p-2 border border-gray-300">Segunda</th>
                  <th className="p-2 border border-gray-300">Terça</th>
                  <th className="p-2 border border-gray-300">Quarta</th>
                  <th className="p-2 border border-gray-300">Quinta</th>
                  <th className="p-2 border border-gray-300">Sexta</th>
                  <th className="p-2 border border-gray-300">Sabado</th>
                  <th className="p-2 border border-gray-300">Editar</th>
                </tr>
            </thead>
            <tbody className="overflow-y-scroll">
                {data ? (data.map((item) => {
                  return(
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="p-2 border border-gray-300 text-center">
                          <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="p-2 border border-gray-300 text-center">
                          {item.name}
                      </td>
                      <td className="p-2 border border-gray-300 truncate">
                          {item.startDate}
                      </td>
                      <td className="p-2 border border-gray-300 text-center">
                          {item.endDate}
                      </td>
                      {item.daysOfWeek.map((day) => {
                        return (
                          <td key={1} className={`p-2 border border-gray-300 text-center ${day? 'text-green-500' : 'text-red-400'}`}>
                            {day? 'V' : 'X'}
                          </td>
                        )
                      })}
                      <td className="p-2 border border-gray-300 text-center">
                          <Btn 
                              props={{text:"Adicionar", type: "button", onClick: () => setIsModalOpen(true) }}
                          />
                      </td>
                    </tr>
                  )
                })) : (
                  <tr>
                    <td colSpan={12} className="text-center text-gray-500">Nenhum horário cadastrado</td>
                  </tr>
                )}
            </tbody>

            {isModalOpen && (
              <Modal  props={{ title: "HORARIO", onClickCanceled: () => setIsModalOpen(false), onClickSaved: () => {} }}>
                
              </Modal>
            )}
        </table>
  )
}