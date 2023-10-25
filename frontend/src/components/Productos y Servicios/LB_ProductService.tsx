import React, { useState, MouseEvent, useEffect, useRef } from "react";
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
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";

export default function LB_ProductService() {
  const [data, setData] = useState<ProductServiceType[]>([]);
  const [originalData, setOriginalData] = useState<ProductServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [filtrado, setFiltrado] = useState<string>("");
  const [selectedElement, setSelectedElement] =
    useState<ProductServiceType | null>(null);
  const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const fetchData = async () => {
    try {
      const fetchedData = await fetchProductServices(setIsLoading);
      console.log(fetchedData);
      updateDataBasedOnFilter();
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
  };

  const updateDataBasedOnFilter = () => {
    if (filtrado === ProductOrService.Producto) {
      const dataFetched = selectAllProducts();
      setOriginalData(dataFetched);
      setData(dataFetched);
    } else if (filtrado === ProductOrService.Servicio) {
      const dataFetched = selectAllServices();
      setOriginalData(dataFetched);
      setData(selectAllServices());
    } else {
      const dataFetched = selectAll();
      setOriginalData(dataFetched);
      setData(dataFetched);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [data]);

  useEffect(() => {
    if (selectAll().length === 0) {
      fetchData();
    } else {
      updateDataBasedOnFilter();
    }
  }, [filtrado]);

  const exampleObject: ProductServiceType = {
    id: 0,
    name: "",
    type: ProductOrService.Producto || ProductOrService.Servicio,
    cost: 0,
    support: 0,
  };

  const validColumnKeys: (keyof ProductServiceType)[] = Object.keys(
    exampleObject
  ) as (keyof ProductServiceType)[];

  const handleSearch = () => {
    if (!searchBoxRef.current) {
      return;
    }
    const searchTerm = searchBoxRef.current.value.toLowerCase();
    if (searchTerm.length > 0) {
      let filteredData: ProductServiceType[] = [];
      const hasColon = searchTerm.includes(":");
      if (hasColon) {
        const [columnKey, columnValue] = searchTerm
          .split(":")
          .map((str) => str.trim());

        if (validColumnKeys.includes(columnKey as keyof ProductServiceType)) {
          filteredData = originalData.filter((item) =>
            String(item[columnKey as keyof ProductServiceType])
              .toLowerCase()
              .includes(columnValue.toLowerCase())
          );
        }
      } else {
        filteredData = originalData.filter((item) => {
          const idMatch = item.id === Number(searchTerm);
          const nameMatch = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const productMatch =
            item.type === "Producto" && String(item.cost).includes(searchTerm);
          const serviceMatch =
            item.type === "Servicio" &&
            String(item.support).includes(searchTerm);

          return idMatch || nameMatch || productMatch || serviceMatch;
        });
      }
      setData(filteredData);
    } else {
      setData(originalData);
    }
  };

  const onConfirm = (productService: ProductServiceType) => {
    if (productService)
      deleteProductService(productService.id)
        .then(() => {
          Swal.fire({
            title: "Realizado!",
            text: "El producto/servicio ha sido eliminado.",
            icon: "success",
            timer: 2000,
          });
          updateDataBasedOnFilter();
        })
        .catch(() => {
          Swal.fire(
            "Error!",
            "No se ha podido eliminar el producto/servicio.",
            "error"
          );
        });
  };

  const handleClickedElement = (selected: ProductServiceType) => {
    Swal.fire({
      title: "Confirmar eliminación del producto o servicio?",
      text: `Está a punto de eliminar ${selected.name}. ¿Está seguro?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(selected);
      }
    });
  };

  const handleSelectChange = (value: string) => {
    setFiltrado(value);
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
        <Link
          className="actionButton"
          to={`${location.pathname}${
            row.type === ProductOrService.Producto
              ? `/AMProductos/`
              : row.type === ProductOrService.Servicio && `/AMServicios/`
          }${row.id}`}
        >
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
              className="inputSearch border-2 border-blue-500"
              defaultValue={""}
              ref={searchBoxRef}
              onChange={() => {
                handleSearch();
              }}
            />
          </Col>
          <Col xs="auto">
            <select
              name="productOrServiceType"
              id="productOrServiceType"
              className=" bg-denim-400 px-4 py-2 rounded-md text-white font-medium hover:bg-denim-500"
              aria-label=".form-select-lg"
              defaultValue={""}
              onChange={(e) => handleSelectChange(e.target.value.toString())}
            >
              <option value={``} className="pr-6 pl-6">
                Sin filtrado
              </option>
              <option
                value={`${ProductOrService.Producto}`}
                className="pr-6 pl-6"
              >
                Producto
              </option>
              <option
                value={`${ProductOrService.Servicio}`}
                className="pr-6 pl-6"
              >
                Servicio
              </option>
            </select>
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
    </>
  );
}
