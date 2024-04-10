import { FormEvent, useContext, useState } from "react"
import "./login.css"
import { AuthContext } from "../../contexts/Auth/AuthContext"
import { useNavigate } from "react-router-dom"
import  showPasswordImage  from "./images/show.png";
import  hiddePasswordImage  from "./images/hidden.png";


export function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)

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

  const heandlerShowPassword = () => {

    showPassword ? setShowPassword(false) : setShowPassword(true)
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
        <span className="passwordArea">
          <input
              type={showPassword ? "password" : "text"}
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
          />
           <img src={showPassword ? showPasswordImage : hiddePasswordImage} onClick={heandlerShowPassword} alt="" />
        </span>
        <button
          className="button"
          type="submit"
          >ENVIAR
          </button>
      </form>

    </div>
  )
}

