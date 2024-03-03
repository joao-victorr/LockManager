import { Header } from '../../Components/Header/Header'
import { Nav } from '../../Components/Nav/Nav'
import './User.css'
import { useApi } from '../../hooks/userApi'
import { useEffect, useState } from 'react'
import { DataUser } from '../../Types/User'
import icon from '../../assets/padrão.png'


export const User = () => {
  const api = useApi();
  const [listUser, setListUser] = useState<DataUser[]>();
  
  useEffect(() => {
    const fetchData = async () => {
      const userData = await api.getUser();
      setListUser(userData);
    };
    fetchData();
  }, []);


  const [isVisible, setIsVisible] = useState(false);

  const handleAddUser = () => {
    setIsVisible(true);
  };


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
    <>
      <Header />
      <main>
        <Nav />
        {!isVisible && (
          <div className='card'>
          <div className='buttonArea' >
            <button className='add' onClick={handleAddUser}>Adicionar</button>
            <button className='remuve' >Remover</button>
          </div>

          <div className='searchArea' >
            <span className='Buscar'>Buscar</span>
            <select name="search">
              <option value="name">Name</option>
              <option value="id">Id</option>
            </select>
            <input type="text" placeholder="Digite o nome"/>
          </div>

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
        </div>
        )}

        {isVisible && (
        <div className='add-user'>
          <div className='user-area-left'>
            ...
          </div>
          <div className='user-area-right'>
            ...
          </div>
        </div>
      )}

      </main>
    </>
  );
};


// {listUser && listUser.map((user) => {
//   return (<tr key={user.id}>
//     <td className='checkbox'><input type="checkbox" /></td>
//     <td className="icon"><img src={iconP} width="40px" alt="" /></td>
//     <td className="name">{user.name}</td>
//     <td className="department">{user.UsersGroups.length}</td>
//     <td className="locks">{user.UsersLocks.length}</td>
//     <td className='options'>
//       <span>...</span>
//       <span>...</span>
//     </td>
//   </tr>)
// })}