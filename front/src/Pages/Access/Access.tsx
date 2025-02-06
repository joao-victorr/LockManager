import { useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { AccessHors } from "./AccessHors";
import { AccessSearch } from "./AccessSeach";
import { AccessTable } from "./AccessTable"


export const AccessPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    



return (
    <div className="relative w-full h-full">
        <AccessSearch props={{ ModalOpen: () => setIsModalOpen(true), onClickDelet: () => {} }}/>

        <AccessTable props={{ data: data }}/>

        {isModalOpen && (
            <Modal  props={{ title: "NOVO HORARIO", onClickCanceled: () => setIsModalOpen(false), onClickSaved: () => {} }}>
                <AccessHors />
            </Modal>
        )}


    </div>
)

}





const data: Array<Data> = [
  {
    id: "1",
    name: "Evento 1",
    startDate: "2023-01-01",
    endDate: "2023-01-07",
    daysOfWeek: [true, false, true, false, true, false, true],
  },
  {
    id: "2",
    name: "Evento 2",
    startDate: "2023-02-15",
    endDate: "2023-02-20",
    daysOfWeek: [false, true, false, true, false, true, false],
  },
  {
    id: "3",
    name: "Evento 3",
    startDate: "2023-03-10",
    endDate: "2023-03-15",
    daysOfWeek: [true, true, true, false, false, false, true],
  }
];


type Data = {
  id: string;
  name: string
  startDate: string;
  endDate: string;
  daysOfWeek: Array<boolean>;
}
