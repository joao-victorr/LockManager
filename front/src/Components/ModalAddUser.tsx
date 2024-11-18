import { useEffect, useState } from "react";
import type { Device } from "../Types/Device";
import { UseApi } from "../hooks/useApi";


interface Props {
  props: {
    handleModalUser: () => void;
  };
}

const getDevices = new UseApi().devicesApi.getDevices;

export const ModalAddUser = ({ props }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [dataDevices, setDataDevices] = useState<Device[] | null>(null)

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

  const handleCreate = () => {
    const selectedUnits: { id: string; departmentID: string }[] = [];
    const articles = document.querySelectorAll("article[data-unit-id]");

    for (const article of articles) {
      const unitId = article.getAttribute("data-unit-id") || "";
      const selectedRadio = article.querySelector<HTMLInputElement>(
        "input[type='radio']:checked"
      );

      if (selectedRadio) {
        const departmentId =
          selectedRadio.parentElement?.getAttribute("data-dept-id") || "";
        selectedUnits.push({ id: unitId, departmentID: departmentId });
      }
    }

    console.log(selectedUnits);
  };



  useEffect(() => {
    const execute = async() => {
      const data = await getDevices();
      console.log(data);
      setDataDevices(data);
    }
    execute();
  }, [])

  return (
    <div className="absolute inset-0 bg-yellow-100 w-4/5 h-[95%] m-auto shadow-lg rounded-3xl flex flex-col justify-between p-4">
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

      <div className="flex-1 flex gap-2">
        <section className="flex flex-col gap-6">
          <span className="flex w-full items-center flex-col">
            <img
              src={imageSrc || ""}
              alt="Preview"
              className="w-full object-cover border border-gray-300"
            />
            <span className="flex gap-2 p-2">
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="file-upload"
                style={{ display: "none" }}
                onChange={uploadPhoto}
              />
              <button
                type="button"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Arquivos
              </button>
              <button
                type="button"
                onClick={() => {
                  setImageSrc(null);
                }}
                className="bg-gray-400 p-2 rounded"
              >
                Remover
              </button>
            </span>
          </span>
          <span>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" className="p-2 w-full" required />
          </span>
        </section>

        <section className="bg-blue-400 w-[80%] p-4 flex gap-4">

          {dataDevices ? 
            dataDevices.map((devices) => {
              return(
                <article key={devices.id} data-unit-id={devices.id}>
                  <span>
                    <span>{devices.name}</span>
                  </span>
                  <ul>
                    {devices.GroupsLocks.map((group) => {
                      return(
                        <li key={group.groups.id} data-dept-id={group.groups.id}>
                          <input type="radio" id={group.id} name={devices.id} />
                          <label htmlFor={group.id} >{group.groups.name}</label>
                        </li>
                      )
                    })

                    }
                  
                  </ul>
                </article>
              )
            }) :

            <p>Nenhum grupo de dispositivos encontrado.</p>
          }
        </section>
      </div>
    </div>
  );
};
