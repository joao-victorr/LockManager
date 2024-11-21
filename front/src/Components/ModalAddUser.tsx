import { useEffect, useRef, useState } from "react";
import type { Device } from "../Types/Device";
import { UseApi } from "../hooks/useApi";

import noUserIcon from "../assets/icons/user.png"
import { ListGroupsInDevices } from "./ListGroupsInDevices";



const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64.split(",")[1]); // Ignora o prefixo "data:image/png;base64,"
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
};


interface Props {
  props: {
    handleModalUser: () => void;
  };
}

const getDevices = new UseApi().devicesApi.getDevices;
const postUser = new UseApi().userApi.postUser;
const postUserGroups = new UseApi().userGroupsApi.postUser

export const ModalAddUser = ({ props }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dataDevices, setDataDevices] = useState<Device[] | null>(null);
  const [valueInputName, setValueInputName] = useState("");

  const fileInputImageRef = useRef<HTMLInputElement>(null);


  const uploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Apenas imagens PNG ou JPEG são permitidas!");
      }
    }
  };

  const handleCreate = async() => {

    if (!imageSrc || valueInputName === "") {
      alert("Por favor, preencha todos os campos");
      return;
    }

    const selectedUnits: Array<{ id_device: string; groups: Array<{id: string}> }> = [];
  
    const articles = document.querySelectorAll("article[data-unit-id]");
  
    for (const article of articles) {
      const id_device = article.getAttribute("data-unit-id") || "";
      const selectedCheckboxes = article.querySelectorAll<HTMLInputElement>(
        "input[type='checkbox']:checked"
      );
  
      const groupsId = Array.from(selectedCheckboxes).map((checkbox) =>
        checkbox.getAttribute("data-dept-id") || ""
      );
  
      if (groupsId.length > 0) {
        selectedUnits.push({ id_device, groups: groupsId.map((groupId) => {return {id: groupId}}) });
      }
    }

    const dataUser = {
      name: valueInputName.trim(),
      image: base64ToArrayBuffer(imageSrc),
      devices: selectedUnits
    }

    const newUser = await postUser(dataUser)

    if(!newUser) {
      alert("Falha no cadastro contate o adm")
      return
    }


    const res = await postUserGroups({
      id_user: newUser.user.id,
      devices: selectedUnits
    })

    if (!res) {
      alert("Falha na criação do usuario.")
    }


    setValueInputName("");
    remuveUserImage();
  };
  
  

  const remuveUserImage = () => {
    setImageSrc(null);
    if (fileInputImageRef.current) {
      fileInputImageRef.current.value = "";
    }
  }

  useEffect(() => {
    const execute = async() => {
      const data = await getDevices();
      setDataDevices(data);
    }
    execute();
  }, [])

  return (
    //Modal
    <div className="absolute inset-0 bg-yellow-100 w-4/5 h-[95%] m-auto shadow-lg rounded-3xl flex flex-col justify-between p-4">
      {/* Header Modal */}
      <div className="flex justify-between">
        <h2 className="flex justify-center items-center text-2xl">
          Adicionar Usuário
        </h2>
        <span className="flex gap-4 flex-row justify-end p-4">
          <button
            type="button"
            onClick={props.handleModalUser}
            className="bg-red-300 p-2 w-32 rounded-3xl hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="bg-green-300 p-2 w-32 rounded-3xl hover:bg-green-600"
          >
            Criar
          </button>
        </span>
      </div>

      {/* Body Modal */}
      <div className="flex-1 flex gap-2">
        {/* Section data User */}
        <section className="flex flex-1 flex-col gap-6">
          {/* Section photo */}
          <span className="flex w-full items-center flex-col">
            <img
              src={imageSrc || noUserIcon}
              alt="Preview"
              className="w-full object-cover rounded-full border border-gray-300"
            />
            <span className="flex gap-2 p-2">
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="file-upload"
                ref={fileInputImageRef}
                style={{ display: "none" }}
                onChange={uploadPhoto}
              />
              <button
                type="button"
                onClick={() => fileInputImageRef.current?.click()}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Arquivos
              </button>
              <button
                type="button"
                onClick={remuveUserImage}
                className="bg-gray-400 p-2 rounded"
              >
                Remover
              </button>
            </span>
          </span>
          {/* Section name */}
          <span>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" value={valueInputName} onChange={(e) => setValueInputName(e.target.value)} className="p-2 w-full" required />
          </span>
        </section>

        {/* Section Groups */}
        <section className=" w-[80%] p-4 flex gap-4">

          {dataDevices ? (
            dataDevices.map((devices) => (
              <ListGroupsInDevices key={devices.id} props={{devices}} />
            ))
          ) : (
            <p>Nenhum grupo de dispositivos encontrado.</p>
          )}
        </section>
      </div>
    </div>
  );
};
