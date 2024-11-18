import { useState } from "react"
import { ModalAddUser } from "../Components/ModalAddUser"


export const User = () => {

    const [isOpenModelUser, setIsOpenModelUser] = useState(false)

    const handleModalUser = () => {
        
        setIsOpenModelUser(!isOpenModelUser)
    }


return(
    
    <div className="flex flex-col h-full ">
        <aside className=" flex flex-col bg-blue-200 gap-2 p-4">
            <div className=" flex gap-8">
                <button
                    type="button"
                    onClick={handleModalUser}
                    className="bg-green-300 p-2 w-32 rounded-3xl hover:bg-green-600"
                >Adicionar</button>
                <button type="button" className="bg-red-300 p-2 w-32 rounded-3xl hover:bg-red-600">Apagar</button>
            </div>
        </aside>

        <main className="relative h-full ">
            <h2>Usuários</h2>
            <table className="w-full">
                <thead className=" bg-teal-400 border border-gray-300 p-4">
                    <tr className="border-b border-gray-300">
                        <th className="border-r border-gray-300 p-2 w-1/12">
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th className="border-r border-gray-300 p-2 w-1/12">Image</th>
                        <th className="border-r border-gray-300 p-2 w-1/4">Nome</th>
                        <th className="border-r border-gray-300 p-2 w-1/5">Status</th>
                        <th className="border-r border-gray-300 p-2 w-1/5">N° Departamentos</th>
                        <th className="p-2 w-1/12">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-500 p-4 border border-gray-300">
                    <tr className="border-b border-gray-300">
                        <th className="border-r border-gray-300 p-2 w-1/12">
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th className="border-r border-gray-300 p-2 w-1/12">
                            <img src="" alt="" />
                        </th>
                        <th className="border-r border-gray-300 p-2 w-1/4">Nome</th>
                        <th className="border-r border-gray-300 p-2 w-1/5">Status</th>
                        <th className="border-r border-gray-300 p-2 w-1/5">N° Departamentos</th>
                        <th className="p-2 w-1/12">Action</th>
                    </tr>
                </tbody>

            </table>

            {isOpenModelUser && <ModalAddUser props={{ handleModalUser }} />}

            
        </main>

        

  </div>
)
}