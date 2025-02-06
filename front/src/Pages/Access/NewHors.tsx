// import { useState } from "react";
import { useState } from "react";
import DaysOfWeekInput from "../../Components/DaysOfWeekinput/DaysOfWeekInput"
import { Inp } from "../../Components/Inputs/Inp"


type Props = {
  props: {
    selectedDays: string[]; // Estado dos dias selecionados (recebido do componente pai)
    onDaysChange: (days: string[]) => void; // Função para atualizar o estado no componente pai
    startHors: string; //
    setStartHors: (date: string) => void;
    endHors: string; //
    setEndHors: (date: string) => void;

    onClickSaved?: () => void;
    onClickCanceled?: () => void;
  }
}


export const NewHors = ({ props }: Props) => {

  // const [startDate, setStartDate] = useState("00:00")
  // const [endDate, setEndDate] = useState("00:00")


  return (
    <div className="relative flex flex-col items-center ">
      <span className="flex flex-row gap-2">
        <Inp 
          props={{ type: "time", label: "Inico", onChange: props.setStartHors, value: props.startHors}}
        />
        <Inp 
          props={{ type: "time", label: "Inico", onChange: props.setEndHors, value: props.endHors }}
        />
      </span>

      <span>
      <DaysOfWeekInput
        selectedDays={props.selectedDays}
        onDaysChange={props.onDaysChange}

      />
      </span>
    </div>
  )
}

