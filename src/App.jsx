import { createContext, useEffect, useState } from 'react'
import './App.css'
import { AppRoutes } from './components/app-wrapper/AppRoutes'

//Contexto para pasar los estados idUsuario y isLoginPage, y las funciones esconderAccederLogin
// y setIdUsuario a toda la aplicación
export const IdUsuarioContext = createContext()

function App() {

  //Estado para guardar el id del usuario
  const [idUser, setIdUser] = useState('')
  //Estado para saaber si nos encontramos en login
  const [isLoginPage, setIsLoginPage] = useState(false)

  //Funcion para esconder el boton de acceder si nos encontramos en login
  const esconderAccederLogin = (isLogin) => {

    setIsLoginPage(isLogin)

  }

  //Funcion para establecer el id de un usuario al registrarse o iniciar sesión
  const setIdUsuario = (IdUsuario) => {

    localStorage.setItem('idUsuario', JSON.stringify(IdUsuario))
    setIdUser(IdUsuario)

  }

  //Efecto para obtener el id del usuario de local storage y crearlo si no existe
  useEffect(() => {

    const idUsuario = JSON.parse(localStorage.getItem('idUsuario'))

    if(idUsuario){
      setIdUser(idUsuario)
    }else{      
      localStorage.setItem('idUsuario', JSON.stringify(''))
      setIdUser(idUsuario)
    }

  } , [])

  return (
    <>
      <IdUsuarioContext.Provider value={{idUser, isLoginPage, setIdUsuario, esconderAccederLogin}}>
        <AppRoutes />
      </IdUsuarioContext.Provider>  
    </>
    
  )
}

export default App
