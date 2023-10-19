// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";
import { UserLoggedContext } from "../contexts/UserLoggedContext";
import logo from "../assets/images/logoLetras.png";

const LogIn = () => {
  const { userLogged, setUserLogged } = useContext(UserLoggedContext);
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

    //como no quiero que la persona regrese despues de pasar por el login, lo pongo en true para reemplazar el historial
    navigate({ replace: true });

    if (validateLoginForm())
      fetch(url, settings)
      .then((response) => {
        if (response.status === 202)
          response.json()
          .then(({id, usuario}) => {
            setUserLogged({
              id,
              email: usuario,
            });
            navigate("/home");
          });
        else {
          setResponseError(true);
          setAuthError((response.status === 403) ? "Usuario inactivo" : "Usuario o contraseña no válido");
        }
      });
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
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img className="w-72 mb-3" src={logo} alt="logo" />

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Bienvenido!
                </h1>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Usuario
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="usuario@dominio.com"
                  required
                  onChange={(e) => handleMailChange(e)}
                  value={user.usuario}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => handlePasswordChange(e)}
                  value={user.password}
                />
              </div>

              {errors.length > 0
                ? errors.map((error) => (
                    <div className="text-red-600 font-semibold" key={error}>
                      <p>{error}</p>
                    </div>
                  ))
                : undefined}
              {responseError ? (
                <div className="text-red-500">
                  <p>{authError}</p>
                </div>
              ) : undefined}

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Recuérdame
                    </label>
                  </div>
                </div>
                {/* <a href="https://google.com" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a> */}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-denim hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Iniciar Sesión
              </button>
              {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Aún no tienes una cuenta? <a href="https://google.com" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Regístrate</a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
