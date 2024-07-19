import { useContext, useEffect, useState } from "react"
import { PublicarDesplegableOpcion } from "./PublicarDesplegableOpcion"
import './PublicarDesplegable.css'

import { PublicarContext } from "./Publicar"

//Componente del desplegable
export const PublicarDesplegable = ({desplegable}) => {

    //Estado para guardar los datos de desplegable seleccionado
    const [datosDesplegable, setDatosDesplegable] = useState([])

    //Estado para guardar los datos de modelos
    const [modelos, setModelos] = useState([])

    //Obtenemos el IdMarca de PublicarContext para mostrar los modelos adecuados
    const {idMarca} = useContext(PublicarContext)

    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Función asincrona para obtener los datos del desplegable desde la api
    const getDatosDesplegable = async (opcion) => {

        const controller = new AbortController()

        const options = {
            method : 'get',
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/${opcion}` , options)
        .then(res => res.json())
        .then(data => {
            if(desplegable === 'modelos'){
                setModelos(data)
            }else{
                setDatosDesplegable(data)
            }
        })
        .catch(err => console.log(err))
        .finally(() => controller.abort())

    }

    //Efecto para llamar a getDatosDesplegable y establecer el id de la marca seleccionada si nos encontramos en modelos
    useEffect(() => {
            
        if(desplegable === 'modelos'){
            getDatosDesplegable(`modelos/${idMarca}`)
        }else{
            getDatosDesplegable(desplegable)
        }

    } , [])

    return(
        <ul className="PublicarDesplegable">
            {desplegable === 'marcas' && datosDesplegable?.length !== 0 && datosDesplegable?.map(marca => 
                <PublicarDesplegableOpcion key={marca._id} id={marca._id} dato={marca.marca} desplegable={desplegable} />
            )}
            {desplegable === 'modelos' && modelos?.length !== 0 && modelos?.map(modelo=>
                <PublicarDesplegableOpcion key={modelo._id} dato={modelo.modelo} desplegable={desplegable} />
            )}
            {desplegable !== 'marcas' && datosDesplegable?.length !== 0 && datosDesplegable?.map(dato => 
                <PublicarDesplegableOpcion key={dato._id} dato={dato.nombre} desplegable={desplegable} />
            )}
        </ul>
    )
}