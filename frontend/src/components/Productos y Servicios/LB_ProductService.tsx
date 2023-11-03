import React, {
  useState,
  MouseEvent,
  useEffect,
  useRef,
  useContext,
} from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import {
  PencilFill,
  XCircleFill,
  Search,
  PlusCircle,
  PlusCircleFill,
} from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { UserLoggedContext } from "../../contexts/UserLoggedContext";

interface LB_ProductServiceProps {
  seleccion: string;
}

export default function LB_ProductService(props: LB_ProductServiceProps) {
  const { pedido, setPedido } = useContext(UserLoggedContext);
  const [data, setData] = useState<ProductServiceType[]>([]);
  const [originalData, setOriginalData] = useState<ProductServiceType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [filtrado, setFiltrado] = useState<string>("");
  const [selectedElement, setSelectedElement] =
    useState<ProductServiceType | null>(null);
  const searchBoxRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

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
    console.log(pedido.prods_servs);
  }, [pedido]);

  useEffect(() => {
    if (selectAll().length === 0) {
      fetchData();
    } else {
      updateDataBasedOnFilter();
    }
  }, [filtrado]);

  const exampleObject: ProductServiceType = {
    id: 0,
    nombre: "",
    tipo: ProductOrService.Producto || ProductOrService.Servicio,
    costo: 0,
    impuesto: 0,
    soporte: null,
    cantidad: 1,
    garantia: null
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
          const nameMatch = item.nombre
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const productMatch =
            item.tipo === "PRODUCTO" && String(item.costo).includes(searchTerm);
          const serviceMatch =
            item.tipo === "SERVICIO" &&
            String(item.soporte).includes(searchTerm);

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
      text: `Está a punto de eliminar ${selected.nombre}. ¿Está seguro?`,
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

  const addToPedido = (selected: ProductServiceType) => {
    let updatedProdsServs;

    // Check if an object with the same 'id' already exists in the array
    const itemExists = pedido.prods_servs.some(
      (item) => item.id === selected.id
    );

    if (itemExists) {
      // If the item already exists, filter it out to remove it.
      updatedProdsServs = pedido.prods_servs.filter(
        (item) => item.id !== selected.id
      );
    } else {
      // If the item doesn't exist, add it.
      updatedProdsServs = [...pedido.prods_servs, selected];
    }

    setPedido({ ...pedido, prods_servs: updatedProdsServs });
  };

  const handleSelectChange = (value: string) => {
    setFiltrado(value);
  };

  const actionButtons = (row: ProductServiceType) => {
    return (
      <div className="flex items-center justify-between">
        <button
          className="p-2 hover:bg-blue-600 hover:text-white"
          onClick={() => handleClickedElement(row)}
        >
          <XCircleFill />
        </button>
        {
          (props.seleccion === "multiple")
          &&
            <button className="p-2 hover:bg-blue-600 hover:text-white" onClick={() => addToPedido(row)}>
              <PlusCircleFill />
            </button>
        }
        <button
          className="p-2 hover:bg-blue-600 hover:text-white"
          onClick={() =>
            navigate(
              `${location.pathname}${
                row.tipo === ProductOrService.Producto
                  ? `/AMProductos/`
                  : row.tipo === ProductOrService.Servicio && `/AMServicios/`
              }${row.id}`
            )
          }
        >
          <PencilFill />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center justify-center w-full p-4 pb-0 mx-auto mb-2 flex-column">
        <div className="flex items-center justify-center mb-3">
          <div className="mr-4">
            <input
              type="text"
              placeholder="Buscar"
              className="px-2 py-1 border-2 border-blue-500 inputSearch"
              defaultValue={""}
              ref={searchBoxRef}
              onChange={() => {
                handleSearch();
              }}
            />
          </div>
          <div>
            <select
              name="productOrServiceType"
              id="productOrServiceType"
              className="px-4 py-2 font-medium text-white bg-blue-400 rounded hover:bg-blue-500"
              defaultValue={""}
              onChange={(e) => handleSelectChange(e.target.value.toString())}
            >
              <option value={``}>Sin filtrado</option>
              <option value={`${ProductOrService.Producto}`}>Producto</option>
              <option value={`${ProductOrService.Servicio}`}>Servicio</option>
            </select>
          </div>
        </div>
        {filtrado !== ProductOrService.Producto && (
          <div>
            <h6 className="p-0 m-0 mb-3">
              Costo de mantenimiento de servicios *($)
            </h6>
          </div>
        )}
        {isLoading ? (
          <div>
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full">
            <table className="min-w-full bg-white border border-gray-300 ">
              <thead className="text-white bg-denim-400 ">
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Nombre</th>
                  <th className="px-4 py-2 border-b">Tipo</th>
                  <th className="px-4 py-2 border-b">Precio</th>
                  <th className="px-4 py-2 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((row, index) => (
                    <tr key={index} className="border-b ">
                      <td className="py-2">{row.id}</td>
                      <td className="py-2">{row.nombre}</td>
                      <td className="py-2">{row.tipo}</td>
                      {row.tipo?.toString() === ProductOrService.Producto ? (
                        <td className="py-2">{row.costo}</td>
                      ) : (
                        <td className="py-2">
                          {row.costo} + *(<strong>{row.soporte}</strong>)
                        </td>
                      )}
                      <td className="py-2">{actionButtons(row)}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b">
                    <td colSpan={5} className="px-4 py-2">
                      No hay datos...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
