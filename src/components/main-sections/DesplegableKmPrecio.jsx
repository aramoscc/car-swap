import { useContext, useEffect, useState } from "react"
import './DesplegableKmPrecio.css'
import { KilometroPrecio } from "./KilometroPrecio"
import {TextoFiltroContext} from './SectionCompra'

//Componente que muestra el desplegable de km y precios
export const DesplegableKmPrecio = ({isVisebleKmPrecio, kmPrecio}) => {

    //Estado que guarda los precios
    const [precios , setPrecios] = useState([])
    //Estado que guarda los km
    const [kilometros , setKilometros] = useState([])
    //Funciones obtenidas de SectionCompra.jsx
    const {quitarFiltro, toggleKmPrecio} = useContext(TextoFiltroContext)
    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    const controller = new AbortController()

    //Función asincrona para obtener los km o precios
    const getKilometrosPrecios = async (kmPrecio) => {

        const options = {
            methos : 'get',
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/${kmPrecio}` , options)
        .then(res => res.json())
        .then(data => {
            if(kmPrecio === 'kilometros'){
                setKilometros(data)
            }else{
                setPrecios(data)
            }
        })
        .catch(err => console.log(err))
        // .finally(() => controller.abort())

    }

    //Función para ocultar el desplegable de km o precios
    const ocultarKmPrecio = () => {

        if(kmPrecio === 'precios'){
            toggleKmPrecio('precio')
        }else{
            toggleKmPrecio('km')
        }

    }

    //Efecto para obtener los km o precios 
    useEffect(() => {
        if(kmPrecio === 'kilometros'){
            getKilometrosPrecios('kilometros')
        }else{
            getKilometrosPrecios('precios')
        }     

    } , [kmPrecio])

    return(
        <>
            <div className={`Desplegable KmPrecio ${isVisebleKmPrecio ? `isVisibleKmPrecio` : ``} `}>
                <div className="Desde-hasta-wrapper">
                    <div className="Desde-hasta">
                        <span className="Desde-hasta-span">Desde</span>
                    </div>
                    <div className="Desde-hasta">
                        <span className="Desde-hasta-span">Hasta</span>
                    </div>
                </div>
                <ul className="Desplegable-ul PrecioKm">
                    {precios?.length != 0 && kmPrecio === 'precios' && precios.map(precio => 
                        <KilometroPrecio key={precio._id} dato={precio.precio} />
                    )}
                    {kilometros?.length != 0 && kmPrecio === 'kilometros' && kilometros.map(kilometro => 
                        <KilometroPrecio key={kilometro._id} dato={kilometro.kilometraje} />
                    )}
                </ul>
                <div className="Wrapper-btn">
                    <button onClick={() => quitarFiltro(kmPrecio)} className="Quitar-filtros-btn">Quitar filtros</button>
                    <button onClick={ocultarKmPrecio} className="Aceptar-btn">Aceptar</button>
                </div> 
            </div>
        </>
    )
}