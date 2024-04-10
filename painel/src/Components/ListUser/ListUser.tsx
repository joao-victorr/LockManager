import { useEffect, useState } from "react";
import "./ListUser.css";
import { DataUser } from "../../Types/User";
import { useApi } from "../../hooks/userApi";
// import icon from '../../assets/padrão.png'

export const ListUser = () => {
  const api = useApi();
  const [listUser, setListUser] = useState<DataUser[]>();


  useEffect(() => {
    const fetchData = async () => {
      const userData = await api.getUser();
      setListUser(userData);
    };
    fetchData();
  }, []);


  const renderUser = (listUser: DataUser[]) => {
    if(!listUser) {
      return (
        <tr>
          <td>Carregando</td>
        </tr>
      )
    }

    function arrayBufferToBase64(buffer: Buffer) {
      const binary = buffer.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, '')
      return btoa(binary);
    }

    return listUser.map((user: DataUser) => {

      const base64Image = `data:image/png;base64,${arrayBufferToBase64(user.image.data)}`;

      return (<tr key={user.id}>
        <td className='checkbox'><input type="checkbox" /></td>
        <td className="icon"><img src={base64Image} alt="" /></td>
        <td className="name">{user.name}</td>
        <td className="department">{user.UsersGroups.length}</td>
        <td className="locks">{user.UsersLocks.length}</td>
        <td className='options'>
          <span>...</span>
          <span>...</span>
        </td>
      </tr>)
    })
  }


  return (
    <div className='listArea' >
      <table className="grid-table">
        <thead>
          <tr>
            <th className='checkbox'>
              <div>
                <span>All</span>
                <input type="checkbox"/>
              </div>
            </th>
            <th className="icon">Icon</th>
            <th className="name">Name</th>
            <th className="department">Departamento</th>
            <th className="locks">Fechaduras</th>
            <th className='options'></th>
          </tr>
        </thead>

        <tbody className='grid-table-body'>
        {listUser && renderUser(listUser)}
        </tbody>

      </table>
    </div>
  )
}