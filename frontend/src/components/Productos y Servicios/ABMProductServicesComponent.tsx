import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LB_Productos from "./LB_ProductService";
import { useLocation, useNavigate } from "react-router-dom";

export default function ABMProductServiceComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {}, [location]);
  function goToAMProductos() {
    navigate("/productosyservicios/AMProductos");
  }
  function goToAMServicios() {
    navigate("/productosyservicios/AMServicios");
  }
  function goBack() {
    navigate(-1);
  }

  return (
    <Container>
      <Row>
        <Col>
          <LB_Productos />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center mb-4">
        <Col xs={12} md="auto" className="d-flex justify-content-evenly mt-2">
          <Button
            variant="primary"
            onClick={goToAMProductos}
            className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
          >
            Crear nuevo producto
          </Button>
        </Col>
        <Col xs={12} md="auto" className="d-flex justify-content-evenly mt-2">
          <Button
            variant="primary"
            onClick={goToAMServicios}
            className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
          >
            Crear nuevo servicio
          </Button>
        </Col>
        <Col xs={12} md="auto" className="d-flex justify-content-evenly mt-2">
          <button
            className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
            onClick={goBack}
          >
            Volver
          </button>
        </Col>
      </Row>
    </Container>
  );
}
