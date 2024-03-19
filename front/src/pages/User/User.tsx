import { Header } from '../../Components/Header/Header'
import { Nav } from '../../Components/Nav/Nav'
import './User.css'
import { ListUser } from '../../Components/ListUser/ListUser'
import { AddUser } from '../../Components/AddUser/AddUser'
import { useState } from 'react'



export const User = () => {

  const [isVisible, setIsVisible] = useState(false);

  const handleAddUser = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  };

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
          <ListUser />
          
        </div>
        )}

        {isVisible && (
          <AddUser />
        )}

      </main>
    </>
  );
};


// 
