import { VersionCategoria } from "./VersionCategoria"
import {v4 as uuidv4} from 'uuid'

export const Version = (props) => {

    const {version, ficha} = props

    return(
        <>
            <li className="Version">
                <div className="Version-wrapper">
                    <h1 className="Version-h1">{version}</h1>
                    <ul className="Version-ul">
                        {ficha?.lenght !== 0 && ficha.map(categoria =>
                            <VersionCategoria key={uuidv4()} {...categoria} />
                        )}
                    </ul>
                </div>
            </li>
        </>
    )

}