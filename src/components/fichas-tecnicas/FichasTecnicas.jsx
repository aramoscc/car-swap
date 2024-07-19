import { useEffect, useState } from "react"
import './FichasTecnicas.css'
import { MarcaFicha } from "./MarcaFicha"

//Componente que muestra las marcas con ficha tecnica disponibles
export const FichasTecnicas = () => {

    //Estado para guardar las marcas
    const [marcasFicha, setMarcasFicha] = useState([])

    const controller = new AbortController()

    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Función asincrona para obtener las marcas
    const getMarcasFichas = async () => {

        const options = {
            method : 'get',
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/fichas-tecnicas/marcas` , options)
        .then(res => res.json())
        .then(marcas => setMarcasFicha(marcas))
        .catch(err => console.log(err))
        // .finally(() => controller.abort())

    } 

    //Efecto que llama a la función getMarcasFichas cuando se inicia el componente
    useEffect(() => {
        getMarcasFichas()
    } , [])

    return(
        <>
            <section className="FichasTecnicas">
                <h1 className="FichasTecnicas-h1">Características, fotos y precios de coches nuevos y descatalogados</h1>
                <ul className="FichasTecnicas-ul">
                    {marcasFicha?.length !== 0 && marcasFicha?.map(marca => 
                        <MarcaFicha key={marca._id} {...marca} />
                    )}
                </ul>
            </section>
        </>
    )

}