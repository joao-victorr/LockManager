
import { useEffect, useState } from "react";
import { Modal } from "../../Components/Modal/Modal";
import { ToolBar } from "../../Components/ToolBar";
import type { Device } from "../../Types/Device";
import { UseApi } from "../../hooks/useApi";
import DeviceForm from "./DeviceForm";
import { DeviceTable } from "./DeviceTable";




const deviceApi = new UseApi().devicesApi;

export const Devices = () => {

  const [isOpenModalNewDevice, setIsOpenModalNewDevice] = useState(false);
  const [dataDevice, setDataDevice] = useState<Device[]>([]);



  useEffect(() => {
    const getDataDevice = async () => {
      const res = await deviceApi.getDevices()
      
      console.log(res)
      setDataDevice(res);
    }
    getDataDevice();
  }, [])


return(
  <section>

  <ToolBar 
    props={{ModalOpen: () => {setIsOpenModalNewDevice(true)}, onClickDelet: () => {}, }}
  />

  <DeviceTable props={{data: dataDevice }} />


  {isOpenModalNewDevice && (
    <Modal
      props={{ onClickCanceled: () => {setIsOpenModalNewDevice(false)}, onClickSaved: () => {}, title: "New Devices" }}
    >
      <DeviceForm />
    </Modal>
  )}
    
    
  </section>
)
}