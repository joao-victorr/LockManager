import { useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import type { TimeSpans, TimeZones } from "../../Types/AccessDayTimesSchema";
import type { DeviceBasicInfo } from "../../Types/Device";
import { AccessSearch } from "./AccessSeach";
import { AccessTableTimeZones } from "./AccessTableTimeZones";
import { AccessTimesZones } from "./AccessTimesZones";


export const Access = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHors, setNewHors] = useState<Array<TimeSpans>>([]);
    const [nameTimeZones, setNameTimeZones] = useState("");
    const [selectDevices, setSelectDevices] = useState<Array<DeviceBasicInfo>>([])

    const [isTimeZonesModalOpen, setIsTimeZonesModalOpen] = useState(false);
    const [modifyTimeZonesId, setModifyTimeZonesId] = useState<number | null>(null);

    

    const creatNewHors = () => {

      if (newHors.length === 0 || nameTimeZones === null || selectDevices.length === 0) {
        alert("Todos os campos devem estar preenchidos!");
        return;
      }

      const newTimeZones: Omit<TimeZones, "id"> & Partial<Pick<TimeZones, "id">> = { 
        name: nameTimeZones,
        timeSpans: newHors,
        devices: selectDevices,
      };




      setIsModalOpen(false);
      setNewHors([]);
      setNameTimeZones("");
      setSelectDevices([]);
    }

    const canceledTimeZone = () => {

      setIsModalOpen(false);
      setIsTimeZonesModalOpen(false)
      setNewHors([]);
      setNameTimeZones("");
      setSelectDevices([]);

    }

    const modifyTimeZones = (time: TimeZones) => {
      setIsTimeZonesModalOpen(true);
      setModifyTimeZonesId(time.id);


      console.log("teste :", time)
      setNewHors(time.timeSpans);
      setNameTimeZones(time.name);
      setSelectDevices(time.devices);

    
    }

return (
    <div className="relative w-full h-full">
      <AccessSearch props={{ ModalOpen: () => setIsModalOpen(true), onClickDelet: () => {} }}/>

      <AccessTableTimeZones props={{
        data: timeZones,
        setIsModalOpen: modifyTimeZones
      }}>
        {isTimeZonesModalOpen && (
          <Modal
            props={{
              title: "EDITAR HORARIO",
              onClickCanceled: canceledTimeZone,
              onClickSaved: creatNewHors
            }}
          >
            <AccessTimesZones 
              props={{ 
                data: newHors,
                setData: setNewHors,
                nameTimeZones,
                setNameTimeZones,
                selectDevices,
                setSelectDevices,
              }}
            />
          </Modal>
        )}
      </AccessTableTimeZones>


        {isModalOpen && (
            <Modal  props={{ title: "NOVO HORARIO", onClickCanceled: canceledTimeZone, onClickSaved: creatNewHors }}>
              <AccessTimesZones 
                props={{ 
                  data: newHors,
                  setData: setNewHors,
                  nameTimeZones,
                  setNameTimeZones,
                  selectDevices,
                  setSelectDevices,
                  }}
              />
            </Modal>
        )}


    </div>
)

}





const timeZones: Array<TimeZones> = [
  {
    id: 1,
    name: "Evento 1",
    devices: [
      {
        id: "sdvsd",
        name: "Dispositivo 1"
      }
    ],
    timeSpans: [
      {
        id: 1,
        startHors: 0,
        endHors: 86399,
        daysOfWeek: {
          sun: false,
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
        },
      },
      {
        id: 2,
        startHors: 0,
        endHors: 46399,
        daysOfWeek: {
          sun: true,
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: true,
        },
      },
      {
        id: 3,
        startHors: 0,
        endHors: 46399,
        daysOfWeek: {
          sun: true,
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: true,
        },
      }
    ]
  },
  {
    id: 2,
    name: "Evento 1",
    devices: [
      {
        id: "sdvsd",
        name: "Dispositivo 1"
      }
    ],
    timeSpans: [
      {
        id: 1,
        startHors: 0,
        endHors: 86399,
        daysOfWeek: {
          sun: false,
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
        },
      }
    ]
  },
  
];





