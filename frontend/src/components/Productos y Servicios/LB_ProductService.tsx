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
  defaultProductServiceValues,
} from "../types/productServiceType";
import {
  useDeleteProds_Servs,
  useFetchProds_Servs,
} from "../../controller/ABMProductController";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";

interface LB_ProductServiceProps {
  seleccion: string;
}

export default function LB_ProductService(props: LB_ProductServiceProps) {
  const { pedido, setPedido } = useContext(UserLoggedContext);
  const [data, setData] = useState<ProductServiceType[] | null>(null);
  const [originalData, setOriginalData] = useState<ProductServiceType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [filtrado, setFiltrado] = useState<string>("");
  const [selectedElement, setSelectedElement] =
    useState<ProductServiceType | null>(null);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  const searchBoxRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const defaultProductService: ProductServiceType = defaultProductServiceValues;
  let fetchResponse = useFetchProds_Servs(undefined, shouldFetch);
  let deleteResponse = useDeleteProds_Servs(idToDelete, shouldDelete);

  useEffect(() => {
    if (fetchResponse && shouldFetch) {
      if (
        !fetchResponse.loading &&
        !fetchResponse.hasError &&
        fetchResponse.json
      ) {
        setOriginalData(fetchResponse.json);
        setData(fetchResponse.json);
        setShouldFetch(false);
      } else if (!fetchResponse.loading && fetchResponse.hasError) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setOriginalData(null);
        setData(null);
      }
    }
  }, [fetchResponse]);

  useEffect(() => {
    if (deleteResponse && shouldDelete) {
      setShouldDelete(false);
      if (!deleteResponse.loading && !deleteResponse.hasError) {
        Swal.fire("Perfecto!", "Elimino correctamente", "success");
        setShouldFetch(true);
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al eliminar", "warning");
        }
      }
    }
  }, [deleteResponse]);

  const selectAllProducts = (): ProductServiceType[] => {
    let filtered: ProductServiceType[] = [];
    if (originalData) {
      console.log("Filtrando prod");

      filtered = originalData.filter(
        (item) => item.tipo.toString() === ProductOrService.Producto
      );
    }
    console.log(filtered);

    return filtered;
  };

  const selectAllServices = (): ProductServiceType[] => {
    let filtered: ProductServiceType[] = [];
    if (originalData) {
      console.log("Filtrando serv");

      filtered = originalData.filter(
        (item) => item.tipo.toString() === ProductOrService.Servicio
      );
    }
    console.log(filtered);
    return filtered;
  };

  const updateDataBasedOnFilter = () => {
    let filtered: ProductServiceType[] = [];

    // Filter based on 'filtrado' selection
    if (filtrado === ProductOrService.Producto) {
      filtered = selectAllProducts();
    } else if (filtrado === ProductOrService.Servicio) {
      filtered = selectAllServices();
    } else if (originalData) {
      filtered = [...originalData]; // Make a copy of the original data
    }

    // If there's a search term, apply the search filter
    if (searchBoxRef.current?.value) {
      const searchTerm = searchBoxRef.current.value.toLowerCase();

      // Apply the search term
      if (searchTerm) {
        if (searchTerm.includes(":")) {
          // Specific column search
          const [columnKey, columnValue] = searchTerm
            .split(":")
            .map((str) => str.trim());
          if (validColumnKeys.includes(columnKey as keyof ProductServiceType)) {
            filtered = filtered.filter((item) =>
              String(item[columnKey as keyof ProductServiceType])
                .toLowerCase()
                .includes(columnValue)
            );
          }
        } else {
          // General search across all keys
          filtered = filtered.filter((item) =>
            Object.keys(item).some((key) =>
              String(item[key as keyof ProductServiceType])
                .toLowerCase()
                .includes(searchTerm)
            )
          );
        }
      }
    }

    setData(filtered); // Update the state with the filtered data
  };

  useEffect(() => {
    updateDataBasedOnFilter();
  }, [searchBoxRef.current?.value, filtrado]);

  useEffect(() => {
    console.log(pedido.prods_servs);
  }, [pedido]);

  useEffect(() => {
    if (!originalData || originalData.length === 0) {
      setShouldFetch(true);
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
    garantia: null,
  };

  const validColumnKeys: (keyof ProductServiceType)[] = Object.keys(
    exampleObject
  ) as (keyof ProductServiceType)[];

  const handleSearch = () => {
    if (!searchBoxRef.current) {
      return;
    }

    const searchTerm = searchBoxRef.current.value.toLowerCase();

    // If there's no search term, reset data to the original filtered by 'filtrado'
    if (!searchTerm) {
      updateDataBasedOnFilter();
      return;
    }

    let filteredData: ProductServiceType[] = [];

    // Specific column search
    if (searchTerm.includes(":")) {
      const [columnKey, columnValue] = searchTerm
        .split(":")
        .map((str) => str.trim());

      if (validColumnKeys.includes(columnKey as keyof ProductServiceType)) {
        filteredData = data
          ? data.filter((item) =>
              String(item[columnKey as keyof ProductServiceType])
                .toLowerCase()
                .includes(columnValue)
            )
          : [];
      }
    } else {
      filteredData = data
        ? data.filter((item) =>
            Object.keys(item).some((key) =>
              String(item[key as keyof ProductServiceType])
                .toLowerCase()
                .includes(searchTerm)
            )
          )
        : [];
    }

    // Apply 'filtrado' filter if it's not empty
    if (filtrado !== "") {
      filteredData = filteredData.filter((item) => item.tipo === filtrado);
    }

    setData(filteredData);
  };

  const onConfirm = async (productService: ProductServiceType) => {
    if (productService) {
      console.log(`Id to delete is : ${productService.id}`);
      setIdToDelete(productService.id);
      setShouldDelete(true);
    }
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
      <div className="flex justify-between items-center">
        <button
          className="p-2 hover:bg-blue-600 hover:text-white"
          onClick={() => handleClickedElement(row)}
        >
          <XCircleFill />
        </button>
        {props.seleccion === "multiple" && (
          <button
            className="p-2 hover:bg-blue-600 hover:text-white"
            onClick={() => addToPedido(row)}
          >
            <PlusCircleFill />
          </button>
        )}
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
      <div className="w-full flex flex-column justify-center items-center mb-2 mx-auto p-4 pb-0">
        <div className="flex justify-center items-center mb-3">
          <div className="mr-4">
            <input
              type="text"
              placeholder="Buscar"
              className="inputSearch border-2 border-blue-500 px-2 py-1"
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
              className="bg-blue-400 px-4 py-2 rounded text-white font-medium hover:bg-blue-500"
              defaultValue={""}
              onChange={(e) => handleSelectChange(e.target.value.toString())}
            >
              <option value={``}>Sin filtrado</option>
              <option value={`${ProductOrService.Producto}`}>Producto</option>
              <option value={`${ProductOrService.Servicio}`}>Servicio</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <div>
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full">
            <table className="min-w-full bg-white border border-gray-300 ">
              <thead className="bg-denim-400 text-white ">
                <tr>
                  {Object.keys(defaultProductService).map((key) => (
                    <th className="py-2 px-4 border-b" key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                    </th>
                  ))}
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length ? (
                  data
                    .filter((row: any) => !row.eliminado)
                    .map((row, index) => (
                      <tr key={index} className="border-b">
                        {Object.keys(defaultProductService).map((key) => {
                          if (
                            key === "costo" &&
                            row.tipo?.toString() === ProductOrService.Producto
                          ) {
                            return (
                              <td key={key + "Column"} className="py-2">
                                {row[key]}
                              </td>
                            );
                          } else if (
                            key === "costo" &&
                            row.tipo?.toString() === ProductOrService.Servicio
                          ) {
                            return <td className="py-2">{row[key]} </td>;
                          } else {
                            return (
                              <td className="py-2">{(row as any)[key]}</td>
                            );
                          }
                        })}
                        <td className="py-2">{actionButtons(row)}</td>
                      </tr>
                    ))
                ) : (
                  <tr className="border-b">
                    <td
                      colSpan={Object.keys(defaultProductService).length + 1}
                      className="py-2 px-4"
                    >
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
