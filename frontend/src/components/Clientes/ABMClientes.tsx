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
    navigate("/empresas");
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
          <div className="flex flex-row text-white justify-content-center bg-denim-400">
            <p className="mr-1">Cliente seleccionado:</p>
          </div>
        ) && <SelectedClient />}
      <div className="flex items-center justify-center mb-4">
        <div className="flex mx-2 mt-2 justify-evenly">
          <VolverBtn fnOnClick={goBack} />
        </div>
      </div>
    </Container>
  );
}
