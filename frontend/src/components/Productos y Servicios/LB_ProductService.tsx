import React, { useState, MouseEvent, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { PencilFill, XCircleFill, Search } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  ProductOrService,
  ProductServiceType,
} from "../types/productServiceType";
import {
  createProductService,
  deleteProductService,
  fetchProductServices,
  selectAll,
  selectAllProducts,
  selectAllServices,
} from "../../controller/ABMProductController";
import { ConfirmDialog } from "../ConfirmDialog";
import LoadingComponent from "../LoadingComponent";

export default function LB_ProductService() {
  const [data, setData] = useState<ProductServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] =
    useState<ProductServiceType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const fetchedData = await fetchProductServices(setIsLoading);
      console.log(fetchedData);
      updateDataBasedOnLocation(location as any);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const updateDataBasedOnLocation = (location: Location) => {
    if (location.pathname.includes("/productos")) {
      setData(selectAllProducts()); // Assuming 0 is for products
    } else if (location.pathname.includes("/servicios")) {
      setData(selectAllServices()); // Assuming 1 is for services
    }
  };

  useEffect(() => {
    if (selectAll().length === 0) {
      console.log("data fetch");
      fetchData();
    } else {
      updateDataBasedOnLocation(location as any);
    }
  }, [location]);

  const basePath = location.pathname.includes("/productos")
    ? "/productos/AMProductos"
    : "/servicios/AMServicios";
  const handleSearch = () => {
    if (searchTerm === "") {
    } else {
      const filteredData = data.filter(
        (item) =>
          item.id === Number(searchTerm) ||
          item.name.includes(searchTerm) ||
          (item.type === ProductOrService.Producto &&
            item.cost === Number(searchTerm)) ||
          (item.type === ProductOrService.Servicio &&
            item.support === Number(searchTerm))
      );
      setData(filteredData);
    }
  };

  const onConfirm = () => {
    if (selectedElement) {
      deleteProductService(selectedElement.id);
      setShowDialog(false);
      updateDataBasedOnLocation(location as any);
    }
  };

  const handleClickedElement = (selected: ProductServiceType) => {
    setSelectedElement(selected);
    setShowDialog(true);
  };

  const actionButtons = (row: ProductServiceType) => {
    return (
      <div className="d-flex flex-row justify-content-evenly align-items-center">
        <Button
          className="actionButton"
          onClick={() => handleClickedElement(row)}
        >
          <XCircleFill />
        </Button>
        <Link className="actionButton" to={`${basePath}/${row.id}`}>
          <PencilFill />
        </Link>
      </div>
    );
  };
  return (
    <>
      <Container>
        <Row
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ marginBottom: "15px" }}
        >
          <Col xs="auto">
            <input
              type="text"
              placeholder="Buscar"
              className="inputSearch"
              value={searchTerm}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  updateDataBasedOnLocation(location as any); // Update from local state, not from API
                  setSearchTerm("");
                } else {
                  setSearchTerm(e.target.value);
                }
              }}
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              className="searchButton"
              onClick={handleSearch}
            >
              <Search />
            </Button>
          </Col>
        </Row>
        <Row>
          {isLoading ? (
            <Col>
              <LoadingComponent />
            </Col>
          ) : (
            <Col>
              <Table striped bordered hover>
                <thead style={{ backgroundColor: "#FF6F00", color: "#fff" }}>
                  <tr>
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>Tipo</td>
                    <td>Precio</td>
                    <td>Acciones</td>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.type}</td>
                      {row.type.toString() === ProductOrService.Producto ? (
                        <td>{row.cost}</td>
                      ) : (
                        <td>{row.support}</td>
                      )}
                      <td>{actionButtons(row)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          )}
        </Row>
      </Container>
      {showDialog && selectedElement && (
        <ConfirmDialog
          show={showDialog}
          setShow={setShowDialog}
          title={`Confirmar borrar ${
            ProductOrService[selectedElement.type] as string
          }?`}
          content={`Esta por borrar ${selectedElement.name} con ID: ${selectedElement.id}`}
          onConfirm={onConfirm}
          onCancel={() => {
            setShowDialog(false);
            setSelectedElement(null);
          }}
        />
      )}
    </>
  );
}
