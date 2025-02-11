import { useCallback, useEffect, useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { ToolBar } from "../../Components/ToolBar";
import type { NewTimeZones, TimeSpans, TimeZones } from "../../Types/AccessDayTimesSchema";
import type { DeviceBasicInfo } from "../../Types/Device";
import { UseApi } from "../../hooks/useApi";
import { AccessTableTimeZones } from "./AccessTableTimeZones";
import { AccessTimesZones } from "./AccessTimesZones";


const timeZonesApi = new UseApi().TimeZonesApi


export const Access = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHors, setNewHors] = useState<Array<TimeSpans>>([]);
    const [nameTimeZones, setNameTimeZones] = useState("");
    const [selectDevices, setSelectDevices] = useState<Array<DeviceBasicInfo>>([])

    const [isTimeZonesModalOpen, setIsTimeZonesModalOpen] = useState(false);
    const [modifyTimeZonesId, setModifyTimeZonesId] = useState<number | null>(null);

    const [dataTimeZones, setDataTimeZones] = useState<Array<TimeZones>>([]);



    const getTimeZones = useCallback(async () => {
      const res = await timeZonesApi.getTimeZones();
      if (res === null) {
        console.error("Dados não encontrados");
        return;
      }
      console.log(res);
      setDataTimeZones(res);
    }, []);
    
    useEffect(() => {
      getTimeZones();
    }, [getTimeZones]);
    
    

    const creatNewHors = async () => {

      if (newHors.length === 0 || nameTimeZones === "" || selectDevices.length === 0) {
        alert("Todos os campos devem estar preenchidos!");
        return;
      }

      if (modifyTimeZonesId !== null) {
        const timeZones: TimeZones = {
          id: modifyTimeZonesId,
          name: nameTimeZones,
          timeSpans: newHors,
          devices: selectDevices,
        }
        await timeZonesApi.updateTimeZones(timeZones);

        setIsTimeZonesModalOpen(false);
        setNewHors([]);
        setNameTimeZones("");
        setSelectDevices([]);
        getTimeZones()
        return
      }



      // CRIA
      const newTimeZones: NewTimeZones = {
        name: nameTimeZones,
        timeSpans: newHors,
        devices: selectDevices,
      }

      await timeZonesApi.postTimeZones(newTimeZones);


      
      setIsModalOpen(false);
      setNewHors([]);
      setNameTimeZones("");
      setSelectDevices([]);
      getTimeZones()
      return
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



      setNewHors(time.timeSpans);
      setNameTimeZones(time.name);
      setSelectDevices(time.devices);

      console.log(time.devices)

    
    }

return (
    <div className="relative w-full h-full">
      <ToolBar props={{ ModalOpen: () => setIsModalOpen(true), onClickDelet: () => {} }}/>

      <AccessTableTimeZones props={{
        data: dataTimeZones,
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

