import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Personas from "./LB_Personas";

export default function ABMPersonasComponent() {
  const navigate = useNavigate();

  function goToAMPersonas() {
    navigate("/personas/AMPersonas");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <div className="w-full">
          <LB_Personas />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-evenly w-1/2">
          <button
            onClick={goToAMPersonas}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Crear nueva persona
          </button>
        </div>
      </div>
    </div>
  );
}
