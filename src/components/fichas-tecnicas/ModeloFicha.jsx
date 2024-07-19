import { useNavigate } from "react-router-dom"

export const ModeloFicha = (props) => {

    const {_id, modelo, imagen} = props

    const navigate = useNavigate()

    const goToVersionesFicha = () => {

        navigate('/fichas-tecnicas/versiones', { state: { _id, modelo } })

    }

    return(
        <li onClick={goToVersionesFicha} className="MarcaFicha">
            <div className="MarcaFicha-img-wrapper modelo-img">
                <img src={imagen} alt={modelo} className="MarcaFicha-img " loading="lazy" />
            </div>
            <h2 className="MarcaFicha-h2">{modelo}</h2>
        </li>
    )
    
}