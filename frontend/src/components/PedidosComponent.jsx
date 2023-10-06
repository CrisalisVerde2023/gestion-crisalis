import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function PedidosComponent() {
  return (
    <Container
      fluid
      style={{ border: "1px #006064 solid", borderRadius: "15px" }}
    >
      {/* Top Row */}
      <Row
        style={{ backgroundColor: "#006064", borderRadius: "15px 15px 0 0" }}
        className="d-flex justify-content-center align-items-center headerComponent"
      >
        <Col className="d-flex justify-content-center align-items-center">
          <h4>Pedidos</h4>
        </Col>
      </Row>

      {/* Buttons Row */}
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="botonesDiv">
          {["Listar pedidos", "Altas de pedidos", "Anular pedidos"].map(
            (text) => (
              <Button
                key={text}
                className="botonStyles"
                style={{
                  backgroundColor: "#4DD0E1",
                }}
              >
                {text}
              </Button>
            )
          )}
        </Col>
      </Row>
    </Container>
  );
}
