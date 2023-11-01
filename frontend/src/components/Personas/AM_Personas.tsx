import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  countPersonas,
  createPersona,
  findPersonaById,
  getNextID,
  modifyPersona,
} from "./../../controller/ABMPersonController";
import { PersonasType } from "./../types/personType";
import Swal from "sweetalert2";

export default function AM_Persona() {
  const { idPersona } = useParams<{ idPersona: string }>();
  const idToModify = idPersona ? parseInt(idPersona, 10) : undefined;
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState<PersonasType>({
          id: 0,
          nombre: "",
          apellido: "",
          dni: "",

        });

  const isFormComplete = () => {
    return formData.nombre && formData.apellido && formData.dni;
  };

  useEffect(() => {
    if (idToModify === undefined) {
      setFormData({
        ...formData,
        id: getNextID(),
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (isFormComplete()) {
      try {
        if (idToModify !== undefined) {
          await modifyPersona(idToModify, formData);
        } else {
          await createPersona(formData);
        }
        goBack();
      } catch (error) {
        console.error("Error while saving data:", error);
      }
    }
  };

  return (
    <Container className="containerAM">
      <Row className="d-flex justify-content-center">
        <h4 className="headerStyles">Alta y modificación de personas</h4>
      </Row>
      <Row className="d-flex flex-column justify-content-center align-items-center">
        <Col xs={6}>
          <Form.Label>ID: {formData.id}</Form.Label>
        </Col>
        <Col xs={6}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
          />
        </Col>
        <Col xs={6}>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={formData.apellido}
            onChange={(e) =>
              setFormData({ ...formData, apellido: e.target.value })
            }
          />
        </Col>
        <Col xs={6}>
          <Form.Label>DNI</Form.Label>
          <Form.Control
            type="text"
            value={formData.dni}
            onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
          />
        </Col>
      </Row>
      <Button
        disabled={!isFormComplete()}
        style={{ marginTop: "10px" }}
        onClick={handleSubmit}
      >
        Crear persona
      </Button>
    </Container>
  );
}
