import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";


const LogIn = () => {

    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [counter, setCounter] = useState(0)

    const [authError, setAuthError] = useState("");
    const [responseError, setResponseError] = useState(false)
    const navigate = useNavigate();


    const validateLoginForm = () => {
        const errors = [];

        if (user.email.trim() === '') {
            errors.push('El correo electrónico es obligatorio');
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.push('El correo electrónico es inválido');
        }

        if (user.password.trim() === '') {
            errors.push('No olvides ingresar tu contraseña');
        } else if (user.password.length < 4 || user.password.length > 15) {
            errors.push('La contraseña debe contener entre 4 y 15 caracteres');
        }
        setErrors(errors);
        return errors.length === 0;
    };


    const url = ""
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }

    const handleLogin = (e) => {
        
        e.preventDefault();
        console.log(user);
        if (validateLoginForm()) {
            setCounter(1)
            fetch(url, settings)
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        setTimeout(() => {
                            navigate("/")
                            window.location.reload()
                            setCounter(0)
                        }, 2000);

                    }
                    if (response.status === 401) {
                        setResponseError(true)
                        setAuthError("Credenciales inválidas");
                        setCounter(0)
                    } if (response.status === 403) {
                        setResponseError(true)
                        setAuthError("Usuario o contraseña no válido");
                        setCounter(0)
                    } if (response.status === 404) {
                        setResponseError(true)
                        setAuthError("Usuario no encontrado");
                        setCounter(0)
                    }
                    return response.json()

                })
                .then(function (data) {
                    if (data.token != null) {
                        sessionStorage.setItem("token", data.token)
                    }
                }
                )
        }
    }

    const handleMailChange = (e) => {
        setResponseError(false)
        setErrors([])
        setUser({ ...user, email: e.target.value })
    }

    const handlePasswordChange = (e) => {
        setResponseError(false)
        setErrors([])
        setUser({ ...user, password: e.target.value })
    }

    return (
        <div className="logInContainer">
            <form className="logInForm" onSubmit={handleLogin}>
                <h2>Bienvenido!</h2>
                <div className="logInInputSection">
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        placeholder="Correo electronico" 
                        required
                        onChange={(e) => handleMailChange(e)}
                        value={user.email}
                        />
                    <div className="passwordSection">
                        <input 
                            type="password" 
                            name="" 
                            id="" 
                            placeholder="Contraseña" 
                            required
                            onChange={(e) => handlePasswordChange(e)}
                            value={user.password}
                            />
                        <a href="https://google.com" className="forgotPassword">¿Olvidaste tu contraseña?</a>
                        {
                        errors.length > 0 ? (errors.map(error => <div className='boxError' key={error}><p>{error}</p></div>)) : undefined
                    }
                    {
                        responseError ? <div className='boxError'><p>{authError}</p></div> : undefined
                    }
                    </div>
                </div>
                <button>Iniciar Sesión</button>
            </form>
        </div>
    )
}

export default LogIn