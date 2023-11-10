import React from "react";

interface SeleccionarBtnProps {
  fnOnClick: () => void;
  seleccionado: boolean;
}

function SeleccionarBtn({ fnOnClick, seleccionado }: SeleccionarBtnProps) {
  return (
    <button
      type="button"
      className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-500 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      onClick={fnOnClick}
    >
      {seleccionado ? (
        <div className="flex justify-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white dark:text-white pr-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
          <p className="ml-1">Deseleccionar</p>
        </div>
      ) : (
        <div className="flex justify-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-white dark:text-white pr-0.5"
          >
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          <p className="ml-1">Seleccionar</p>
        </div>
      )}
    </button>
  );
}

export default SeleccionarBtn;
