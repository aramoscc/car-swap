import { useContext } from "react"
import { PublicarContext } from "./Publicar"

export const PublicarDesplegableOpcion = ({id, dato, desplegable}) => {

    const {cambiarIdMarca, publicarRef, toggleDesplegable, habilitarModelo} = useContext(PublicarContext)

    const seleccionarDato = () => {

        const {current : form} = publicarRef

        switch (desplegable) {
            case 'marcas':
                form['marca'].value = dato
                form['modelo'].value = ''
                cambiarIdMarca(id)
                toggleDesplegable(desplegable)
                habilitarModelo()
                break;
            case 'modelos':
                form['modelo'].value = dato
                toggleDesplegable(desplegable)
                break;
            case 'colores':
                form['color'].value = dato
                toggleDesplegable(desplegable)
                break;
            case 'etiquetas':
                form['etiqueta'].value = dato
                toggleDesplegable(desplegable)
                break;
            case 'combustibles':
                form['combustible'].value = dato
                toggleDesplegable(desplegable)
                break;
            case 'cambios':
                form['cambio'].value = dato
                toggleDesplegable(desplegable)
                break;
            case 'carrocerias':
                form['carroceria'].value = dato
                toggleDesplegable(desplegable)
                break;
            default:
                break;
        }

    }

    return(
        <>
        {dato !== '' && <li onClick={seleccionarDato} className="PublicarDesplegableOpcion">{dato}</li>}
        </>
    )
}