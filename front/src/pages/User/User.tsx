import { Header } from '../../Components/Header/Header'
import { Nav } from '../../Components/Nav/Nav'
import './User.css'
import { useApi } from '../../hooks/userApi'
import { useEffect, useRef, useState } from 'react'
import { DataLock, DataUser } from '../../Types/User'
import icon from '../../assets/padrão.png'


export const User = () => {
  const api = useApi();
  const [listUser, setListUser] = useState<DataUser[]>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [listLocks, setListLocks] = useState<DataLock[] | null>([
    {
      id: "clt7z0m2n0003plpq4daxfdrm",
      name: "LOJA",
      ip: "192.168.1.25",
      GroupsLocks: [
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        },
      ],
    },
    {
      id: "clt7z0m2n0003plpq4daxfdrm",
      name: "LOJA",
      ip: "192.168.1.25",
      GroupsLocks: [
        {
          id_group: "clt7z0m2n0003plpq4daxfdrm",
          name: "DEPARTAMENTO TESTE"
        }
      ],
    },
    
  ]);


  useEffect(() => {
    const fetchData = async () => {
      const userData = await api.getUser();
      setListUser(userData);
    };
    fetchData();
  }, []);

  const handleFileSelection = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            setImageUrl(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };


 

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
          <div className='list-user'>
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
            <input className='input-name' type="text" />
            {imageUrl ? (
              <img src={imageUrl} alt="" width={100} height={100} />
            ) : (
              <img src={icon} alt="" width={100} height={100} />
            )}
            <div>
              <button className='image-add' onClick={handleFileSelection}>ARQUIVOS</button>
              <button className='image-remove'>REMOVER</button>
            </div>
          </div>
          <div className='user-area-right'>
            {listLocks && (
              <div className='scrool-area'>
                {listLocks.map((lock: DataLock) => {
                  return (
                    <ul key={lock.id}>
                      <li>{lock.name}</li>
                      {lock.GroupsLocks && (
                        lock.GroupsLocks.map((groups: {id_group: string, name: string}) => (
                          <li key={groups.id_group}><input type="checkbox"/>{groups.name}</li>
                        ))
                      )}
                    </ul>
                  )
                })}
                
             </div>
            )}
          </div>
        </div>
      )}

      </main>
    </>
  );
};
