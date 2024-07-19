import { useRef, useState } from "react"
import { Especificaciones } from "./Especificaciones"
import { v4 as uuidv4 } from "uuid"

export const VersionCategoria = (props) => {

    const {categoria, specs} = props

    const [isSpecsVisible, setIsSpecsVisible] = useState(false)
    const contentRef = useRef()

    const toggleSpecs = () => {

        if(isSpecsVisible){
            setIsSpecsVisible(false)
        }else{
            setIsSpecsVisible(true)
        }

    }

    return(
        <>
            <li className="Categoria">
                <h2 onClick={toggleSpecs} className={`Categoria-h2 ${isSpecsVisible ? 'isVisibleCat' : ''}`}>{categoria}</h2>
                <ul 
                    className={`Categoria-ul ${isSpecsVisible ? 'isVisibleSpecs' : ''}`}
                    style={{
                        maxHeight: isSpecsVisible ? `${contentRef.current.scrollHeight}px` : '0px'
                    }}
                    ref={contentRef}
                    >
                    {specs?.lenght !== 0 && specs.map(spec => 
                        <Especificaciones key={uuidv4()} {...spec} />
                    )}
                </ul>
            </li>
        </>
    )
}