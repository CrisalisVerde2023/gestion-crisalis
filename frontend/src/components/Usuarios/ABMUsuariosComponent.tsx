import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Usuarios from "./LB_Usuarios";

export default function ABMUsuariosComponent() {
  const navigate = useNavigate();

  function goToAMUsuarios() {
    navigate("/usuarios/AMUsuarios");
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="mb-4">
          <LB_Usuarios />
        </div>
        <div className="flex justify-center items-center">
          <div className="flex justify-evenly w-1/2 mx-2">
            <button
              onClick={goToAMUsuarios}
              className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
            >
              Crear nuevo usuario
            </button>
            <button
              onClick={goBack}
              className="bg-red-600 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-red-700"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
