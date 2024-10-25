import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/Auth/AuthContext";


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const sendForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!email || !password) {
      console.log("Por favor, preencha todos os campos")
      return;
    }
    
    //Chamada para realizar o login
    const login = await auth.login(email, password)

    if (login) {
      console.log("Login efetuado com sucesso")
      navigate("/")
      
    } else {
      console.log("Falha no login")
    }
  }


return(
<div>
  <h2>login</h2>
  <form onSubmit={sendForm}>
    <input
      type="text"
      placeholder="Digite o seu email"  
      value={email}
      onChange={(event) => {setEmail(event.target.value)}}
    />
    <input
      type="password"
      placeholder="Digite a senha senha"
      value={password}
      onChange={(event) => {setPassword(event.target.value)}}
    />
    <button type="submit">Enviar</button>
  </form>
</div>
)
}