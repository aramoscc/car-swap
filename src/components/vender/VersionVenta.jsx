import { useNavigate } from "react-router-dom"

//Componente que muestra las versiones
export const VersionVenta = (props) => {

    const {_id, version} = props

    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    

    const navigate = useNavigate()

    const getFicha = async (id) => {

        const options = {
            method : 'get'
        }

        await fetch(`${VITE_HOST}/ficha/${id}` , options)
        .then(res => res.json())
        .then(ficha => navigate('/publicar', {state : {ficha : ficha}}))
        .catch(err => console.log(err))

    }

    return(
        <>
            <li onClick={() => getFicha(_id)} className="VersionVenta">{version}</li>
        </>
    )
}