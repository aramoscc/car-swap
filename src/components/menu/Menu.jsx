import { useContext, useEffect, useState } from "react"
import './Menu.css'
import { MenuOption } from "./MenuOption"
import { IdUsuarioContext } from "../../App"
import { MenuContext } from "../header/Header"

//Componente que muestra el menu desplegable
export const Menu = () => {

    //Estado para guerdar los datos del menú
    const [menu, setMenu] = useState([])
    //Estado para saber si estas logeado
    const [isLogged, setIsLogged] = useState(false)

    //Estados obtenidos del contexto de Header.jsx y App.jsx
    const {idUser} = useContext(IdUsuarioContext)
    const {isMenuVisible} = useContext(MenuContext)

    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Función asincrona para obtener los datos del menu dependiendo si esta logeado
    const getMenu = async (login) => {

        const controller = new AbortController()

        const options = {
            method : 'get',
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/menu/${login}`, options)
        .then(res => res.json())
        .then(data => setMenu(data))
        .catch(err => console.log(err))
        .finally(() => controller.abort())

    }

    //Efecto que se renderiza al inicio y cuando inicias sesion,
    //para obtener los datos del menu dependiendo si estas logeado o no
    useEffect(() => {

        const idUsuario = JSON.parse(localStorage.getItem('idUsuario'))
        if(idUsuario === ''){
            getMenu(false)
        }else{
            getMenu(true)
        }
    } , [idUser])

    return(
        <div className={`Menu ${isMenuVisible ? `isVisible` : ``}`}>
            <div className="Menu-user">
                <img src="/usuario-cuenta.png" alt="" className='User-img' />
                <p className="User-p">Mi cuenta</p>
            </div>
            <div className="Menu-options">
                <ul className="Options-ul">
                    {menu?.length != 0 && menu?.map(opcion => 
                        <MenuOption key={opcion._id} {...opcion}/>
                    ) }
                </ul>
            </div>
        </div>
    )

}