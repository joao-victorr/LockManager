import { useContext } from "react";
import { Home } from "../../Pages/Home";
import { Login } from "../../Pages/Login";
import { AuthContext } from "./AuthContext";


export const RequireAuth = ({children}: {children: JSX.Element}) => {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <Login />;
  }


  return <Home>{children}</Home>;

}