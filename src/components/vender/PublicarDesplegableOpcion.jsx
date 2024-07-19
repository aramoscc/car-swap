import { useContext } from "react"
import { PublicarContext } from "./Publicar"

export const PublicarDesplegableOpcion = ({id, dato, desplegable}) => {

    const {cambiarIdMarca, publicarRef, toggleDesplegable} = useContext(PublicarContext)

    const seleccionarDato = () => {

        if(desplegable === 'marcas'){
            const {current : form} = publicarRef
            form['marca'].value = dato
            cambiarIdMarca(id)
            toggleDesplegable(desplegable)
        }

    }

    return(
        <li onClick={seleccionarDato} className="PublicarDesplegableOpcion">{dato}</li>
    )
}