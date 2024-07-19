
//Componente que muestra las versiones
export const VersionVenta = (props) => {

    const {version} = props

    return(
        <>
            <li className="Version">{version}</li>
        </>
    )
}