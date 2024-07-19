import { useContext } from "react"
import {TextoFiltroContext} from './SectionCompra'

//Componente para mostra las marcas
export const MarcaBuscar = (props) => {

    //Prop de la marca
    const {marca} = props

    //Función obtenida de SectionCompra.jsx
    const {cambiarTextoFiltro} = useContext(TextoFiltroContext)

    //Función para cambiar el texto del filtro
    const cambiarTextoMarca = () => {

        cambiarTextoFiltro(marca, 'marca')

    }

    return(
        <div className="Marca" onClick={cambiarTextoMarca}>
            <p className="Marca-nombre">{marca}</p>
        </div>
    )
}