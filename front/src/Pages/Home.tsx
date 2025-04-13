
import { useContext, useState } from 'react'
import noUserIcon from '../../public/assets/icons/user.png'

import { Link } from 'react-router-dom'
import { AuthContext } from '../Contexts/Auth/AuthContext'


type Prop = {
  children?: JSX.Element,
}


export const Home = ({ children }: Prop) => {

  const auth = useContext(AuthContext)

  const [dropDownMenuUser, setDropDownMenuUser] = useState(false)

  const handleClickDropDownMenuUser = () => {
    console.log("Clicou")
    dropDownMenuUser ? setDropDownMenuUser(false) : setDropDownMenuUser(true)
  }


  return(
    <div className="flex flex-col h-screen">
      <nav className='flex justify-around items-center bg-slate-500 p-4'>
        <span>
          <img src={noUserIcon} width={46} alt="" />
        </span>
        <ul className='flex gap-8'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/devices">Devices</Link>
          </li>
          <li>
            <Link to="/user">Users</Link>
          </li>
          <li>
            <Link to="/department">Department</Link>
          </li>
          <li>
            <Link to="/access">Access</Link>
          </li>
          <li>
            <Link to="/config">Config</Link>
          </li>
        </ul>
        <span className='relative' onClick={handleClickDropDownMenuUser} onKeyUp={handleClickDropDownMenuUser}>
            <img src={noUserIcon} width={46} alt="No user icon" />

            {dropDownMenuUser && 
              <span onClick={() => {auth.logout()}} onKeyUp={() => {auth.logout()}} className='absolute botton-0 -translate-x-50 -translate-y-50 p-2 bg-red-400 rounded-md z-10'> Logout </span>
            }
        </span>
      </nav>

      {children ?? 
        <div className=''>
          <h1>Home Page</h1>
          <p>Welcome to the home page!</p>
        </div>
      }
    </div>
  )
}