// import type { ReactNode } from "react";
import type { ReactNode } from "react";
import { convertToTimeString } from "../../../public/assets/script/convertTime";
import { Btn } from "../../Components/Buttons/Btn";
import { Table } from "../../Components/Table/Table";
import type { TimeSpans } from "../../Types/AccessDayTimesSchema";


type Props = {
  props: {
    data: Array<TimeSpans>;
    setIsModalOpen: (time: TimeSpans) => void;
  };
  children?: ReactNode;
}



export const AccessTableTimeSpans = ({ props, children }: Props) => {


  const data = props.data;


  const tableHeader = [
    { content: "Inicio" },
    { content: "Fim" },
    { content: "Domingo" },
    { content: "Segunda" },
    { content: "Terça" },
    { content: "Quarta" },
    { content: "Quinta" },
    { content: "Sexta" },
    { content: "Sabado" },
    { content: "Feriado 1" },
    { content: "Feriado 2" },
    { content: "Feriado 3" },
    { content: "Editar" }
  ]

  const tableRows = data.map((time) => [
    {
      content: convertToTimeString(time.startHors),
      className: "text-center"
    },
    {
      content: convertToTimeString(time.endHors),
      className: "text-center"
    },
    {
      content: time.sun ? "✔" : "✘",
      className: time.sun ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.mon ? "✔" : "✘",
      className: time.mon ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.tue ? "✔" : "✘",
      className: time.tue ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.wed ? "✔" : "✘",
      className: time.wed ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.thu ? "✔" : "✘",
      className: time.thu ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.fri ? "✔" : "✘",
      className: time.fri ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.sat ? "✔" : "✘",
      className: time.sat ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.hol1 ? "✔" : "✘",
      className: time.hol1 ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.hol2 ? "✔" : "✘",
      className: time.hol2 ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: time.hol3 ? "✔" : "✘",
      className: time.hol3 ? "text-center text-green-500" : "text-center text-red-400"
    },
    {
      content: <Btn props={{ text: "Editar", type: "button", onClick: () => props.setIsModalOpen(time) }} />,
      className: "text-center"
    }
    
  ])

// "text-green-500" : "text-red-400"

  return (  
    <section>
      <Table
        headers={tableHeader}
        rows={tableRows} 
      />
      {children}
    </section>
  )
}