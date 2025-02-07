import type { ReactNode } from "react";
import { Btn } from "../../Components/Buttons/Btn";
import type { DayOfWeek, TimeSpans } from "../../Types/AccessDayTimesSchema";
import { convertToTimeString } from "../../assets/script/convertTime";


type Props = {
  props: {
    data: Array<TimeSpans>;
    setIsModalOpen: (time: TimeSpans) => void;
  };
  children?: ReactNode;
}



export const AccessTableTimeSpans = ({ props, children }: Props) => {


  const data = props.data;

  return (
    <table className="relative w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="p-2 border border-gray-300">
                      <input type="checkbox" className="w-4 h-4" />
                  </th>
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
              { data.length > 0 ? (
                  data.map((time, index) => (
                    <tr key={`${time.id}-${index}`} className="hover:bg-gray-100">
                      <td className="p-2 border border-gray-300 text-center">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="p-2 border border-gray-300 text-center">{convertToTimeString(time.startHors)}</td>
                      <td className="p-2 border border-gray-300 text-center">{convertToTimeString(time.endHors)}</td>
                      {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((day) => (
                        <td
                          key={day}
                          className={`p-2 border border-gray-300 text-center ${
                            time.daysOfWeek[day as keyof DayOfWeek] ? "text-green-500" : "text-red-400"
                          }`}
                        >
                          {time.daysOfWeek[day as keyof DayOfWeek] ? "✔" : "✘"}
                        </td>
                      ))}
                      <td className="p-2 border border-gray-300 text-center">
                        <Btn props={{ text: "Editar", type: "button", onClick: () => props.setIsModalOpen(time) }} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center text-gray-500">
                      Nenhum horário cadastrado
                    </td>
                  </tr>
                )}
            </tbody>

            { children }

        </table>
  )
}