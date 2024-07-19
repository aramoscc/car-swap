import { useContext, useEffect, useState } from "react"
import { MarcaBuscar } from "./MarcaBuscar"
import {TextoFiltroContext} from './SectionCompra'

//Componente que muestra el desplegable de marcas
export const DesplegableMarcas = ({isVisebleMarcas}) => {

    //Estado para guardar las marcas
    const [marcas, setMarcas] = useState([])
    //Funciones obtenidas de SectionCompra
    const {toggleMarcas, quitarFiltro} = useContext(TextoFiltroContext)
    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Función asincrona para obtener las marcas desde la api
    const getMarcas = async () => {

        const controller = new AbortController()

        const options = {
            method : 'get',
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/fichas-tecnicas/marcas` , options)
        .then(res => res.json())
        .then(data => setMarcas(data))
        .catch(err => console.log(err))
        .finally(() => controller.abort())

    }

    //Función que se ejecuta al pulsar aceptar y esconde el desplegable
    const aceptarMarca = () => {
        toggleMarcas()
    }

    //Efecto para llamar a la función que obtiene las marcas
    useEffect(() => {
        getMarcas()  
    } , [])

    return(
        
        <div id="desplegable" className={`Desplegable ${isVisebleMarcas ? `isViseble` : ``}`}>
            <ul className="Desplegable-ul">
                {/* {`Desplegable-ul ${isVisebleMarcas ? `isVisebleUl` : ``}`} */}
                {marcas.lenght != 0 && marcas.map(marca => 
                    <MarcaBuscar key={marca._id} {...marca} />
                )}
            </ul>
            <div className="Wrapper-btn">
                <button onClick={() => quitarFiltro('marca')} className="Quitar-filtros-btn">Quitar filtros</button>
                <button onClick={aceptarMarca} className="Aceptar-btn">Aceptar</button>
            </div> 
        </div>

    )
}