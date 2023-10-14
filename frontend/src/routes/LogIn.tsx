// @ts-nocheck
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import { UserLoginContext } from "../contexts/UserLoginContext";

//Importo el logo
import logo from "../assets/images/logoColor.png";

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
        <img className="img-logo" src={logo} rel="imagen"/>
        <div className="logInInputSection">
          <div className="form-group">
            <label htmlFor="userLoginEmail">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="userLoginEmail"
              placeholder="Ingrese su correo electrónico"
              required
              onChange={(e) => handleMailChange(e)}
              value={user.usuario}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userLoginPassword">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="userLoginPassword"
              placeholder="Contraseña"
              required
              onChange={(e) => handlePasswordChange(e)}
              value={user.password}
            />
            <a href="https://google.com" className="forgotPassword">
              ¿Olvidaste tu contraseña?
            </a>
            {errors.length > 0
              ? errors.map((error, index) => (
                <div className="alert alert-danger" key={index}>
                  {error}
                </div>
              ))
              : null}
            {responseError ? (
              <div className="alert alert-danger">
                {authError}
              </div>
            ) : null}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
      {/* <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> */}
      {/* <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Flowbite
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default LogIn;
