import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function ServiciosClienteComponent() {
  return (
    <Container
      fluid
      style={{ border: "1px #33691E solid", borderRadius: "15px" }}
    >
      {/* Top Row */}
      <Row
        style={{ backgroundColor: "#33691E", borderRadius: "15px 15px 0 0" }}
        className="d-flex justify-content-center align-items-center headerComponent"
      >
        <Col className="d-flex justify-content-center align-items-center">
          <h4>Servicios - Cliente</h4>
        </Col>
      </Row>

      {/* Button Row */}
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="d-flex justify-content-center botonesDiv">
          <Button
            className="botonStyles"
            style={{
              backgroundColor: "#9CCC65",
            }}
          >
            Asignar servicios a cliente
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
