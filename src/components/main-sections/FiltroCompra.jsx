import { useEffect, useState } from "react"

//Componente que muestra los filtros
export const FiltroCompra = ({decoradorFiltro, toggleFiltro, textoFiltro}) => {

    useEffect(() => {

    } , [])

    return(
        <div onClick={() => {toggleFiltro(decoradorFiltro)}} className={`Filtro ${decoradorFiltro}`}>
            <span className="Filtro-span">{textoFiltro}</span>
            <div className="Flecha-desplegable">
                <img src="/flecha-desplegable.png" alt="" 
                className="Flecha-img" />
            </div>  
        </div>
    )

}