import { useEffect, useRef, useState } from "react"
import { VersionVenta } from "./VersionVenta"
import './Vender.css'
import { useNavigate } from "react-router-dom"

//Componente de la pagina de venta
export const Vender = () => {

    //Estado para guardar las versiones
    const [versiones, setVersiones] = useState([])

    //Estado para determinar la visibilidad del desplegable
    const [isVisible, setIsVisible] =  useState(false)

    const navigate = useNavigate()

    const ulRef = useRef()

    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Función asincrona para obtener las versiones
    const getVersionesNombres = async () => {

        const options = {
            method : 'get'
        }

        await fetch(`${VITE_HOST}/versiones` , options)
        .then(res => res.json())
        .then(versiones => setVersiones(versiones))
        .catch(err => console.log(err))

    }

    const toggleVersiones = () => {
        if(isVisible){
            setIsVisible(false)
        }else{
            setIsVisible(true)
        }
    }

    //Funcion que navega a publicar 
    const goToPublicar = () => {

        navigate('/publicar')

    }

    //Efecto que llama a la función getVersionesNombres y pone visible el desplegable cuando se inicia el componente
    useEffect(() => {

        getVersionesNombres()
        setIsVisible(true)

    } , [])

    return(
        <>
            <section className="Vender">
                <h1 className="Vender-h1">Introduce una de las versiones disponibles y el anuncio se rellenará automáticamente.</h1>
                <div className="Vender-versiones">
                    <h2 onClick={toggleVersiones} className="Vender-versiones-h2">Versiones disponibles</h2>
                    <ul 
                        className={`Vender-versiones-ul ${isVisible ? 'isVisibleVersiones' : ''}`}
                        style={{
                            maxHeight: isVisible ? `${ulRef.current.scrollHeight}px` : '0px'
                        }}
                        ref={ulRef}
                    >
                        {versiones?.length !== 0 && versiones?.map(nombreVersion => 
                            <VersionVenta key={nombreVersion._id} {...nombreVersion} />
                        )}
                    </ul>
                </div>
                <button onClick={goToPublicar} className="Vender-btn">Continuar sin version</button>
            </section>
        </>
    )
}