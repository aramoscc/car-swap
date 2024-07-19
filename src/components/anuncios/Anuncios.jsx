import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { IdUsuarioContext } from "../../App";
import { Anuncio } from "./Anuncio";
import './Anuncios.css'

export const AnunciosContext = createContext()

//Componente para mostrar los anuncios
export const Anuncios = () => {

    //Obtenemos los filtros para mostrar anuncios
    const location = useLocation()
    const mensaje = location.state?.mensaje

    // const [mensajePagina, setMensajePagina] = useState('')

    //Estado para guardar los anuncios
    const [anuncios, setAnuncios] = useState([])

    //Estado para cambiar el texto del boton
    const [textoBtn, setTextoBtn] = useState('')

    //Estado para cambiar el titulo
    const [titulo, setTitulo] = useState('')

    const {idUser} = useContext(IdUsuarioContext)

    //Url del entorno
    const {VITE_HOST} = import.meta.env

    const getMisAnuncios = async () => {

        const options = {
            method : 'get'
        }

        await fetch(`${VITE_HOST}/mis-anuncios/${idUser}` , options)
        .then(res => res.json())
        .then(anuncios => setAnuncios(anuncios))
        .catch(err => console.log(err))

    }

    const getFavoritos = async () => {

        const options = {
            method : 'get'
        }

        await fetch(`${VITE_HOST}/favoritos/${idUser}` , options)
        .then(res => res.json())
        .then(anuncios => setAnuncios(anuncios))
        .catch(err => console.log(err))

    }

    const getAnuncios = async (marca) => {

        const options = {
            method : 'post',
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify({marca})
        }

        await fetch(`${VITE_HOST}/anuncios` , options)
        .then(res => res.json())
        .then(anuncios => setAnuncios(anuncios))
        .catch(err => console.log(err))

    }

    useEffect(() => {

        if(idUser !== ''){
            if(mensaje === 'mios'){
                getMisAnuncios()
                setTitulo('Mis anuncios')
                setTextoBtn('Eliminar anuncio')
            }else if(mensaje === 'favoritos'){
                getFavoritos()
                setTitulo('Favoritos')
                setTextoBtn('Eliminar de favoritos')
            }else if(mensaje !== ''){
                getAnuncios(mensaje)
                setTitulo('Anuncios')
                setTextoBtn('Añadir a favoritos')
            }
        }

    } , [idUser, mensaje])

    return(
        <AnunciosContext.Provider value={{textoBtn, getMisAnuncios, getFavoritos, mensaje}}>
        <section className="Anuncios">
            <h1 className="Anuncios-h1">{titulo}</h1>
            <ul className="Anuncios-ul">
                {anuncios?.length !== 0 && anuncios?.map(anuncio => 
                    <Anuncio key={anuncio._id} {...anuncio} />
                )}
            </ul>
        </section>
        </AnunciosContext.Provider>
    )

} 