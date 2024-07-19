import { createContext, useContext, useEffect, useState } from 'react'
import './SectionCompra.css'
import { FiltroCompra } from './FiltroCompra'
import { CompraVenta } from './CompraVenta'
import { DesplegableMarcas } from './DesplegableMarcas'
import { DesplegableKmPrecio } from './DesplegableKmPrecio'
import { FondoImagen } from '../fondo-img/FondoImagen'
import { useNavigate } from 'react-router-dom'
import { IdUsuarioContext } from '../../App'

//Contexto para pasar las funciones que gestionan el texto de los filtros y la visibilidad de los desplegables 
export const TextoFiltroContext = createContext()

export const SectionCompra = () => {

    //Estado para definir la visibilidad del desplegable de marcas
    const [isVisebleMarcas, setIsVisebleMarcas] = useState(false)
    //Estado para definir la visibilidad del desplegable de kilómetros y precio
    const [isVisebleKmPrecio , setIsVisebleKmPrecio] = useState(false)
    //Estado para identificar en el componente DesplegableKmPrecio si se trata de los kilómetros o del precio
    const [kmPrecio, setKmPrecio] = useState('')  
    //Estado para modificar el texto del filtro de marcas
    const [textoMarca, setTextoMarca] = useState('')
    //Estado para modificar el texto del filtro de kilómetros
    const [textoKm, setTextoKm] = useState('')
    //Estado para modificar el texto del filtro de precios
    const [textoPrecio, setTextoPrecio] = useState('')

    const {idUser} = useContext(IdUsuarioContext)

    const navigate = useNavigate()

    
    //Funcion para gestionar la visibilidad de las marcas
    const toggleMarcas = () => {

        if(isVisebleKmPrecio){
            setIsVisebleKmPrecio(false)
        }
        
        if(isVisebleMarcas){
            setIsVisebleMarcas(false)
            toggleScroll(true)
        }else{
            if(isVisebleKmPrecio){
                setIsVisebleMarcas(true) 
            }else{
                setIsVisebleMarcas(true) 
                toggleScroll(false)
            }
            
            
        }
    }

    //Funcion para gestionar la visibilidad de los kilómetros y precios
    const toggleKmPrecio = (filtro) => {

        if(isVisebleMarcas){
            setIsVisebleMarcas(false)
        }
        if(isVisebleKmPrecio){
            if((kmPrecio === 'kilometros' && filtro === 'km') || (kmPrecio === 'precios' && filtro === 'precio')){
                setIsVisebleKmPrecio(false)
                toggleScroll(true)
            }else{
                mostrarDesplegableKmPrecio(filtro)
            }        
        }else{

            mostrarDesplegableKmPrecio(filtro)
            toggleScroll(false)
        }
    }

    //Función para mostrar los km o los precios
    const mostrarDesplegableKmPrecio = (filtro) =>{
        if(filtro === 'km'){
            setKmPrecio('kilometros')
        }else{
            setKmPrecio('precios')
        }
        setIsVisebleKmPrecio(true)
    }

    //Función que gestiona la visibilidad de la barra de scroll
    const toggleScroll = (isScrollVisible) => {

        if(isScrollVisible){
            document.body.style.overflow = '';
        }else{    
            const element = document.getElementById('desplegable');
            element.scrollIntoView({behavior: 'smooth' });
            document.body.style.overflow = 'hidden';
        }

    }

    //Función para cambiar el texto de los filtro
    const cambiarTextoFiltro = (texto, filtro) => {

        if(filtro === 'marca'){
            setTextoMarca(texto)
        }else if(filtro === 'kilometros'){
            setTextoKm(texto)
        }else if(filtro === 'precios'){
            setTextoPrecio(texto)
        }

    }

    //Función para quitar los filtros
    const quitarFiltro = (filtro) => {

        console.log(filtro)
        if(filtro === 'marca'){
            cambiarTextoFiltro('Marca', filtro)
        }else if(filtro === 'kilometros'){
            cambiarTextoFiltro('Kilómetros', filtro)
        }else if(filtro === 'precios'){
            cambiarTextoFiltro('Precio', filtro)
        }

    }

    const mostrarAnuncios = () => {
        if(idUser === ''){
            navigate('/login')
        }else{
            const mensaje = textoMarca
            navigate('/anuncios', { state: {mensaje}})
        }
        
    }

    //Efecto para establecer el texto inicial de los filtros
    useEffect(() => {

        setTextoKm('Kilómetros')
        setTextoPrecio('Precio')
        setTextoMarca('Marca')

    } , [])

    return(
        
        <section className="Compra-venta-section">

            <div onClick={
                () => {setIsVisebleKmPrecio(false);
                setIsVisebleMarcas(false)}} 
                className={isVisebleMarcas || isVisebleKmPrecio ? 'fondo-blanco' : ''}>
            </div>

            <FondoImagen />

            <div className="Compra-venta">
                <div className="Compra-venta-wrapper">
                    <div className="Selection-wrapper">
                        <CompraVenta option={'Comprar'} />
                        {/* <CompraVenta option={'Venta'} /> */}
                    </div>        
                    <div className="Compra-filtros">
                        <FiltroCompra textoFiltro={textoMarca} toggleFiltro={toggleMarcas} decoradorFiltro={''}/> 
                        <div className="Filtros-km-precio">
                            <FiltroCompra textoFiltro={textoKm} toggleFiltro={toggleKmPrecio} decoradorFiltro={'km'}/> 
                            <FiltroCompra textoFiltro={textoPrecio} toggleFiltro={toggleKmPrecio} decoradorFiltro={'precio'}/> 
                        </div>
                        <button onClick={mostrarAnuncios} className="Compra-btn">Mostrar resultados</button>
                    </div>     
                </div>
                <TextoFiltroContext.Provider value={{cambiarTextoFiltro, toggleMarcas, toggleKmPrecio, quitarFiltro}}>
                    <DesplegableMarcas isVisebleMarcas={isVisebleMarcas} />
                    <DesplegableKmPrecio isVisebleKmPrecio={isVisebleKmPrecio} kmPrecio={kmPrecio} />
                </TextoFiltroContext.Provider>
                
            </div>
            
            
            
        </section>
        
        
        
    )

}



