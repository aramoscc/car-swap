import { useLocation } from 'react-router-dom'
import './FichasTecnicas.css'
import { useEffect, useState } from 'react'
import { ModeloFicha } from './ModeloFicha'

//Componente que muestra los modelos con ficha tecnica
export const ModeloFichasTecnicas = () => {

    //Estado para guardar los modelos
    const [modelosFicha, setModelosFicha] = useState([])

    //Obtenemos los datos pasados por el estate al hacer navigate
    const location = useLocation()
    const {_id, marca} = location.state || null

    //Url del entorno
    const {VITE_HOST} = import.meta.env

    //funcion para obtener las marcas
    const getModelosFicha = async () => {

        const options = {
            method : 'get'
        }

        await fetch(`${VITE_HOST}/fichas-tecnicas/modelos/${_id}` , options)
        .then(res => res.json())
        .then(modelos => setModelosFicha(modelos))
        .catch(err => console.log(err))

    }

    //Efecto que llama a la funcion getModelosFicha cuando el id esta disponible
    useEffect(() => {

        if(_id){
            getModelosFicha()
        }
        
    } , [])

    return(
        <>
            <section className="FichasTecnicas">
                <h1 className="FichasTecnicas-h1">Fichas técnicas, fotos y precios de {marca} por modelo</h1>
                <ul className="FichasTecnicas-ul">
                    {modelosFicha?.length !== 0 && modelosFicha?.map(modelo => 
                        <ModeloFicha key={modelo._id} {...modelo} />
                    )}
                </ul>
            </section>
        </>
    )
}