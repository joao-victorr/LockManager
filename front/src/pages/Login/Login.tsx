import { FormEvent, useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { useNavigate } from "react-router-dom"


export function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const heandlerButton = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(userName && password) {
      const idLogged = await auth.login(userName, password)
      if(idLogged) {
        navigate('/')
      } else {
        alert('Login failed')
      }

    }
    
  }

  return (
    
    <div className="container">

      <form onSubmit={heandlerButton}>
        <h1>Login</h1>
        <input
          type="text"
          name="user"
          id="user"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          placeholder="User"
        />
        <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button
        className="button"
        type="submit"
        >ENVIAR</button>
      </form>

    </div>
  )
}

