import React from "react";

interface BorrarBtnProps {
  fnOnClick: () => void;
}

function BorrarBtn({ fnOnClick }: BorrarBtnProps) {
  return (
    <button
      onClick={fnOnClick}
      className="py-2 px-3 flex text-sm justify-between font-semibold text-gray bg-white-pure shadow-md rounded-lg border border-gray hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-gray-800 dark:text-white pr-0.5"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <p className="pl-1">Borrar</p>
    </button>
  );
}

export default BorrarBtn;
