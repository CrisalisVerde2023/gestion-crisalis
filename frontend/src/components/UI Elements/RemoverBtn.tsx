import React from "react";

interface RemoverBtnProps {
  fnOnClick: () => void;
}

function RemoverBtn({ fnOnClick }: RemoverBtnProps) {
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
        className="w-5 h-5 text-gray-800 dark:text-white pr-0.5"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <p className="pl-1">Remover</p>
    </button>
  );
}

export default RemoverBtn;
