import { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../../contexts/Auth/AuthContext';

export const Header = () => {
  const auth = useContext(AuthContext)

  return (
    <header>

      <div className='logo' >Logo</div>

      <div className="user">
        {auth.user && <span className='name' >{auth.user.name}</span>}
        
        <span className='image' ></span>
      </div>

    </header>
  )


}