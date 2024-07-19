import { useContext, useEffect, useRef, useState } from "react"
import { FondoImagen } from "../fondo-img/FondoImagen"
import './Login.css'
import {IdUsuarioContext} from '../../App'
import { useNavigate  } from "react-router-dom"

//Componente de login, registro y modificacion de usuarios
export const Login = () => {

    //Estado para saber si es login o registro
    const [isLogin , setIsLogin] = useState(false)
    //Estado para saber si hay algun error global en el inicio o registro
    const [isError, setIsError] = useState(false)
    //Estado para definir de que tipo es el error global en el inicio o registro
    const [textoError, setTextoError] = useState('')
    //Estado para saber si hay un error en el nombre
    const [isErrorNombre, setIsErrorNombre] = useState(false)
    //Estado para saber si hay un error en el correo
    const [isErrorCorreo, setIsErrorCorreo] = useState(false)
    //Estado para saber si hay un error en la contraseña
    const [isErrorPass, setIsErrorPass] = useState(false)
    //Estado para cambiar el titulo (Login, registro o editar cuenta)
    const [textoH1, setTextoH1] = useState('')
    //Estado para definir el placeholder de correo
    const [correoPlaceHolder, setCorreoPlaceHolder] = useState('')
    //Estado para definir el placeholder de contraseña
    const [passPlaceHolder, setPassPlaceHolder] = useState('')
    //Estado para cambiar el texto del submit del formulario
    const [submitValue, setSubmitValue] = useState('')
    //Estado para cambiar el texto del boton para cambiar entre inicio y login
    const [textoBtn, setTextoBtn] = useState('')
    //Referencia asociada al formulario
    const loginForm = useRef()
    //Url obtenida desde el entorno
    const {VITE_HOST} = import.meta.env

    //Estados y metodos obtenidos desde el contexto global definido en App.jsx
    const {idUser, setIdUsuario, isLoginPage, esconderAccederLogin} = useContext(IdUsuarioContext)
    const [id, setId] = useState('') 

    const navigate = useNavigate()

    const controller = new AbortController()

    //Función para cambiar entre login y registro
    const toggleRegistroInicio = (e) => {

        e.preventDefault()

        setIsLogin(false)
        setIsError(false)
        setIsErrorCorreo(false)
        setIsErrorNombre(false)
        setIsErrorPass(false)

        const {current : form} = loginForm
        
        if(isLogin){
            setTextoH1('Regístrate')
            setCorreoPlaceHolder('correo@ejemplo.com*')
            setPassPlaceHolder('Contraseña (mín. 8 caracteres)*')
            setSubmitValue('Crear cuenta')
            setTextoBtn('¿Ya tienes una cuenta?')
            form['email'].value = ''
            form['pass'].value = ''
        }else{
            setTextoH1('Inicia sesión')
            setCorreoPlaceHolder('Email*')
            setPassPlaceHolder('Contraseña*')
            setSubmitValue('Iniciar sesión')
            setTextoBtn('¿Aún no tienes cuenta?')
            setIsLogin(true)
            form['nombre'].value = ''
            form['email'].value = ''
            form['pass'].value = ''
        }

    }

    //Función para obtener los datos del formulario
    const loginRegistro = (e) => {

        e.preventDefault()

        const {current : form} = loginForm

        if(isLogin){

            if(comprobarCampos(form)){
                const usuario = {
                    correo : form['email'].value,
                    password : form['pass'].value
                }
                iniciarSesion(usuario)
            }

        }else{

            if(comprobarCampos(form)){
                const usuario = {
                    nombre : form['nombre'].value,
                    correo : form['email'].value,
                    password : form['pass'].value
                }
                registrarse(usuario)
            }
 
        }

    }

    //Función para comprobar si los valores de los campos son válidos
    const comprobarCampos = (form) => {

        if(!isLogin){
            if(form['nombre'].value === ''){
                setIsErrorNombre(true)
                setIsError(false)
                return false
            }else(
                setIsErrorNombre(false)
            )
        }
        if(form['email'].value === ''){
            setIsError(false)
            setIsErrorCorreo(true)
            return false
        }else{
            setIsErrorCorreo(false)
        }
        if(form['pass'].value === ''){
            setIsError(false)
            setIsErrorPass(true)
            return false
        }else{
            setIsErrorPass(false)
        }

        setIsErrorNombre(false)
        setIsErrorCorreo(false)
        setIsErrorPass(false)

        return true

    }

    //Función asincrona para hacer fetch en /registro
    const registrarse = async (usuario) => {

        const options = {
            method : 'post',
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(usuario),
            signal : controller.signal
        }

        await fetch(`${VITE_HOST}/registro` , options)
        .then(res => res.json())
        .then(usuario => {
            if(usuario){
                setIdUsuario(usuario._id)
                navigate('/')
            }else{
                setIsError(true)
                setTextoError('Esa dirección email ya existe')
            }
        })
        .catch(err => console.log(err))
        // .finally(() => controller.abort())

    }

     //Función asincrona para hacer fetch en /login
    const iniciarSesion = async (usuario) => {

        const options = {
            method : 'post',
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify(usuario)
        }

        await fetch(`${VITE_HOST}/login` , options)
        .then(res => res.json())
        .then(usuario => {
            if(usuario){
                setIdUsuario(usuario._id)
                navigate('/')
            }else{
                setIsError(true)
                setTextoError('Email o contraseña incorrectos')
            }
        })
        .catch(err => console.log(err))
        // .finally(() => controller.abort())

    }

    //Efecto que se renderiza al inicio y cuando inicias sesion,
    //para mostrar los datos del registro o los datos de tu cuenta 
    //dependiendo si has iniciado sesión
    useEffect(() => {

        if(idUser === ''){
            setTextoH1('Regístrate')
            setCorreoPlaceHolder('correo@ejemplo.com*')
            setPassPlaceHolder('Contraseña (mín. 8 caracteres)*')
            setSubmitValue('Crear cuenta')
            setTextoBtn('¿Ya tienes una cuenta?')
        }else{
            
        }

        esconderAccederLogin(true)
        
    } , [idUser])

    return(
        <>
            <section className="Section-login" >
                <FondoImagen />
                <div className="Login-wrapper">
                    <div className="Login">
                        <h1 className="Login-h1">{textoH1}</h1>
                        <form className="Login-form" ref={loginForm} onSubmit={loginRegistro}>
                            {!isLogin && <label htmlFor="nombre" className="Login-label" >Nombre</label>}
                            {!isLogin && <input id="nombre" name="nombre" type="text" className="Login-input" placeholder="Nombre*" />}
                            {isErrorNombre && <span className="Login-error">El campo nombre es obligatorio</span>}
                            <label htmlFor="email" className="Login-label">Email</label>
                            <input id="email" name="email" type="text" className="Login-input" placeholder={correoPlaceHolder} />
                            {isErrorCorreo && <span className="Login-error">El campo email es obligatorio</span>}
                            <label htmlFor="pass" className="Login-label">Contraseña</label>
                            <input id="pass" name="pass" type="password" className="Login-input" placeholder={passPlaceHolder} />
                            {isErrorPass && <span className="Login-error">El campo contraseña es obligatorio</span>}
                            {isError && <span className="Login-error">{textoError}</span>}
                            <input type="submit" value={submitValue} className="Crear-input" />
                            <button className="Cuenta-btn" onClick={toggleRegistroInicio}>{textoBtn}</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )

}
{/* <div className="Checkbox">
    <input className="Checkbox-input" type="checkbox" name="sesion" id="sesion" />
    <label htmlFor="sesion" className="Checkbox-label">
        No cerrar sesión
    </label>
</div> */}