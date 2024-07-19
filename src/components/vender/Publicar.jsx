import { createContext, useRef, useState } from 'react'
import './Publicar.css'
import { PublicarDesplegable } from './PublicarDesplegable'

export const PublicarContext = createContext()

//Componente para publicar tu coche
export const Publicar = () => {

    const [seleccion, setSeleccion] = useState('')

    const [idMarca, setIdMarca] = useState('')

    const cambiarIdMarca = (id) => {

        setIdMarca(id)

    }

    const publicarRef = useRef()

    const toggleDesplegable = (opcion) => {

        if(seleccion === opcion){
            setSeleccion('')
        }else{
            if(opcion === 'modelos'){
                console.log('hola')
                const {current : form} = publicarRef
                setSeleccion(opcion)
            }else{
                setSeleccion(opcion)
            }    
        }
    }

    return(

        <>
            <PublicarContext.Provider value={{publicarRef, idMarca, cambiarIdMarca, toggleDesplegable}}>
            <section className="Publicar">
                <h1 className="Publicar-h1">Publica tu coche en CARSWAP</h1>
                <form className="Publicar-form" ref={publicarRef}>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Marca</h2>
                        <input onClick={() => toggleDesplegable('marcas')} name='marca' placeholder='Selecciona marca' readOnly  className="Publicar-input" />
                        {seleccion === 'marcas' && <PublicarDesplegable desplegable={'marcas'} />}
                    </div>

                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Modelo</h2>
                        <input onClick={() => toggleDesplegable('modelos')} name='modelo' placeholder='Selecciona modelo' readOnly className="Publicar-input" />
                        {seleccion === 'modelos' && <PublicarDesplegable desplegable={'modelos'} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Carrocería</h2>
                        <input placeholder='Introduce carrocería' name='carroceria' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Combustible</h2>
                        <input type='text' placeholder='Selecciona combustible' name='combustible' readOnly className="Publicar-input" />
                        {seleccion === 'combustibles' && <PublicarDesplegable desplegable={'combustibles'} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Año</h2>
                        <input type='number' min={1900} max={2024} placeholder='Introduce el año de matriculación' name='anio' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Versión</h2>
                        <input placeholder='Introduce la versión' name='version' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Tipo de cambio</h2>
                        <input type='text' placeholder='Selecciona el cambio' name='cambio' readOnly className="Publicar-input" />
                        {seleccion === 'cambios' && <PublicarDesplegable desplegable={'cambios'} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Etiqueta medioambiental</h2>
                        <input placeholder='Selecciona la etiqueta' name='etiqueta' readOnly className="Publicar-input" />
                        {seleccion === 'etiquetas' && <PublicarDesplegable desplegable={'etiquetas'} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Color exterior</h2>
                        <input type='text' placeholder='Seleciona el color' name='color' readOnly className="Publicar-input" />
                        {seleccion === 'colores' && <PublicarDesplegable desplegable={'colores'} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Kilómetros</h2>
                        <input type='number' min={0} name='km' placeholder='Introduce los kilómetros' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Precio</h2>
                        <input type='number' min={0} name='precio' placeholder='Introduce el precio' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Matrícula</h2>
                        <input placeholder='Introduce la matrícula' name='matricula' className="Publicar-input" />
                    </div>
                    
                    <div className="Submit-wrapper">
                        <input type="submit" value="Publicar anuncio" className='Submit-anuncio' />
                    </div>
                    
                    
                </form>
            </section>
            </PublicarContext.Provider>
        </>
    )

}