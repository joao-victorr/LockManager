import { useState } from "react";
import { Inp } from "../../Components/Inputs/Inp"
import { Modal } from "../../Components/Modal/Modal";
import { AccessSearch } from "./AccessSeach"
import { AccessTable } from "./AccessTable"
import { NewHors } from "./NewHors";




export const AccessHors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [startHors, setStartHors] = useState("00:00")
  const [endHors, setEndHors] = useState("00:00")


  const heandleSalve = () => {
    console.log("Days: ", selectedDays)
    console.log("Start Hors: ", startHors)
    console.log("End Hors: ", endHors)
    





    setIsModalOpen(false)
    setSelectedDays([])
    setStartHors("00:00")
    setEndHors("00:00")
  }

  const heandleCancel = () => {
    setIsModalOpen(false)

    setSelectedDays([])
    setStartHors("00:00")
    setEndHors("00:00")
    
  }


  return (
    <div className="relative flex flex-col gap-4 justify-between">
      <Inp props={{ type:"text", placeholder: "Digite o Nome do Horário" }} />
      <AccessSearch props={{ ModalOpen: () => setIsModalOpen(true), onClickDelet: () => {} }}/>
      <AccessTable props={{  }}/>

      {isModalOpen && (
        <Modal  props={{ title: "FAIXA DE HORARIO", onClickCanceled: heandleCancel, onClickSaved: heandleSalve }}>
            <NewHors 
              props={{
                selectedDays,
                onDaysChange: setSelectedDays,
                startHors: startHors,
                setStartHors: setStartHors,
                endHors: endHors,
                setEndHors: setEndHors
              }}
            />
        </Modal>
    )}
    </div>

    
  )
}





// const data: Array<Data> = [
//   {
//     id: "1",
//     name: "Evento 1",
//     startDate: "2023-01-01",
//     endDate: "2023-01-07",
//     daysOfWeek: [true, false, true, false, true, false, true],
//   },
//   {
//     id: "2",
//     name: "Evento 2",
//     startDate: "2023-02-15",
//     endDate: "2023-02-20",
//     daysOfWeek: [false, true, false, true, false, true, false],
//   },
//   {
//     id: "3",
//     name: "Evento 3",
//     startDate: "2023-03-10",
//     endDate: "2023-03-15",
//     daysOfWeek: [true, true, true, false, false, false, true],
//   }
// ];


// type Data = {
//   id: string;
//   name: string
//   startDate: string;
//   endDate: string;
//   daysOfWeek: Array<boolean>;
// }
