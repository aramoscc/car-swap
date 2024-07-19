import './Publicar.css'
import { PublicarDesplegable } from './PublicarDesplegable'

//Componente para publicar tu coche
export const Publicar = () => {


    return(

        <>
            <section className="Publicar">
                <h1 className="Publicar-h1">Publica tu coche en CARSWAP</h1>
                <form className="Publicar-form">
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Marca</h2>
                        <input placeholder='Selecciona marca' disabled className="Publicar-input" />
                        {/* <PublicarDesplegable desplegable={'marcas'} /> */}
                    </div>

                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Modelo</h2>
                        <input placeholder='Selecciona modelo' disabled className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Carrocería</h2>
                        <input placeholder='Selecciona carrocería' disabled className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Combustible</h2>
                        <input placeholder='Selecciona combustible' disabled className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Año</h2>
                        <input placeholder='Introduce el año de matriculación' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Versión</h2>
                        <input placeholder='Introduce la versión' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Tipo de cambio</h2>
                        <input placeholder='Selecciona el cambio' disabled className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Etiqueta medioambiental</h2>
                        <input placeholder='Selecciona la etiqueta' disabled className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Color exterior</h2>
                        <input placeholder='Seleciona el color' disabled className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Kilómetros</h2>
                        <input placeholder='Introduce los kilómetros' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Precio</h2>
                        <input placeholder='Introduce el precio' className="Publicar-input" />
                    </div>
                    
                    <div className="Publicar-selection-wrapper">
                        <h2 className="Publicar-h2">Matrícula</h2>
                        <input placeholder='Introduce la matrícula' className="Publicar-input" />
                    </div>
                    
                </form>
            </section>
        </>
    )

}