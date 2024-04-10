import { useEffect, useState } from "react";
import "./AddUser.css";
import icon from '../../assets/padrão.png'
// import { DataLock } from "../../Types/User";
import { useApi } from "../../hooks/userApi";
import { DataLock, DataLocksGroups, NewUser, NewUserGruop } from "../../Types/User";


// import { handleAddUser } from "../../pages/User/User";


// import { handleAddUser } from "../../pages/User/User";




export const AddUser = () => {
  const api = useApi();
  const [userName, setUserName] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [listLocks, setListLocks] = useState<DataLock[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [checkedLocks] = useState<DataLocksGroups[]>([]);

  
  useEffect(() => {
    (async () => {
      const locksData = await api.getLocks();
      console.log("teste")
      setListLocks(locksData);
    })();
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


  const handleCheckboxChange = (data: {lockId: string, groupId: string, checked: boolean}) => {
    if(data.checked) {
      const dataLockIndex = checkedLocks.findIndex(lock => lock.id === data.lockId);
      let dataLock = {
        id: data.lockId,
        groups: [{ id: data.groupId }]
      }
      if(dataLockIndex === -1) {
        checkedLocks.push(dataLock);
        return;
      } else {
        checkedLocks[dataLockIndex].groups.push({ id: data.groupId });
        return;
      }
    } else {
      const removeLockIndex = checkedLocks.findIndex(lock => lock.id === data.lockId);

      if (removeLockIndex !== -1) {
        const removeGroupIndex = checkedLocks[removeLockIndex].groups.findIndex(group => group.id === data.groupId)

        if (removeGroupIndex === -1) {
          console.log("teste");
          return;
        }

        checkedLocks[removeLockIndex].groups.splice(removeGroupIndex, 1);

        if (checkedLocks[removeLockIndex].groups.length === 0) {
          checkedLocks.splice(removeLockIndex, 1);
          return;
        }
        
      }
      return
    }
  };

  const reanderLocks = () => {
    if(!listLocks) {
      return
    }
    return (
      <div className='scrool-area'>
        {listLocks.map((lock: DataLock) => {
          return (
            <ul key={lock.id}>
              <li className="lock-name">{lock.name}</li>
              {lock.GroupsLocks && (
                lock.GroupsLocks.map((group) => (
                  <li key={group.groups.id}>
                    <input
                      type="checkbox"
                      id={`checkbox-${group.groups.id}`}
                      onChange={(e) => handleCheckboxChange( {lockId: lock.id, groupId: group.groups.id, checked: e.target.checked} )}
                    />
                    {group.groups.name}
                  </li>
                ))
              )}
            </ul>
          )
        })}
      </div>
    )
  }

  const handleSubmit = async () => {

    if(!userName || !selectedFile || checkedLocks.length == 0) {
      console.log(checkedLocks)
      alert("Preencha todos os campos")
      return
    }

    const user: NewUser = {
      name: userName,
      image: selectedFile,
      locks: checkedLocks
    }

    const res = await api.postUser(user)

    const userGruop: NewUserGruop = {
      id_user: res.data.id,
      locks: checkedLocks
    }

    const departRes = await api.postUserGroup(userGruop)

    console.log(departRes)

  }

  return (
    <div className='add-user'>
          <div className='user-area-left'>
            <input
              className='input-name'
              type="text"
              placeholder="Name"
              onChange={e => setUserName(e.target.value)}
            />
            {imageUrl ? (
              <img onClick={handleFileSelection} src={imageUrl} alt="" width={100} height={100} />
            ) : (
              <img onClick={handleFileSelection} src={icon} alt="" width={100} height={100} />
            )}
            <div>
              <button className='image-add' onClick={handleFileSelection}>ARQUIVOS</button>
              <button className='image-remove'>REMOVER</button>
            </div>
          </div>
          <div className='user-area-right'>
            {listLocks && (
              reanderLocks()
            )}
          </div>
          {/* <button onClick={handleAddUser}>Voltar</button> */}
          <button onClick={handleSubmit}>Enviar</button>
        </div>
  )


}