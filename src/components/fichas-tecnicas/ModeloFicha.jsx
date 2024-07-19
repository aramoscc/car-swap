import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ModeloFicha = (props) => {

    const {_id, modelo, imagen} = props

    const [img, setImg] = useState()

    const navigate = useNavigate()

    const goToVersionesFicha = () => {

        navigate('/fichas-tecnicas/versiones', { state: { _id, modelo } })

    }

    useEffect(() => {

        if(imagen === ''){
            setImg('/no-photo.png')
        }else{
            setImg(imagen)
        }

    }, [])

    return(
        <li onClick={goToVersionesFicha} className="MarcaFicha">
            <div className="MarcaFicha-img-wrapper modelo-img">
                <img src={img} alt={modelo} className="MarcaFicha-img " loading="lazy" />
            </div>
            <h2 className="MarcaFicha-h2">{modelo}</h2>
        </li>
    )
    
}