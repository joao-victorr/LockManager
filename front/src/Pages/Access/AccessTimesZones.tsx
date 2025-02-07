import { type Dispatch, type SetStateAction, useState } from "react";
import { Inp } from "../../Components/Inputs/Inp"
import { Modal } from "../../Components/Modal/Modal";
import type { TimeSpans } from "../../Types/AccessDayTimesSchema";
import { AccessNewTimeSpans } from "./AccessNewTimeSpans";
import { AccessSearch } from "./AccessSeach"
import { AccessTableTimeSpans } from "./AccessTableTimeSpans";


type Props = {
  props: {
    data: Array<TimeSpans>
    setData: React.Dispatch<React.SetStateAction<Array<TimeSpans>>>;
    nameTimeZones: string;
    setNameTimeZones: Dispatch<SetStateAction<string>>;
    selectDevices: Array<Device>;
    setSelectDevices: React.Dispatch<React.SetStateAction<Array<Device>>>;
  }
}


export const AccessTimesZones = ({ props }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimeSpansModalOpen, setIsTimeSpansModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const [startHors, setStartHors] = useState(0);
  const [endHors, setEndHors] = useState(86399);

  const [modifyTimeSpansId, setModifyTimeSpansId] = useState<number | null>(null);



  const handleSave = () => {

    const newTimeSpans: TimeSpans = {
      // 
      id: modifyTimeSpansId ?? (props.data.length + 1), // Para evitar IDs duplicados
      startHors,
      endHors,
      daysOfWeek: {
        sun: selectedDays.includes("sun"),
        mon: selectedDays.includes("mon"),
        tue: selectedDays.includes("tue"),
        wed: selectedDays.includes("wed"),
        thu: selectedDays.includes("thu"),
        fri: selectedDays.includes("fri"),
        sat: selectedDays.includes("sat"),
      },
    };
  
    if (modifyTimeSpansId !== null) {
      // Atualizar o TimeSpan existente
      const updatedData = props.data.map(item =>
        item.id === modifyTimeSpansId ? newTimeSpans : item
      );
      props.setData(updatedData);

      setIsTimeSpansModalOpen(false);
      setSelectedDays([]);
      setStartHors(0);
      setEndHors(86399);
      setModifyTimeSpansId(null)
      return
    } 
    // Atualização imutável do estado
    props.setData(prevData => [...prevData, newTimeSpans]);
  
    setIsModalOpen(false);
    setSelectedDays([]);
    setStartHors(0);
    setEndHors(86399);
    return
  };

  const heandleCancel = () => {
    setIsModalOpen(false);
    setIsTimeSpansModalOpen(false);


    setSelectedDays([])
    setStartHors(0)
    setEndHors(0)
    
  }

  const handleSelectDevice = (device: Device) => {

    const isDeviceSelected = props.selectDevices.some((item) => item.id === device.id)

    if(isDeviceSelected) {
      props.setSelectDevices(prevSelectDevice => prevSelectDevice.filter((item) => item.id!== device.id))
    } else {
      props.setSelectDevices(prevSelectDevice => [...prevSelectDevice, device])
    }
    
  }

  const modifyTimeSpans = (time: TimeSpans) => {
    setIsTimeSpansModalOpen(true);
    setModifyTimeSpansId(time.id);

    setStartHors(time.startHors);
    setEndHors(time.endHors);
    setSelectedDays(Object.entries(time.daysOfWeek).filter(([_, value]) => value).map(([key]) => key));
  }


  return (
    <div className="relative flex flex-col gap-4 justify-between">
      <Inp props={{ type:"text", placeholder: "Digite o Nome do Horário", value: props.nameTimeZones, onChange: props.setNameTimeZones }} />
      <AccessSearch props={{ ModalOpen: () => setIsModalOpen(true), onClickDelet: () => {} }}/>


      <section className="flex flex-row gap-4 overflow-x-auto">
        {dataDevice.map((device: Device) => {
          const isChecked = props.selectDevices.some((item) => device.id === item.id);
          return (
            <label
              key={device.id}
              className={`p-3 my-2 border rounded-lg cursor-pointer transition-colors duration-200 ${
                isChecked
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="whitespace-nowrap">{device.name}</span>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleSelectDevice(device)}
                className="hidden"
              />
            </label>
          );
        })}
      </section>



      <AccessTableTimeSpans props={{ 
        data: props.data,
        setIsModalOpen: modifyTimeSpans
       }}>
        {isTimeSpansModalOpen && (
          <Modal  props={{
            title: "HORARIO",
            onClickCanceled: heandleCancel,
            onClickSaved: handleSave 
          }}>
            <AccessNewTimeSpans 
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
      </AccessTableTimeSpans>

      {isModalOpen && (
        <Modal  props={{ title: "FAIXA DE HORARIO", onClickCanceled: heandleCancel, onClickSaved: handleSave }}>
            <AccessNewTimeSpans 
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



type Device = {
  id: string;
  name: string;
}

const dataDevice: Array<Device> = [
  {
    id: "sdvsd",
    name: "Dispositivo 1"
  },
  {
    id: " odfbd34",
    name: "Dispositivo 2"
  },
  {
    id: "vkwndv",
    name: "Dispositivo 3"
  },

]