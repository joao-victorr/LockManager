import { convertToTimeString, convertToTimestamp } from "../../../public/assets/script/convertTime";
import DaysOfWeekInput from "../../Components/DaysOfWeekinput/DaysOfWeekInput"
import { Inp } from "../../Components/Inputs/Inp"


type Props = {
  props: {
    selectedDays: string[]; // Estado dos dias selecionados (recebido do componente pai)
    onDaysChange: (days: string[]) => void; // Função para atualizar o estado no componente pai
    startHors: number; //
    setStartHors: (date: number) => void;
    endHors: number; //
    setEndHors: (date: number) => void;

    onClickSaved?: () => void;
    onClickCanceled?: () => void;
  }
}




export const AccessNewTimeSpans = ({ props }: Props) => {


  return (
    <div className="relative flex flex-col items-center ">
      <span className="flex flex-row gap-2">
      <Inp 
        props={{ 
          type: "time", 
          label: "Início", 
          onChange: (value) => props.setStartHors(convertToTimestamp(value)), 
          value: convertToTimeString(props.startHors)
        }} 
      />
        <Inp 
          props={{
            type: "time",
            label: "Inico",
            onChange: (value) => props.setEndHors(convertToTimestamp(value)),
            value: convertToTimeString(props.endHors) 
          }}
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

