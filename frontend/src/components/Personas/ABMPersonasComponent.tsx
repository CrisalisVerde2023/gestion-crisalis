import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Personas from "./LB_Personas";

export default function ABMPersonasComponent() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  function goToAMPersonas() {
    navigate("/personas/AMPersonas");
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <LB_Personas />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-1/2 justify-evenly">
          <button
            onClick={goToAMPersonas}
            
            className="px-4 py-2 mt-6 font-medium tracking-wide text-white rounded-md bg-denim-400 hover:bg-denim-500"
          >
            Crear nueva persona
          </button>
          <button
              onClick={goBack}
              className="px-4 py-2 mt-6 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Volver
            </button>
        </div>
      </div>
    </div>
  );
}
