import { useLocation } from 'react-router-dom'
import './FichasTecnicas.css'
import { useEffect, useState, version } from 'react'
import { Version } from './Version'
import './VersionFichasTecnicas.css'

export const VersionFichasTecnicas = () => {

    const [versionesFicha, setVersionFicha] = useState([])

    const location = useLocation()
    const {_id, modelo} = location.state || null

    const {VITE_HOST} = import.meta.env

    const getVersionesFicha = async () => {

        const options = {
            method : 'get'
        }

        await fetch(`${VITE_HOST}/fichas-tecnicas/versiones/${_id}`)
        .then(res => res.json())
        .then(versiones => setVersionFicha(versiones))
        .catch(err => console.log(err))
    } 

    useEffect(() => {

        getVersionesFicha()

    } , [])

    return(
        <>
            <section className="FichasTecnicas">
                <h1 className="FichasTecnicas-h1">Fichas técnicas y precio del {modelo}</h1>
                <ul className="Versiones-ul">
                    {versionesFicha?.length !== 0 && versionesFicha?.map(version => 
                        <Version key={version._id} {...version} />
                    )}
                </ul>
            </section>
        </>
    )
}