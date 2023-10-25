// @ts-nocheck
import "./LogIn.css";
import logo from "../assets/images/logoLetras.png";
import { useLogin } from "../hooks/useLogin";

const LogIn = () => {
  const {
    handleLogin,
    user,
    errors,
    responseError,
    handleMailChange,
    handlePasswordChange,
    authError,
  } = useLogin();

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
