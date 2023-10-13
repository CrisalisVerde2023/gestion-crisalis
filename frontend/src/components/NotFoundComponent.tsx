// 404Component.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

export default function NotFoundComponent() {
  return (
    <Container>
      <Row className="d-flex flex-column justify-content-center">
        <Col xs={12} className="text-center">
          <ExclamationTriangleFill size={75} />
        </Col>
        <Col xs={12} className="text-center">
          <h4>Página no encontrada</h4>
        </Col>
      </Row>
    </Container>
  );
}
