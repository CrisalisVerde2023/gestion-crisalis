import React from "react";

interface VolverBtnProps {
  fnOnClick: () => void;
}

function VolverBtn({ fnOnClick }: VolverBtnProps) {
  return (
    <button
      onClick={fnOnClick}
      className="py-2 px-3 flex text-sm justify-between font-semibold text-gray bg-white-pure shadow-md rounded-lg border border-gray hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
    >
      <svg
        className="w-5 h-5 text-gray-800 dark:text-white pr-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
        />
      </svg>
      <p>Volver</p>
    </button>
  );
}

export default VolverBtn;
