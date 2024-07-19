import { useContext, useEffect, useState } from "react"
import { AnunciosContext } from "./Anuncios"
import { IdUsuarioContext } from "../../App";

export const Anuncio = (props) => {

    const {_id, color, matricula, carroceria, marca, modelo, version, etiqueta, cambio, kilometros, precio, combustible, anio_matriculacion} = props

    const {textoBtn, getMisAnuncios, mensaje, getFavoritos} = useContext(AnunciosContext)

    const {idUser} = useContext(IdUsuarioContext)

    //Url del entorno
    const {VITE_HOST} = import.meta.env

    const deleteAnuncio = async () => {

        const options = {
            method : 'delete'
        }

        await fetch(`${VITE_HOST}/anuncio/delete/${_id}` , options)
        .then(res => res.json())
        .then(correcto => {
            if(correcto){
                console.log(correcto)
                getMisAnuncios()
            }
        })
        .catch(err => console.log(err))

    } 

    const deleteFavorito = async () => {

        const options = {
            method : 'delete'
        }

        await fetch(`${VITE_HOST}/favorito/delete/${_id}` , options)
        .then(res => res.json())
        .then(correcto => {
            if(correcto){
                console.log(correcto)
                getFavoritos()
            }
        })
        .catch(err => console.log(err))

    } 

    const addFavorito = async () => {

        const anuncio = {
            id_usuario : idUser,
            marca : marca,
            modelo : modelo,
            color : color,
            etiqueta : etiqueta,
            combustible : combustible,
            cambio : cambio,
            carroceria : carroceria,
            anio_matriculacion : anio_matriculacion,
            kilometros : kilometros,
            precio : precio,
            matricula : matricula,
            img : '',
            version : version
        }

        const options = {
            method : 'post',
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(anuncio)
        }

        await fetch(`${VITE_HOST}/favoritos` , options)
        .then(res => res.json())
        .then(correcto => {
            if(correcto){
                getFavoritos()
            }
        })
        .catch(err => console.log(err))

    } 

    const accionBtn = () => {

        console.log(mensaje)

        if(mensaje === 'mios'){
            deleteAnuncio()
        }else if(mensaje === 'favoritos'){
            deleteFavorito()
        }else{
            addFavorito()
        }

    }

    return(
        <li className="Anuncio">
            <div className="Anuncio-img-wrapper">
                <img src="/no-photo.png" alt="Imagen" className="Anuncio-img" />
            </div>
            <div className="Anuncio-info">
                <h3 className="Info-precio">{precio} €</h3>
                <div className="Info-titulo">
                    <span className="Info-titulo-span">{marca}</span>
                    <span className="Info-titulo-span">{modelo}</span>
                    <span className="Info-titulo-span">{version}</span>
                </div>
                <div className="Info-features">
                    <span className="Info-features-span">{combustible}</span>
                    <span className="Info-features-span">{anio_matriculacion}</span>
                    <span className="Info-features-span">{kilometros}</span>
                    <span className="Info-features-span">{cambio}</span>
                    <span className="Info-features-span">{etiqueta}</span>
                </div>
            </div>
            <button onClick={accionBtn} className="Anuncio-btn">{textoBtn}</button>
        </li>
    )
}