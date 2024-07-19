import { useEffect, useState } from "react"
import { PublicarDesplegableOpcion } from "./PublicarDesplegableOpcion"
import './PublicarDesplegable.css'

export const PublicarDesplegable = ({desplegable}) => {

    const [marcas, setMarcas] = useState([])

    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Función asincrona para obtener las marcas desde la api
    const getMarcas = async () => {

        const controller = new AbortController()

        const options = {
            method : 'get',
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/marcas` , options)
        .then(res => res.json())
        .then(data => setMarcas(data))
        .catch(err => console.log(err))
        .finally(() => controller.abort())

    }

    useEffect(() => {

        if(desplegable === 'marcas'){
            getMarcas()
        }

    } , [])

    return(
        <ul className="PublicarDesplegable">
            {marcas?.length !== 0 && marcas?.map(marca => 
                <PublicarDesplegableOpcion dato={marca.marca} />
            )}
        </ul>
    )
}