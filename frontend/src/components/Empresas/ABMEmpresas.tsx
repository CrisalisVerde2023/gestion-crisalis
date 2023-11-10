import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Empresas from "./LB_Empresa";
import VolverBtn from "../UI Elements/VolverBtn";

export default function ABMEmpresasComponent() {
  const navigate = useNavigate();

  function goToAMEmpresas() {
    navigate("/empresas/AMEmpresas");
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center">
        <div className="w-full">
          <LB_Empresas />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="w-1/2 flex justify-evenly">
          <button
            onClick={goToAMEmpresas}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Crear nueva empresa
          </button>
          <VolverBtn fnOnClick={goBack} />
        </div>
      </div>
    </div>
  );
}
