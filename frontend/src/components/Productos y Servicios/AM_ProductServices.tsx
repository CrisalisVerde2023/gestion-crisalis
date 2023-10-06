import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  countProductServicios,
  createProductService,
  createProductServiceDefaultValues,
  findProductServiceById,
  getNextID,
  modifyProductService,
  selectAll,
} from "../../controller/ABMProductController";
import {
  ProductOrService,
  ProductServiceType,
} from "../types/productServiceType";

export default function AM_ProductService() {
  const { idProdServ } = useParams<{ idProdServ: string }>();
  const idToModify = idProdServ ? parseInt(idProdServ, 10) : undefined;
  const [selectedImpuesto, setSelectedImpuesto] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // Initialize formData
  const [formData, setFormData] = useState<ProductServiceType>(
    idToModify !== undefined
      ? findProductServiceById(idToModify) ||
          createProductServiceDefaultValues()
      : createProductServiceDefaultValues()
  );

  const ImpuestosOptions = ["IVA 10.5", "IVA 21", "Sin IVA"];

  const isFormComplete = () => {
    if (location.pathname.includes("/productos")) {
      return formData.name && formData.cost;
    } else if (location.pathname.includes("/servicios")) {
      return formData.name && formData.support;
    } else {
      return false; // Or some other default logic
    }
  };

  useEffect(() => {
    // Assign a new ID if idToModify is undefined
    console.log(formData);
    if (idToModify === undefined) {
      setFormData({
        ...formData,
        id: getNextID(),
      });
    }
  }, []);

  useEffect(() => {
    // Set the type field based on the URL path
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: location.pathname.includes("/productos")
        ? ProductOrService.Producto
        : ProductOrService.Servicio,
    }));
  }, [location]);

  const handleSubmit = async () => {
    if (isFormComplete()) {
      try {
        if (idToModify !== undefined) {
          // Modify existing product/service
          await modifyProductService(idToModify, formData);
        } else {
          // Create new product/service
          await createProductService(formData);
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
        <h4 className="headerStyles">
          Alta y modificación de{" "}
          {location.pathname.includes("/productos")
            ? "productos"
            : location.pathname.includes("/servicios")
            ? "servicios"
            : null}
        </h4>
      </Row>
      <Row className="d-flex flex-column justify-content-center align-items-center">
        <Col xs={6}>
          <Col xs={6}>
            <Form.Label>ID: {formData.id}</Form.Label>
          </Col>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Col>
        <Col xs={6}>
          <Form.Label>
            {location.pathname.includes("/productos")
              ? "Costo"
              : location.pathname.includes("/servicios")
              ? "Mantenimiento"
              : "Precio Base"}
          </Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={
              formData.type === ProductOrService.Producto
                ? formData.cost
                : formData.support
            }
            onChange={(e) => {
              const value = Number(e.target.value);
              if (formData.type === ProductOrService.Producto) {
                setFormData({ ...formData, cost: value });
              } else {
                setFormData({ ...formData, support: value });
              }
            }}
          />
        </Col>
        <Col xs={6}>
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            value={
              location.pathname.includes("/productos")
                ? ProductOrService.Producto
                : ProductOrService.Servicio
            }
            disabled={true}
          />
        </Col>
        <Col className="d-flex flex-column" xs={6}>
          <Form.Label>Impuestos</Form.Label>
          <Dropdown
            onSelect={(value) => {
              setSelectedImpuesto(value as string);
              {
                /* If you also want to update formData
            setFormData({ ...formData, impuesto: value as string });*/
              }
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedImpuesto
                ? `Impuesto seleccionado: ${selectedImpuesto}`
                : "Seleccionar Impuesto"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {ImpuestosOptions.map((option, index) => (
                <Dropdown.Item key={index} eventKey={option}>
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Button
        disabled={!isFormComplete()}
        style={{ marginBottom: "10px" }}
        onClick={handleSubmit}
      >
        Agregar{" "}
        {location.pathname.includes("/productos")
          ? "producto"
          : location.pathname.includes("/servicios")
          ? "servicio"
          : ""}
      </Button>
    </Container>
  );
}
