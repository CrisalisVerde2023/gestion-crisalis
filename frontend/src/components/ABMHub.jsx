import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ABMComponent from "./ABMComponent";
import PedidosComponent from "./PedidosComponent";
import ServiciosClienteComponent from "./ServiciosClienteComponent";
import "./styles/ABMHub.css";

export default function ABMHub() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      fluid
    >
      <Row className="d-flex flex-row">
        {/* First Div: ABM */}
        <Col xs={6}>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "100%" }}
          >
            <ABMComponent />
          </div>
        </Col>

        {/* Second Div: Contains Pedidos and Servicios cliente */}
        <Col xs={6}>
          <div className="d-flex flex-column" style={{ height: "100%" }}>
            {/* Pedidos */}
            <div
              className="d-flex align-items-center justify-content-center flex-grow-1"
              style={{ margin: "5px" }}
            >
              <PedidosComponent />
            </div>
            {/* Servicios cliente */}
            <div
              className="d-flex align-items-center justify-content-center flex-grow-1"
              style={{ margin: "5px" }}
            >
              <ServiciosClienteComponent />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
