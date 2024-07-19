

export const SubEspecificaciones = (props) => {

    const {nombre, valor} = props

    return(
        <>
            <span className="Spec-nombre subspec-nombre">{nombre}</span>
            <span className="Spec-valor subspec-valor">{valor}</span>
        </>
    )
}