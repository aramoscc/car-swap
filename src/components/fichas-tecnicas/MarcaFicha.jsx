import { useNavigate } from "react-router-dom"

//Componente de marca con ficha tecnica
export const MarcaFicha = (props) => {

    const {_id, marca, imagen} = props

    const navigate = useNavigate()

    //Funcion para navegar a los modelos con ficha tecnica
    const goToModelosFicha = () => {

        navigate('/fichas-tecnicas/modelos', { state: { _id, marca } })

    }

    return(
        <li onClick={goToModelosFicha} className="MarcaFicha">
            <div className="MarcaFicha-img-wrapper">
                <img src={imagen} alt={marca} className="MarcaFicha-img" loading="lazy" />
            </div>
            <h2 className="MarcaFicha-h2">{marca}</h2>
        </li>
    )
    
}