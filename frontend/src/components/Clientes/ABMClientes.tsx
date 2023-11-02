import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Clientes from "./LB_Clientes";


export default function ABMClientesComponent() {
  const navigate = useNavigate();

  function goToAMClientes() {
    navigate("/empresas/AMEmpresas");
  }

  return (
    <Container>
      <Row>
        <Col>
          <LB_Clientes />
        </Col>
      </Row>
      {/* <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6} className="d-flex justify-content-evenly">
          <Button variant="primary" onClick={goToAMClientes}>
            Crear nuevo CLIENTE
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
}
