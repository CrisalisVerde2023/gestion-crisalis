import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LB_Usuarios from "./LB_Usuarios";

export default function ABMUsuariosComponent() {
  const navigate = useNavigate();

  function goToAMUsuarios() {
    navigate("/usuarios/AMUsuarios");
  }

  return (
    <Container>
      <Row>
        <Col>
          <LB_Usuarios />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6} className="d-flex justify-content-evenly">
          <Button style={{backgroundColor: "#0d6efd"}} variant="primary" onClick={goToAMUsuarios}>
            Crear nuevo usuario
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
