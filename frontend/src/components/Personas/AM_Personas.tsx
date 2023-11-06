import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreatePersonas,
  useModifyPersonas,
  useFetchPersonas,
} from "./../../controller/ABMPersonController";
import { PersonasType, defaultPersonasType } from "./../types/personType";
import Swal from "sweetalert2";
import { useFetchReturnType } from "../../hooks/useFetch";

export default function AM_Personas() {
  const { idPersona } = useParams<{ idPersona: string }>();
  const idToModify = idPersona ? parseInt(idPersona) : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);
  const [response, setResponse] = useState<useFetchReturnType | null>(null);
  const [formData, setFormData] = useState<PersonasType>(defaultPersonasType);
  const [oldPersona, setOldPersona] =
    useState<PersonasType>(defaultPersonasType);

  let fetchedData: useFetchReturnType | null = null;

  if (idToModify !== undefined) {
    fetchedData = useFetchPersonas(idToModify, true);
  }

  useEffect(() => {
    if (fetchedData && !fetchedData.hasError && fetchedData.json) {
      setFormData({ ...fetchedData.json, password: "" });
    }
  }, [fetchedData]);

  useEffect(() => {
    if (response) {
      if (!response.loading && !response.hasError && response.json) {
        console.log("here");
      } else if (!response.loading && response.hasError) {
        // logic for handling errors
      }
    }
  }, [response]);

  const goBack = () => {
    navigate(-1);
  };

  const isFormComplete = () => {
    const errors = [];

    if (!formData.nombre) errors.push("El nombre es obligatorio");
    if (formData.nombre.length < 4 || formData.nombre.length > 15)
      errors.push("El nombre debe contener entre 4 y 15 caracteres");

    if (!formData.apellido) errors.push("El apellido es obligatorio");
    if (formData.apellido.length < 4 || formData.apellido.length > 15)
      errors.push("El apellido debe contener entre 4 y 15 caracteres");

    if (!formData.dni) errors.push("El DNI es obligatorio");
    if (formData.dni.length !== 8 || !/^\d{8}$/.test(formData.dni))
      errors.push("El DNI deben ser 8 dígitos numéricos");

    return errors.length === 0;
  };

  const createResponse = useCreatePersonas(formData, shouldCreate);
  const modifyResponse = useModifyPersonas(formData, shouldModify);

  const handleSubmit = () => {
    const complete = isFormComplete();

    if (complete) {
      console.log("ok");
      Swal.fire({ text: "Espere por favor...", showConfirmButton: false });
      if (!idToModify) {
        setShouldCreate(true);
      } else {
        setShouldModify(true);
      }
    } else {
      Swal.fire(
        "Atención!",
        "Debe completar los campos requeridos correctamente.",
        "warning"
      );
    }
  };

  useEffect(() => {
    Swal.close();
    if (createResponse && shouldCreate) {
      setShouldCreate(false);
      if (!createResponse.loading && !createResponse.hasError) {
        Swal.fire("Perfecto!", "Persona creada correctamente", "success");
        goBack();
      } else if (!createResponse.loading && createResponse.hasError) {
        if (createResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al crear persona", "warning");
        }
      }
    }
    if (modifyResponse && shouldModify) {
      setShouldModify(false);
      console.log(modifyResponse);
      if (!modifyResponse.loading && !modifyResponse.hasError) {
        Swal.fire("Perfecto!", "Persona modificado correctamente", "success");
        goBack();
      } else if (!modifyResponse.loading && modifyResponse.hasError) {
        if (modifyResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al modificar persona", "warning");
        }
      }
    }
  }, [createResponse, modifyResponse]);

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
      <div>
        <Button
          disabled={!isFormComplete()}
          style={{ marginTop: "10px" }}
          onClick={handleSubmit}
          className="w-2/4 px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out shadow bg-denim hover:bg-denim-400"
        >
          Crear persona
        </Button>
      </div>
    </Container>
  );
}
