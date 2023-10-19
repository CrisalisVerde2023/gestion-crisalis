import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section className="bg-athens-gray dark:bg-gray-900">
      <div className="py-8 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16 mx-auto">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Diseñado para equipos empresariales
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            En Crisalis nos centramos en mercados en los que la tecnología, la
            innovación y el capital pueden generar valor a largo plazo e
            impulsar el crecimiento económico.
          </p>
        </div>

        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center w-10 h-10 rounded-md bg-electric-violet-50 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                className="w-5 h-5 text-electric-violet lg:w-6 lg:h-6 dark:text-primary-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
              </svg>
            </div>
            <h3 className="my-3 text-xl font-bold dark:text-white text-start">
              Alta, Baja y Modificación
            </h3>

            <ul className="text-gray-500 dark:text-gray-400 space-y-3">
              {[
                "Personas",
                "Empresas",
                "Clientes",
                "Usuarios",
                "Productos",
                "Servicios",
                "Impuestos",
              ].map((entidad) => (
                <li
                  key={entidad}
                  className="flex hover:bg-slate-50 rounded-md shadow-md bg-white-pure"
                >
                  <Link
                    to={`/${entidad.toLowerCase()}`}
                    className="flex p-3 w-full justify-between"
                  >
                    <span>{`ABM de ${entidad}`}</span>
                    <svg
                      className="w-4 h-4 text-electric-violet dark:text-white self-center"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 16"
                    >
                      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex justify-center items-center w-10 h-10 rounded-md bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                className="w-5 h-5 text-denim lg:w-6 lg:h-6 dark:text-primary-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>
            <h3 className="my-3 text-xl font-bold dark:text-white text-start">
              Pedidos
            </h3>

            <ul className="text-gray-500 dark:text-gray-400 space-y-3">
              {["Listar pedidos", "Altas de pedidos", "Anular pedidos"].map(
                (serv) => (
                  <li
                    key={serv}
                    className="flex hover:bg-slate-100 rounded-md bg-white-pure shadow-md"
                  >
                    <Link
                      to={`/home`}
                      className="flex p-3 w-full justify-between"
                    >
                      <span>{serv}</span>
                      <svg
                        className="w-4 h-4 text-denim dark:text-white self-center"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 14 16"
                      >
                        <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                      </svg>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <div className="flex justify-center items-center w-10 h-10 rounded-md bg-atlantis-50 lg:h-12 lg:w-12 dark:bg-primary-900">
              <svg
                className="w-5 h-5 text-atlantis lg:w-6 lg:h-6 dark:text-primary-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="my-3 text-xl font-bold dark:text-white text-start">
              Servicios
            </h3>
            <ul className="text-gray-500 dark:text-gray-400 space-y-3">
              <li className="flex hover:bg-slate-100 rounded-md bg-white-pure shadow-md">
                <Link to={`/home`} className="flex p-3 w-full justify-between">
                  <span>{`Asignar Servicios a Cliente`}</span>
                  <svg
                    className="w-4 h-4 text-atlantis dark:text-white self-center"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 14 16"
                  >
                    <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
