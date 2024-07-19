import { createContext, useContext, useEffect, useState } from 'react'
import { Menu } from '../menu/Menu'
import './Header.css'
import {useNavigate} from 'react-router-dom'
import { IdUsuarioContext } from '../../App'

//Contexto para pasar datos a Menu Y MenuOption
export const MenuContext = createContext()

//Componente del header que se muestra en toda la app
export const Header = () => {

    //Estado para saber la visibilidad del menú
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    //Estado para saber si estas logeado
    const [isLogged, setIsLogged] = useState(false)

    //Estados y metodos obtenidos desde el contexto global definido en App.jsx
    const {idUser, isLoginPage, esconderAccederLogin} = useContext(IdUsuarioContext)

    const navigate = useNavigate()

    //Función para mostrar u esconder el menú
    const toggleMenu = () => {

        if(isMenuVisible){
            setIsMenuVisible(false)
            document.body.style.overflow = '';
        }else{
            setIsMenuVisible(true)
            document.body.style.overflow = 'hidden';
        }
    }

    //Funcion para navegar al login
    const goToLogin = () => {
        navigate('/login')
        if(isMenuVisible){
            toggleMenu()
        }
    }

    const goToVender = () => {

        if(isLogged){
            navigate('/vender')
        }else{
            navigate('/login')
        }
        
        if(isMenuVisible){
            toggleMenu()
        }
    }

    //Funcion para navegar al inicio
    const goToMain = () => {
        navigate('/')
        esconderAccederLogin(false)
        if(isMenuVisible){
            toggleMenu()
        }
        
    }

    //Efecto que se renderiza al inicio y cuando inicias sesion,
    //para saber si estas logeado y esconder o mostrar el boton Acceder
    //mediante el estado isLogged
    useEffect(() => {

        const idUsuario = JSON.parse(localStorage.getItem('idUsuario'))
        if(idUsuario === ''){
            setIsLogged(false)
        }else{
            setIsLogged(true)
        }

    } , [idUser])

    return(
        <>
        
            <header className="Header-wrapper">
            
                <div className="Header">
                    <div className="Header-wrapper-iconos">
                        <img onClick={toggleMenu} src="/lista.png" alt="" className="Wrapper-desplegable" />
                        <div onClick={goToMain} className="Wrapper-logo">
                            <img src="/logo.png" alt="" className='Logo' />
                        </div>
                    </div>
                    <div className="Wrapper-login-vender">
                        {(!isLogged && !isLoginPage) && <div onClick={goToLogin} className="Login-vender" >
                            <a href="">
                                <span className="Login-span">Acceder</span>
                            </a>
                        </div>}
                        <div onClick={goToVender} className={`Login-vender ${isLogged ? 'hideLogin' : ''}`}>
                            <a href="">
                                <span className="Vender-span">Vender</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div onClick={() => setIsMenuVisible(false)} className={isMenuVisible ? 'Fondo-negro' : ''}></div>

            </header>
            <MenuContext.Provider value={{goToLogin, goToMain, toggleMenu, isMenuVisible}}>
                <Menu />
            </MenuContext.Provider>
            
        </>
    )

}