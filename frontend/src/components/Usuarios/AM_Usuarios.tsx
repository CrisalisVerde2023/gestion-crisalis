import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUsuario,
  fetchUsuarios,
  modifyUsuario,
} from "../../controller/ABMUsuarioController";
import { UsuariosType } from "../types/userType";
import LoadingComponent from "../LoadingComponent";

export default function AM_Usuario() {
  const { idUsuario } = useParams<{ idUsuario: string }>();
  const idToModify = idUsuario ? parseInt(idUsuario) : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UsuariosType>({ id: 0, usuario: "", password: "", eliminado: false});
  const [oldUsuario, setOldUsuario] = useState("");

  const goBack = () => {
    navigate(-1);
  };

  const isFormComplete = () => (!idToModify) ? (formData.usuario && formData.password) : ((oldUsuario !== formData.usuario) || (formData.password));

  const errorsForm = () => {
    const errors = [];

    if (!formData.usuario.length)
      errors.push('El correo electrónico es obligatorio');
    if (!/\S+@\S+\.\S+/.test(formData.usuario))
      errors.push('El correo electrónico es inválido');

    if ((!idToModify) || (idToModify && formData.password.length)){
      if (!formData.password.length)
        errors.push('No olvides ingresar tu contraseña');
      if ((formData.password.length < 4) || (formData.password.length > 15))
        errors.push('La contraseña debe contener entre 4 y 15 caracteres');
    }

    return errors;
  };

  const fetchData = async () => {
    const fetchedData = await fetchUsuarios(setIsLoading, idToModify || 0);
    setFormData({...fetchedData, password: ""});
    setOldUsuario(fetchedData.usuario);
  };

  useEffect(() => {
    if (idToModify) fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      if (isFormComplete() && !errorsForm().length)
        await (!idToModify ? createUsuario(formData) : modifyUsuario(formData));
      else
        console.log("Debe completar los campos requeridos correctamente");
    }
    catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  return (
    <Container className="containerAM">
      <Row className="d-flex justify-content-center">
        <h4 className="headerStyles">{(!idToModify) ? "Alta" : "Modificación"} de usuario</h4>
      </Row>
      <Row className="d-flex flex-column justify-content-center align-items-center">
        {isLoading ? (
          <Col>
            <LoadingComponent />
          </Col>
        ) : (
          <>
            {idToModify &&
               <Col xs={6}>
                <Form.Label>ID: {formData.id}</Form.Label>
              </Col>
            }
            <Col xs={6}>
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                value={formData.usuario}
                onChange={(e) =>
                  setFormData({ ...formData, usuario: e.target.value.trim() })
                }
              />
            </Col>
            <Col xs={6}>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="text"
                value = {formData.password}
                placeholder = "Ingrese nueva contraseña..."
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Col>
            {errorsForm().length && isFormComplete()
              ?
                <Col xs={6}>
                  {errorsForm().map(el => <p>{el}</p>)}
                </Col>
              : null
            }
          </>
        )}
      </Row>
      <Button
        disabled={!isFormComplete() || !!errorsForm().length}
        style={{ marginTop: "10px" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}
