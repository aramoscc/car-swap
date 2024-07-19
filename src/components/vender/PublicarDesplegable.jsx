import { useContext, useEffect, useState } from "react"
import { PublicarDesplegableOpcion } from "./PublicarDesplegableOpcion"
import './PublicarDesplegable.css'

import { PublicarContext } from "./Publicar"

export const PublicarDesplegable = ({desplegable}) => {

    const [datosDesplegable, setDatosDesplegable] = useState([])

    const {publicarRef, idMarca, cambiarIdMarca} = useContext(PublicarContext)

    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Función asincrona para obtener las marcas desde la api
    const getDatosDesplegable = async (opcion) => {

        const controller = new AbortController()

        const options = {
            method : 'get',
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/${opcion}` , options)
        .then(res => res.json())
        .then(data => {
            if(desplegable === 'marcas'){
                setDatosDesplegable(data)
            }else{
                setDatosDesplegable(data)
            }
        })
        .catch(err => console.log(err))
        .finally(() => controller.abort())

    }

    useEffect(() => {

        if(desplegable === 'marcas'){
            getDatosDesplegable('marcas')
        }else if(desplegable === 'modelos'){
            getDatosDesplegable(`modelos/${idMarca}`)
        }

    } , [])

    return(
        <ul className="PublicarDesplegable">
            {datosDesplegable?.length !== 0 && datosDesplegable?.map(marca => 
                <PublicarDesplegableOpcion key={marca._id} id={marca._id} dato={marca.marca} desplegable={desplegable} />
            )}
            {desplegable === 'modelos' && datosDesplegable?.length !== 0 &&datosDesplegable?.map(modelo=>
                <PublicarDesplegableOpcion key={modelo._id} dato={modelo.modelo} />
            )}
        </ul>
    )
}