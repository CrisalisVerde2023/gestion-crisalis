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
    loading,
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
                className="w-full items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-denim hover:bg-denim-400 transition ease-in-out duration-150 cursor-not-allowed flex justify-center"
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <span className="">Iniciar Sesión</span>
                )}
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
