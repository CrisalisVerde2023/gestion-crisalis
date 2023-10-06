import React, { MouseEventHandler, MouseEvent } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ABMComponent() {
  const navigate = useNavigate();

  const handleButtonClick = (e: MouseEvent) => {
    const navigateTo = (e.target as HTMLButtonElement).dataset
      .navigateto as string;
    navigate(navigateTo);
  };
  return (
    <Container
      fluid
      style={{
        border: "1px #FF6F00 solid",
        borderRadius: "15px",
        height: "100%",
      }}
    >
      {/* Top Row */}
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Row
          style={{ backgroundColor: "#FF6F00", borderRadius: "15px 15px 0 0" }}
          className="d-flex justify-content-center align-items-center headerComponent"
        >
          <Col className="d-flex justify-content-center align-items-center">
            <h4>ABM</h4>
          </Col>
        </Row>

        {/* Buttons Row */}
        <Row
          className="d-flex justify-content-center align-items-center"
          style={{ flex: 1 }}
        >
          <Col className="botonesDiv">
            {[
              "Personas",
              "Empresas",
              "Clientes",
              "Usuarios",
              "Productos",
              "Servicios",
              "Impuestos",
            ].map((text) => (
              <Button
                key={text}
                className="botonStyles"
                style={{
                  backgroundColor: "#F9A825",
                }}
                data-navigateto={`/${text.toLowerCase()}`}
                onClick={handleButtonClick}
              >
                {text}
              </Button>
            ))}
          </Col>
        </Row>
      </div>
    </Container>
  );
}
