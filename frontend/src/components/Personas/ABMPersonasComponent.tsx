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
    <Container>
      <Row>
        <Col>
          <LB_Personas />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6} className="d-flex justify-content-evenly">
          <Button variant="primary" onClick={goToAMPersonas}>
            Crear nueva persona
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
