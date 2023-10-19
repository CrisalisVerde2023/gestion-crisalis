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
    <Container>
      <Row>
        <Col>
          <LB_Usuarios />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6} className="d-flex justify-content-evenly">
          <button
            onClick={goToAMUsuarios}
            className="bg-denim px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-900"
          >
            Crear nuevo usuario
          </button>
          <button
            className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
            onClick={(goBack)}
          >
            Volver
          </button>
        </Col>
      </Row>
    </Container>
  );
}
