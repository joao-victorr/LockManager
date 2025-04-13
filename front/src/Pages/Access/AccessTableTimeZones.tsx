import type { ReactNode } from "react";
import { convertToTimeString } from "../../../public/assets/script/convertTime";
import { Btn } from "../../Components/Buttons/Btn";
import { Table } from "../../Components/Table/Table"; // ajuste o caminho se necessário
import type { DayOfWeek, TimeZones } from "../../Types/AccessDayTimesSchema";

type Props = {
  props: {
    data: Array<TimeZones>;
    setIsModalOpen: (time: TimeZones) => void;
  };
  children?: ReactNode;
};

export const AccessTableTimeZones = ({ props, children }: Props) => {
  const { data, setIsModalOpen } = props;

  const renderBool = (val: boolean) => (val ? "✔" : "✘");
  const boolClass = (val: boolean) => (val ? "text-green-500" : "text-red-400");

  const headers = [
    { content: <input type="checkbox" className="w-4 h-4" /> },
    { content: "Nome" },
    { content: "Início" },
    { content: "Fim" },
    { content: "Domingo" },
    { content: "Segunda" },
    { content: "Terça" },
    { content: "Quarta" },
    { content: "Quinta" },
    { content: "Sexta" },
    { content: "Sábado" },
    { content: "Feriado 1" },
    { content: "Feriado 2" },
    { content: "Feriado 3" },
    { content: "Editar" },
  ];

  const rows = data.flatMap((item) =>
    item.timeSpans.map((times, index) => {
      const bools = ["sun", "mon", "tue", "wed", "thu", "fri", "sat", "hol1", "hol2", "hol3"];

      const cells = [];

      if (index === 0) {
        cells.push(
          {
            content: <input type="checkbox" className="w-4 h-4" />,
            rowSpan: item.timeSpans.length,
          },
          {
            content: item.name,
            rowSpan: item.timeSpans.length,
          }
        );
      }

      cells.push(
        { content: convertToTimeString(times.startHors) },
        { content: convertToTimeString(times.endHors) },
        ...bools.map((key) => ({
          content: renderBool(times[key as keyof DayOfWeek]),
          className: boolClass(times[key as keyof DayOfWeek]),
        }))
      );

      if (index === 0) {
        cells.push({
          content: (
            <Btn props={{ text: "Editar", type: "button", onClick: () => setIsModalOpen(item) }} />
          ),
          rowSpan: item.timeSpans.length,
        });
      }

      return cells;
    })
  );

  return (
    <section>
      <Table headers={headers} rows={rows} className="my-4" />
      {children}
    </section>
  );
};
