import { useState } from 'react'
import Signin  from './Components/Signin/Signin'
import Signup from './Components/Signup/Signup'
import Home from './Components/Home/Home'
import './App.css'

function App() {
const [ route, setRoute ] = useState('signin');
const [user, setUser] = useState({
  id: '',
  name: '',
  email: '',
  birthdate: '',
  motto: ''
})

const onRouteChange = (route) => {
  setRoute(route)
}

  const updateUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      motto: user.motto
    })
  }

  return (
    <>
      { route === 'home'
        ? <Home id={user.id} name={user.name} birthdate={user.birthdate} motto={user.motto}  onRouteChange={onRouteChange}/>
        : ( route === 'signin'
          ?  <Signin updateUser={updateUser} onRouteChange={onRouteChange}/>
          :  <Signup updateUser={updateUser} onRouteChange={onRouteChange}/>
        ) 
      }
    </>
  )
}

export default App
