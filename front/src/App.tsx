// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Devices } from './Pages/Devices'
import { User } from './Pages/User'

import { useContext } from 'react'
import { AuthContext } from './Contexts/Auth/AuthContext'
import { RequireAuth } from './Contexts/Auth/RequireAuth'
import { AccessPage } from './Pages/Access/Access'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'



export const App = () => {
  const auth = useContext(AuthContext)


  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={auth.user? <Home /> : <Login />}> </Route>
      <Route path="/devices" element={<RequireAuth><Devices /></RequireAuth>} />
      <Route path="/user" element={<RequireAuth><User /></RequireAuth>}/>
      <Route path="/access" element={<RequireAuth><AccessPage /></RequireAuth>}/>
    </Routes>
  )
}


