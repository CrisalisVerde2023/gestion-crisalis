import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createPersona,
  fetchPersonas,
  modifyPersona,
} from "./../../controller/ABMPersonController";
import { PersonasType } from "./../types/personType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";

export default function AM_Personas() {
  const { idPersona } = useParams<{ idPersona: string }>();
  const idToModify = idPersona ? parseInt(idPersona) : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PersonasType>({
    id: 0,
    nombre: "",
    apellido: "",
    dni: "",
  });

const [oldPersona, setOldPersona] = useState("");

const goBack = () => {
  navigate(-1);
};

const isFormComplete = () => {
  const errors = [];

  if (!formData.nombre.length)
    errors.push("El nombre es obligatorio");
  if (formData.nombre.length < 4 || formData.nombre.length > 15)
    errors.push("El nombre debe contener entre 4 y 15 caracteres");

  if (!formData.apellido.length)
    errors.push("El apellido es obligatorio");
  if (formData.apellido.length < 4 || formData.apellido.length > 15)
    errors.push("El apellido debe contener entre 4 y 15 caracteres");

  if (!formData.dni.length)
    errors.push("El DNI es obligatorio");
  if (formData.dni.length !== 8 || !/^\d{8}$/.test(formData.dni))
    errors.push("El DNI deben ser 8 dígitos numéricos");

  return errors.length === 0;
};





  const fetchData = async () => {
    try {
      return await fetchPersonas(idToModify || 0);
    } catch (error) {
      Swal.fire("Error!", "No se han podido obtener los datos.", "error").then(
        () => goBack()
      );
    }
  };


  useEffect(() => {
    if (idToModify) {
      setIsLoading(true);
      fetchData().then((resp) => {
        setFormData({ ...resp});
        setOldPersona(resp.persona);
        setIsLoading(false);
        
      });
    }
  }, []);

  

  const handleSubmit = () => {
    if (!isFormComplete()) {
      Swal.fire({ text: "Espere por favor...", showConfirmButton: false });
      (!idToModify ? createPersona(formData) : modifyPersona(formData))
        .then(() => {
          Swal.fire({
            title: "Realizado!",
            text: `Se ha ${!idToModify ? "creado" : "modificado"} la persona.`,
            icon: "success",
            timer: 2000,
          }).then(() => goBack());
        })
        .catch(() => {
          Swal.fire(
            "Error!",
            `No se ha podido ${
              !idToModify ? "crear" : "modificar"
            } la persona.`,
            "error"
          );
        });
    } else
      Swal.fire(
        "Atención!",
        "Debe completar los campos requeridos correctamente.",
        "warning"
      );
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
        Modificar persona
      </Button>
    </Container>
  );
}
