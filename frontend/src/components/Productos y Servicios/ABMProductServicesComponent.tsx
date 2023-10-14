import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LB_Productos from "./LB_ProductService";
import { useLocation, useNavigate } from "react-router-dom";

export default function ABMProductServiceComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {}, [location]);
  function goToAMProductos() {
    navigate("/productos/AMProductos");
  }
  function goToAMServicios() {
    navigate("/servicios/AMServicios");
  }

  return (
    <Container>
      <Row>
        <Col>
          <LB_Productos />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={6} className="d-flex justify-content-evenly">
          {location.pathname.includes("/productos") ? (
            <Button variant="primary" onClick={goToAMProductos}>
              Crear nuevo producto
            </Button>
          ) : location.pathname.includes("/servicios") ? (
            <Button variant="primary" onClick={goToAMServicios}>
              Crear nuevo servicio
            </Button>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
