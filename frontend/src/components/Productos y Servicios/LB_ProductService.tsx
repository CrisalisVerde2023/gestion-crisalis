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
import AgregarBtn from "../UI Elements/AgregarBtn";
import RemoverBtn from "../UI Elements/RemoverBtn";
import EditarBtn from "../UI Elements/EditarBtn";
import BorrarBtn from "../UI Elements/BorrarBtn";
import BuscarBar from "../UI Elements/BuscarBar";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";

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

    soporte: null,
    cantidad: 1,
    garantia: null,

    idImpuestos: [],
    eliminado: false,
  };

  const validColumnKeys: (keyof ProductServiceType)[] = Object.keys(
    exampleObject
  ) as (keyof ProductServiceType)[];

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();

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

  // Function to add an item to the pedido
  const addToPedido = (selected: ProductServiceType) => {
    // If the item doesn't exist, add it.
    if (!pedido.prods_servs.some((item) => item.id === selected.id)) {
      const updatedProdsServs = [
        ...pedido.prods_servs,
        {
          ... selected,
          cantidad: 1,
          garantia: (selected.tipo === "PRODUCTO") ? 0 : null,

          descuento: null,
          garantiaCosto: (selected.tipo === "PRODUCTO") ? 0 : null,
        }
      ];
      setPedido({ ...pedido, prods_servs: updatedProdsServs });
    }
  };

  // Function to remove an item from the pedido
  const removeFromPedido = (selected: ProductServiceType) => {
    // If the item already exists, filter it out to remove it.
    if (pedido.prods_servs.some((item) => item.id === selected.id)) {
      const updatedProdsServs = pedido.prods_servs.filter(
        (item) => item.id !== selected.id
      );
      setPedido({ ...pedido, prods_servs: updatedProdsServs });
    }
  };

  const handleSelectChange = (value: string) => {
    setFiltrado(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const actionButtons = (row: ProductServiceType) => {
    return (
      <div className="flex justify-content-center spaceHorizontalChilds">
        <ToggleEstadoBtn
          fnOnClick={() => handleClickedElement(row)}
          estado={row.eliminado}
        />
        <EditarBtn
          fnOnClick={() =>
            navigate(
              `${location.pathname}${row.tipo === ProductOrService.Producto
                ? `/AMProductos/`
                : row.tipo === ProductOrService.Servicio && `/AMServicios/`
              }${row.id}`
            )
          }
        />
      </div>
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-white dark:bg-gray-800  shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex items-center justify-center w-full p-4 pb-0 mx-auto mb-2 flex-column">
          <div className="w-full mx-auto max-w-screen-xl px-4 lg:px-12 flex items-center justify-center mb-3">
            <div className="mr-4 w-full flex justify-content-between">
              <BuscarBar fnOnChange={handleSearchChange} />
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
          {isLoading ? (
            <div>
              <LoadingComponent />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* {Object.keys(defaultProductService).map((key) => {
                      if (key !== "eliminado") {
                        return (
                          <th
                            scope="col"
                            className="px-4 py-3 text-center"
                            key={key}
                          >
                            {key.charAt(0).toUpperCase() +
                              key.slice(1).toLowerCase()}
                          </th>
                        );
                      } else {
                        return;
                      }
                    })} */}

                    <th scope="col" className="px-4 py-3 text-center">ID</th>
                    <th scope="col" className="px-4 py-3 text-center">Nombre</th>
                    <th scope="col" className="px-4 py-3 text-center">Tipo</th>
                    <th scope="col" className="px-4 py-3 text-center">Costo</th>
                    <th scope="col" className="px-4 py-3 text-center">Soporte</th>
                    <th scope="col" className="px-4 py-3 text-center">Impuestos</th>
                    <th scope="col" className="px-4 py-3 text-center">Acciones</th>

                  </tr>
                </thead>
                <tbody>
                  {data && data.length ? (
                    data.map((row, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        {/* {Object.keys(defaultProductService).map((key) => {
                          const cellClass = "px-4 py-3 text-center";
                          if (
                            key === "costo" &&
                            row.tipo?.toString() === ProductOrService.Producto
                          ) {
                            return (
                              <td key={key + "Column"} className={cellClass}>
                                {row[key]}
                              </td>
                            );
                          } else if (
                            key === "costo" &&
                            row.tipo?.toString() === ProductOrService.Servicio
                          ) {
                            return <td className={cellClass}>{row[key]} </td>;
                          } else if (key === "eliminado") {
                            return;
                          } else {
                            return (
                              <td className={cellClass}>{(row as any)[key]}</td>
                            );
                          }
                        })} */}
                        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                          {row.id}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                          {row.nombre}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                          {row.tipo}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                          $ {row.costo}
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                          {
                            row.soporte ?
                              <span>$ {row.soporte}</span> :
                              <span className="text-red-600">-</span>
                          }
                        </td>
                        <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                          <div className=" w-[200px] h-[50px] flex justify-start items-start flex-wrap p-[2px] overflow-auto">
                            {
                              row.impuestos.length ?
                              row.impuestos.map((impuesto) => {
                                return (
                                  <span key={impuesto.id} className={`border-1 mr-[1px] border-denim-200 px-[5px] rounded-xl text-[10px] bg-denim-600 ${impuesto.eliminado ? 'text-red-400' : 'text-white' }`}>
                                    {impuesto.nombre}
                                  </span>
                                );
                              })
                              :
                              <span className="text-gray-400 w-full h-full flex justify-center items-center">Sin impuestos asociados</span>
                            }
                          </div>

                        </td>
                        {!props.seleccion && (
                          <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                            {actionButtons(row)}
                          </td>
                        )}
                        {props.seleccion === "multiple" &&
                          (!pedido.prods_servs.some(
                            (item) => item.id === row.id
                          ) ? (
                            <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                              <AgregarBtn fnOnClick={() => addToPedido(row)} />
                            </td>
                          ) : (
                            <td className="px-4 py-3 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-5">
                              <RemoverBtn
                                fnOnClick={() => removeFromPedido(row)}
                              />
                            </td>
                          ))}
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b dark:border-gray-700">
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
      </div>
    </section>
  );
}
