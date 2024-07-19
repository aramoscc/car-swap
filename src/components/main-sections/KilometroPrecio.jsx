import { useContext } from "react"
import {TextoFiltroContext} from './SectionCompra'

//Componente que muestra el km o precio
export const KilometroPrecio = ({dato}) => {

    //Función obtenida de SectionCompra.jsx
    const {cambiarTextoFiltro} = useContext(TextoFiltroContext)

    //Funcion para cambiar el texto del filtro
    const cambiarTextoKmPrecio = () => {

        if(dato.includes('km')){
            cambiarTextoFiltro(dato, 'kilometros')
        }else{
            cambiarTextoFiltro(dato, 'precios')
        }

    }

    return(
        <div onClick={cambiarTextoKmPrecio} className="Kilometro-precio">
            <p className="Kilometro-precio-nombre">{dato}</p>
        </div>
    )
}