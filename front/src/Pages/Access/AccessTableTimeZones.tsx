import type { ReactNode } from "react";
import { Btn } from "../../Components/Buttons/Btn";
import type { DayOfWeek, TimeZones } from "../../Types/AccessDayTimesSchema";
import { convertToTimeString } from "../../assets/script/convertTime";


type Props = {
  props: {
    data: Array<TimeZones>
    setIsModalOpen: (time: TimeZones) => void;
  };
  children?: ReactNode;
}



export const AccessTableTimeZones = ({ props, children }: Props) => {


  const data = props.data;

  return (
    <section>
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
              <th className="p-2 border border-gray-300">Feriado 1</th>
              <th className="p-2 border border-gray-300">Feriado 2</th>
              <th className="p-2 border border-gray-300">Feriado 3</th>
              <th className="p-2 border border-gray-300">Editar</th>
            </tr>
        </thead>
        <tbody className="overflow-y-scroll">
          { data.length > 0 ? (
              data.map((item) =>
                item.timeSpans.map((times, index) => (
                  <tr key={`${item.id}-${times.id}-${index}`} className="hover:bg-gray-100">
                    {index === 0 && (
                      <>
                        <td className="p-2 border border-gray-300 text-center" rowSpan={item.timeSpans.length}>
                          <input type="checkbox" className="w-4 h-4" />
                        </td>
                        <td className="p-2 border border-gray-300 text-center" rowSpan={item.timeSpans.length}>
                          {item.name}
                        </td>
                      </>
                    )}
                    <td className="p-2 border border-gray-300 text-center">{convertToTimeString(times.startHors)}</td>
                    <td className="p-2 border border-gray-300 text-center">{convertToTimeString(times.endHors)}</td>
                    {["sun", "mon", "tue", "wed", "thu", "fri", "sat", "hol1", "hol2", "hol3"].map((day) => (
                      <td
                        key={day}
                        className={`p-2 border border-gray-300 text-center ${
                          times[day as keyof DayOfWeek] ? "text-green-500" : "text-red-400"
                        }`}
                      >
                        {times[day as keyof DayOfWeek] ? "✔" : "✘"}
                      </td>
                    ))}
                    {index === 0 && (
                      <td className="p-2 border border-gray-300 text-center" rowSpan={item.timeSpans.length}>
                        <Btn props={{ text: "Editar", type: "button", onClick: () => props.setIsModalOpen(item) }} />
                      </td>
                    )}
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={12} className="text-center text-gray-500">
                  Nenhum horário cadastrado
                </td>
              </tr>
            )}
        </tbody>          
      </table>
      { children }
    </section>
  )
}