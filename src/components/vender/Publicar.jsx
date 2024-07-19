import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './Publicar.css'
import { PublicarDesplegable } from './PublicarDesplegable'
import { IdUsuarioContext } from '../../App'
import { useLocation, useNavigate } from 'react-router-dom'

export const PublicarContext = createContext()

//Componente para publicar tu coche
export const Publicar = () => {

    //Estado para para saber el input seleccionado
    const [seleccion, setSeleccion] = useState('')
    //Estado para guardar el id de la amarca seleccionada
    const [idMarca, setIdMarca] = useState('')
    //Estado para habilitar el modelo cuando selecciones la marca
    const [isDisabledModelo, setIsDisabledModelo] = useState(true)
    //Estado para guardar el id del usuario
    const [idUsuario, setIdUsuario] = useState('')
    //Estado de erro para campo vacio
    const [isError, setIsError] = useState(false)
    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    const navigate = useNavigate()

    const {idUser} = useContext(IdUsuarioContext)

    //Funcion para cambiar el estado idMarca
    const cambiarIdMarca = (id) => {

        setIdMarca(id)

    }

    //Funciaon para habilitar el modelo
    const habilitarModelo = () => {

        setIsDisabledModelo(false)

    }

    //Referencia del formulario
    const publicarRef = useRef()

    const location = useLocation()
    const ficha = location.state?.ficha

    //funcion para mostrar o esconder el desplegable
    const toggleDesplegable = (opcion) => {

        if(seleccion === opcion){
            setSeleccion('')
        }else{
            setSeleccion(opcion)   
        }
    }

    const getInfoForm = (e) => {

        e.preventDefault()

        const {current : form} = publicarRef

        if(
            form['marca'].value === ''||
            form['modelo'].value === ''|| 
            form['color'].value === ''||
            form['etiqueta'].value === ''||
            form['combustible'].value === ''||
            form['cambio'].value === ''||
            form['carroceria'].value === ''||
            form['anio'].value === ''||
            form['km'].value === ''||
            form['precio'].value === ''||
            form['matricula'].value === ''){
                setIsError(true)
            }

        const anuncio = {
            id_usuario : idUsuario,
            marca : form['marca'].value,
            modelo : form['modelo'].value,
            color : form['color'].value,
            etiqueta : form['etiqueta'].value,
            combustible : form['combustible'].value,
            cambio : form['cambio'].value,
            carroceria : form['carroceria'].value,
            anio_matriculacion : form['anio'].value,
            kilometros : form['km'].value,
            precio : form['precio'].value,
            matricula : form['matricula'].value,
            img : '',
            version : form['version'].value
        }

        publicarAnuncio(anuncio)
    }

    const anuncioFicha = (ficha) => {

        const {marca, modelo, version, combustible, cambio, carroceria } = ficha

        const {current : form} = publicarRef

        form['marca'].value = marca
        form['modelo'].value = modelo
        form['combustible'].value = combustible
        form['cambio'].value = cambio
        form['carroceria'].value = carroceria
        form['version'].value = version

    }

    const publicarAnuncio = async (anuncio) => {

        const options = {
            method : 'post',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(anuncio),
        }

        await fetch(`${VITE_HOST}/publicar` , options)
        .then(res => res.json())
        .then(correcto => {
            const mensaje = 'mios'
            navigate('/anuncios', { state: {mensaje}})
        })
        .catch(err => console.log(err))

    }

    useEffect(() => {
        setIdUsuario(idUser)
        if(ficha){
            anuncioFicha(ficha)
        }
    } , [idUser, ficha])

    return(

        <>
            <PublicarContext.Provider value={{publicarRef, idMarca, cambiarIdMarca, toggleDesplegable, habilitarModelo}}>
            <section className="Publicar">
                <h1 className="Publicar-h1">Publica tu coche en CARSWAP</h1>
                <form onSubmit={getInfoForm} className="Publicar-form" ref={publicarRef}>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Marca</h2>
                        <input onClick={() => toggleDesplegable('marcas')} name='marca' placeholder='Selecciona marca' readOnly  className="Publicar-input" />
                        {seleccion === 'marcas' && <PublicarDesplegable desplegable={seleccion} />}
                    </div>

                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Modelo</h2>
                        <input onClick={() => toggleDesplegable('modelos')} name='modelo' placeholder='Selecciona modelo' disabled={isDisabledModelo} readOnly className="Publicar-input" />
                        {seleccion === 'modelos' && <PublicarDesplegable desplegable={seleccion} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Carrocería</h2>
                        <input onClick={() => toggleDesplegable('carrocerias')} placeholder='Selacciona la carrocería' name='carroceria' readOnly className="Publicar-input" />
                        {seleccion === 'carrocerias' && <PublicarDesplegable desplegable={seleccion} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Combustible</h2>
                        <input onClick={() => toggleDesplegable('combustibles')} type='text' placeholder='Selecciona combustible' name='combustible' readOnly className="Publicar-input" />
                        {seleccion === 'combustibles' && <PublicarDesplegable desplegable={seleccion} />}
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
                        <input onClick={() => toggleDesplegable('cambios')} type='text' placeholder='Selecciona el cambio' name='cambio' readOnly className="Publicar-input" />
                        {seleccion === 'cambios' && <PublicarDesplegable desplegable={seleccion} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Etiqueta medioambiental</h2>
                        <input onClick={() => toggleDesplegable('etiquetas')} placeholder='Selecciona la etiqueta' name='etiqueta' readOnly className="Publicar-input" />
                        {seleccion === 'etiquetas' && <PublicarDesplegable desplegable={seleccion} />}
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Color exterior</h2>
                        <input onClick={() => toggleDesplegable('colores')} type='text' placeholder='Seleciona el color' name='color' readOnly className="Publicar-input" />
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
                    {isError && <p className="Error-publicar">Rellena los campos vacios</p>}
                    <div className="Submit-wrapper">
                        <input type="submit" value="Publicar anuncio" className='Submit-anuncio' />
                    </div>
                    
                    
                </form>
            </section>
            </PublicarContext.Provider>
        </>
    )

}