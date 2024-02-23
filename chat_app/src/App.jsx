import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/register' element = {<Register/> }/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/' element = {<Chat/>}/>
        <Route path = '/setavatar' element = {<SetAvatar/>}/>
      </Routes>
    </div>
  )
}

export default App