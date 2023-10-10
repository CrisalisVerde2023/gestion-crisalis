import "./LogIn.css";


const LogIn = () => {
    return (
        <div className="logInContainer">
            <form action="" className="logInForm">
                <h2>Bienvenido!</h2>
                <div className="logInInputSection">
                    <input type="text" name="" id="" placeholder="Correo electronico o usuario" />
                    <div className="passwordSection">
                        <input type="text" name="" id="" placeholder="Contraseña" />
                        <p>¿Olvidaste tu contraseña?</p>
                    </div>
                </div>
                <button>Iniciar Sesión</button>
            </form>
        </div>
    )
}

export default LogIn