import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Personas from "./LB_Personas";
import VolverBtn from "../UI Elements/VolverBtn";

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
        <div className="flex w-full justify-content-evenly my-3">
          <button
            onClick={goToAMPersonas}
            className="px-4 py-2 font-medium tracking-wide text-white rounded-md bg-denim-400 hover:bg-denim-500"
          >
            Crear nueva persona
          </button>
          <VolverBtn fnOnClick={goBack} />
        </div>
      </div>
    </div>
  );
}
