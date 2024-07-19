import { useNavigate } from "react-router-dom";
import { MenuContext } from "../header/Header"; 
import { useContext, useEffect } from "react";
import { IdUsuarioContext } from '../../App'

//Componente de las opciones del menu
export const MenuOption = (props) => {

    //Props para mostrar los distintos datos
    const {titulo, icono, texto} = props
    //Estados y funciones obtenidos del contexto de Header.jsx y App.jsx
    const {goToLogin, goToMain, toggleMenu} = useContext(MenuContext)
    const {idUser, setIdUsuario} = useContext(IdUsuarioContext)

    const navigate = useNavigate()

    //Función para saber si estas logeado
    const isLogged = () => {

        if(idUser === ''){
            return false
        }else{
            return true
        }

    }

    //Función para definir las distintas acciones de pendiendo de la opcion seleccionada
    const seleccionarOpcion = () => {

        switch (titulo) {
            case 'Login':
                goToLogin()
                break;
            case 'Favoritos':
                if(isLogged()){
                    const mensaje = 'favoritos'
                    navigate('/anuncios', { state: {mensaje}})
                    toggleMenu()
                }else{
                    goToLogin()
                }
                break;
            case 'Busquedas':
                if(isLogged()){

                }else{
                    goToLogin()
                }
                break;
            case 'Anuncios':
                if(isLogged()){
                    const mensaje = 'mios'
                    navigate('/anuncios', { state: {mensaje}})
                    toggleMenu()
                }else{
                    goToLogin()
                }
                break;
            case 'Vender':
                if(isLogged()){
                    console.log('vender')
                    navigate('/vender')
                    toggleMenu()
                }else{
                    goToLogin()
                }
                break;
            case 'Cerrar':
                setIdUsuario('')
                goToMain()
                break;
            case 'Fichas':
                navigate('/fichas-tecnicas')
                toggleMenu()
                break;

            default:
                break;
        }

    }

    return(
        <li onClick={seleccionarOpcion} className="Options-li">
            <div className="Option-wrapper">
                <div className="Wrapper-img">
                    <img src={icono} alt="" className="Option-img" loading="lazy" />
                </div>
                <p className="Option-text">{texto}</p>
            </div>
        </li>
    )
}