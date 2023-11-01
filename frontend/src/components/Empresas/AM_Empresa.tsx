import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  countEnterprises,
  createEnterprise,
  findEnterpriseById,
  getNextID,
  modifyEnterprise,
} from "./../../controller/ABMEnterpriseController";
import { EnterpriseType } from "./../types/enterpriseType";
import { formatDate, formatDateToInput } from "../../tools/formatDate";

export default function AM_Empresa() {
  const { idEnterprise } = useParams<{ idEnterprise: string }>();
  const idToModify = idEnterprise ? parseInt(idEnterprise, 10) : undefined;
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState<EnterpriseType>(
    idToModify !== undefined
      ? findEnterpriseById(idToModify) || {
          id: 0,
          nombre: "",
          cuit: "",
          start_date: "",
        }
      : { id: 0, nombre: "", cuit: "", start_date: "" }
  );

  const isFormComplete = () => {
    return formData.nombre && formData.cuit && formData.start_date;
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
          await modifyEnterprise(idToModify, formData);
        } else {
          await createEnterprise(formData);
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
        <h4 className="headerStyles">Alta y modificación de empresas</h4>
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
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </Col>
        <Col xs={6}>
          <Form.Label>CUIT</Form.Label>
          <Form.Control
            type="text"
            value={formData.cuit}
            onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
          />
        </Col>
        <Col xs={6}>
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="date"
            value={formatDateToInput(formData.start_date)}
            onChange={(e) => {
              const [year, month, day] = e.target.value.split("-");
              const newDate = `${day}-${month}-${year}`;
              setFormData({ ...formData, start_date: newDate });
            }}
          />
        </Col>
      </Row>
      <Button
        disabled={!isFormComplete()}
        style={{ marginTop: "10px" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}
