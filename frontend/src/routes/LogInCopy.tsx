// @ts-nocheck
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import { UserLoginContext } from "../contexts/UserLoginContext";

const LogIn = () => {
  const { userLogged, setUserLogin } = useContext(UserLoginContext);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    usuario: "",
    password: "",
  });

  const [authError, setAuthError] = useState("");
  const [responseError, setResponseError] = useState(false);
  const navigate = useNavigate();

  const validateLoginForm = () => {
    const errors = [];

    if (user.usuario.trim() === "") {
      errors.push("El correo electrónico es obligatorio");
    } else if (!/\S+@\S+\.\S+/.test(user.usuario)) {
      errors.push("El correo electrónico es inválido");
    }

    if (user.password.trim() === "") {
      errors.push("No olvides ingresar tu contraseña");
    } else if (user.password.length < 4 || user.password.length > 15) {
      errors.push("La contraseña debe contener entre 4 y 15 caracteres");
    }
    setErrors(errors);
    return errors.length === 0;
  };

  const url = "http://localhost:8080/login";
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user);
    if (validateLoginForm()) {
      fetch(url, settings)
        .then((response) => {
          console.log(response);
          if (response.status === 202) {
            setUserLogin({
              id: response.body.id,
              email: response.body.usuario,
            });
            navigate("/");
          }
          if (response.status === 401) {
            setResponseError(true);
            setAuthError("Credenciales inválidas");
          }
          if (response.status === 403) {
            setResponseError(true);
            setAuthError("Usuario o contraseña no válido");
          }
          if (response.status === 404) {
            setResponseError(true);
            setAuthError("Usuario no encontrado");
          }
          return response.json();
        })
        .then(function (data) {
          if (data.token != null) {
            sessionStorage.setItem("token", data.token);
          }
        });
    }
  };

  const handleMailChange = (e) => {
    setResponseError(false);
    setErrors([]);
    setUser({ ...user, usuario: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setResponseError(false);
    setErrors([]);
    setUser({ ...user, password: e.target.value });
  };

  return (
    <div className="logInContainer">
      <form className="logInForm" onSubmit={handleLogin}>
        <h2>Bienvenido!</h2>
        <div className="logInInputSection">
          <input
            type="email"
            name=""
            id="userLoginEmail"
            placeholder="Correo electronico"
            required
            onChange={(e) => handleMailChange(e)}
            value={user.usuario}
          />
          <div className="passwordSection">
            <input
              type="password"
              name=""
              id="userLoginEmail"
              placeholder="Contraseña"
              required
              onChange={(e) => handlePasswordChange(e)}
              value={user.password}
            />
            <a href="https://google.com" className="forgotPassword">
              ¿Olvidaste tu contraseña?
            </a>
            {errors.length > 0
              ? errors.map((error) => (
                  <div className="boxError" key={error}>
                    <p>{error}</p>
                  </div>
                ))
              : undefined}
            {responseError ? (
              <div className="boxError">
                <p>{authError}</p>
              </div>
            ) : undefined}
          </div>
        </div>
        <button>Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default LogIn;
