import { type Dispatch, type SetStateAction, useState } from "react";
import { Inp } from "../../Components/Inputs/Inp"
import { Modal } from "../../Components/Modal/Modal";
import { ToolBar } from "../../Components/ToolBar";
import type { TimeSpans } from "../../Types/AccessDayTimesSchema";
import type { DeviceBasicInfo } from "../../Types/Device";
import { AccessListDevice } from "./AccessListDevice";
import { AccessNewTimeSpans } from "./AccessNewTimeSpans";
import { AccessTableTimeSpans } from "./AccessTableTimeSpans";


type Props = {
  props: {
    data: Array<TimeSpans>
    setData: React.Dispatch<React.SetStateAction<Array<TimeSpans>>>;
    nameTimeZones: string;
    setNameTimeZones: Dispatch<SetStateAction<string>>;
    selectDevices: Array<DeviceBasicInfo>;
    setSelectDevices: React.Dispatch<React.SetStateAction<Array<DeviceBasicInfo>>>;
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
      sun: selectedDays.includes("sun"),
      mon: selectedDays.includes("mon"),
      tue: selectedDays.includes("tue"),
      wed: selectedDays.includes("wed"),
      thu: selectedDays.includes("thu"),
      fri: selectedDays.includes("fri"),
      sat: selectedDays.includes("sat"),
      hol1: selectedDays.includes("hol1"),
      hol2: selectedDays.includes("hol2"),
      hol3: selectedDays.includes("hol3")
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

  const handleSelectDevice = (device: DeviceBasicInfo) => {

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
    setSelectedDays(Object.entries(time).filter(([_, value]) => value).map(([key]) => key));
  }


  return (
    <div className="relative flex flex-col gap-4 justify-between">
      <Inp props={{ type:"text", placeholder: "Digite o Nome do Horário", value: props.nameTimeZones, onChange: props.setNameTimeZones }} />
      <ToolBar props={{ ModalOpen: () => setIsModalOpen(true), onClickDelet: () => {} }}/>

      <AccessListDevice props={{ handleSelectDevice: handleSelectDevice, selectDevices: props.selectDevices }} />

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




// const dataDevice: Array<DeviceBasicInfo> = [
//   {
//     id: "sdvsd",
//     name: "Dispositivo 1"
//   },
//   {
//     id: " odfbd34",
//     name: "Dispositivo 2"
//   },
//   {
//     id: "vkwndv",
//     name: "Dispositivo 3"
//   },

// ]