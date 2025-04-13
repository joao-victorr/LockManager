import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import type { z } from "zod";
import { Modal } from "../../Components/Modal/Modal"
import { Table } from "../../Components/Table/Table"
import { ToolBar } from "../../Components/ToolBar"
import type { UserSchema } from "../../Types/User";
import { UseApi } from "../../hooks/useApi";
// import { ModalUser } from "./ModalUser"

const userApi = new UseApi().userApi;

type User = z.infer<typeof UserSchema>;
export const User = () => {
    const [isOpenModel, setIsModalOpen] = useState(false)
    const [listUsers, setListUsers] = useState<User[] | null>()
    const [userImages, setUserImages] = useState<Record<string, string>>({});

    const handleModa = () => {

        //Verificar se o modal está fechando ou abrindo, caso esteja fechando, limpa as informações de dentro do modal
        if (isOpenModel) {
            
        }
        

        
        
        setIsModalOpen(!isOpenModel)
    }

    const onClickSavedUser = () => {
        
        handleModa()
    }

    const reanderImage = async (imageName: string) => {
      const res = await userApi.getUserImage(imageName);

      if (res.success) {
        const imageUrl = res.data

        return imageUrl
    }

    // if (res.error.statusCode === 401) {
    //     <Navigate to="/login"/>

    //     return
    // }

    return "../../../public/assets/icons/user.png"

    }

    const tableHeader = [
        { content: <input type="checkbox" className="w-4 h-4" /> },
        { content: "Image" },
        { content: "Nome" },
        { content: "Status" },
        { content: "N° Unidade" },
        { content: "N° Departamento" },
        { content: "Ação" }
    ]

    const tableBody = listUsers ? listUsers.map((user) => [
        {
          content: <input type="checkbox" className="w-4 h-4" />,
          className: "text-center",
        },
        {
          content: (
            <img
              src={userImages[user.image] || "../../../public/assets/icons/user.png"}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover mx-auto"
            />
          ),
          className: "text-center",
        },
        {
          content: user.name,
          className: "text-left px-2",
        },
        {
          content: (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {user.isActive ? "Ativo" : "Inativo"}
            </span>
          ),
          className: "text-center",
        },
        {
          content: user._count.usersDevices,
          className: "text-center",
        },
        {
          content: user._count.usersGroups,
          className: "text-center",
        },
        {
          content: (
            <button
              type="button"
              onClick={() => console.log("Editar", user)}
              className="px-3 py-1 text-sm text-blue-600 hover:underline"
            >
              Editar
            </button>
          ),
          className: "text-center",
        },
      ]) : [];




      useEffect(() => {
        const getUser = async () => {
          const res = await userApi.getUser();
      
          if (res.success) {
            const users = res.data;
            setListUsers(users);
      
            // Carrega imagens depois dos usuários
            const images: Record<string, string> = {};
            for (const user of users) {
              const imageRes = await userApi.getUserImage(user.image);
              images[user.image] = imageRes.success
                ? imageRes.data
                : "../../../public/assets/icons/user.png";
            }
      
            setUserImages(images);
            return;
          }
      
          if (res.error.statusCode === 401) {
            // redirecionamento não funciona assim aqui
            window.location.href = "/login";
            return;
          }
      
          console.error(`Erro na requisição do usuario: ${res.error.message}`);
        };
      
        getUser();
      }, []);
      


return(
    
    <div className="flex flex-col h-full ">
        

        <ToolBar props={{ ModalOpen: () => setIsModalOpen(true), onClickDelet: () => {} }}/>

        <main className="relative h-full ">

            <Table 
                headers={tableHeader}
                rows={tableBody}
            />

            

            {isOpenModel && <Modal props={ {
                title: "user",
                onClickSaved: onClickSavedUser,
                onClickCanceled: handleModa
            } }>
                <div>
                    
                </div>   
            </Modal>}

        </main>
  </div>
)
}