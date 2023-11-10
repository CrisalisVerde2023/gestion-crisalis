import React from "react";

interface ToggleEstadoBtnProps {
  fnOnClick: () => void;
  estado: boolean;
}

function ToggleEstadoBtn({ fnOnClick, estado }: ToggleEstadoBtnProps) {
  return (
    <button
      onClick={fnOnClick}
      className={`${
        estado
          ? "flex items-center text-atlantis-700 hover:text-white border border-atlantis-700 hover:bg-atlantis-600 focus:ring-4 focus:outline-none focus:ring-atlantis-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-atlantis-500 dark:text-atlantis-500 dark:hover:text-white dark:hover:bg-atlantis-600 dark:focus:ring-atlantis-900"
          : "flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      }`}
    >
      {!estado ? (
        <>
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
            className="w-5 h-5 dark:text-white pr-0.5"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <p className="pl-1">Desactivar</p>
        </>
      ) : (
        <>
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
            className="w-5 h-5 dark:text-white pr-0.5"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <p className="pl-1">Activar</p>
        </>
      )}
    </button>
  );
}

export default ToggleEstadoBtn;
