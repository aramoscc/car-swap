import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import { Header } from '../header/Header'
import './AppRoutes.css'
import { Main } from '../main/Main'
import { Login } from '../login/Login'
import { FichasTecnicas } from '../fichas-tecnicas/FichasTecnicas'
import { ModeloFichasTecnicas } from '../fichas-tecnicas/ModeloFichasTecnicas'
import { VersionFichasTecnicas } from '../fichas-tecnicas/VersionFichasTecnicas'
import { Vender } from '../vender/Vender'
import { Publicar } from '../vender/Publicar'

//Componente para definir las rutas de la aplicación
export const AppRoutes = () => {

    return(
        <BrowserRouter>

        <div className="App-container">

            <Header />

            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path='/fichas-tecnicas' element={<FichasTecnicas />} />
                <Route path='/fichas-tecnicas/modelos' element={<ModeloFichasTecnicas />} />
                <Route path='/fichas-tecnicas/versiones' element={<VersionFichasTecnicas />} />
                <Route path='/vender' element={<Vender />} />
                <Route path='/publicar' element={<Publicar />} />
            </Routes>

        </div>

        </BrowserRouter>
    )

}