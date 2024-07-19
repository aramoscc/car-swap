import { SubEspecificaciones } from "./SubEspecificaciones"
import { v4 as uuidv4 } from "uuid"

export const Especificaciones = (props) => {

    const {nombre, valor} = props

    return(
        <>
            <li className="Spec">
                <span className="Spec-nombre">{nombre}</span>
                {typeof(valor) === 'object' 
                    ?
                    <span className="Spec-valor subspec">
                        {valor.map(subspec => 
                            <SubEspecificaciones key={uuidv4()} {...subspec} />
                        )}
                    </span>
                    :
                    <span className="Spec-valor">{valor}</span>
                }
                
            </li>
        </>
    )

}