import './Nav.css'
import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { Link } from 'react-router-dom'


export const Nav = () => {
  const auth = useContext(AuthContext)

  const handleLogout = async() => {
    await auth.logout()
    location.reload()
  }

  return (
    <nav>
      <ul>
        <li><Link className='list-link' to={'/'}>Home</Link></li>
        <li><Link className='list-link' to={'/private'}>Private</Link></li>
        <li><Link className='list-link' to={'/user'}>User</Link></li>
        {auth.user ? (
          <li className='list-link' onClick={handleLogout}>Logout</li>
        ) : (
          <li><Link className='list-link' to={'/login'}>Login</Link></li>
        )}
      </ul>
    </nav>
  )

}