import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login/Login'
import { Home } from './pages/Home/Home'
import { Private } from './pages/Private/Private'
import { RequireAuth } from './contexts/Auth/RequireAuth'
import { User } from './pages/User/User'

function App() {

  return (
    <body>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<RequireAuth><User /></RequireAuth>}/>
        <Route path="/private" element={<RequireAuth><Private /></RequireAuth>} />
      </Routes>
    </body>
  )
}

export default App
