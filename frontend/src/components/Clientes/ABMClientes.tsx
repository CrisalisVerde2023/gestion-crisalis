import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import LB_Clientes from "./LB_Clientes";
import SelectedClient from "../SelectedClient";
import VolverBtn from "../UI Elements/VolverBtn";

export default function ABMClientesComponent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const seleccion = searchParams.get("seleccion");

  function goToAMClientes() {
    navigate("/empresas/AMEmpresas");
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Row>
        <Col>
          <LB_Clientes seleccion={seleccion || ""} />
        </Col>
      </Row>
      {seleccion === "simple" && (
          <div className="flex flex-row justify-content-center bg-denim-400 text-white">
            <p className="mr-1">Cliente seleccionado:</p>
          </div>
        ) && <SelectedClient />}
      <div className="flex justify-center items-center mb-4">
        <div className="flex justify-evenly mt-2 mx-2">
          <VolverBtn fnOnClick={goBack} />
        </div>
      </div>
    </Container>
  );
}
