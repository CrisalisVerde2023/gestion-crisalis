import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Empresas from "./LB_Empresa";

export default function ABMEmpresasComponent() {
  const navigate = useNavigate();

  function goToAMEmpresas() {
    navigate("/empresas/AMEmpresas");
  }

  return (
    <Container>
      <Row>
        <Col>
          <LB_Empresas />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6} className="d-flex justify-content-evenly">
          <Button variant="primary" onClick={goToAMEmpresas}>
            Crear nueva empresa
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
