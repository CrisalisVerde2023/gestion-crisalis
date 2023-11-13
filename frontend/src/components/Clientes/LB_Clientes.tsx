import React, { useState, useEffect, useContext } from "react";
import {
  PencilFill,
  XCircleFill,
  CheckCircleFill,
  PersonWorkspace,
  Building,
} from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

//Fetch clientes
import {
  useCreateCliente,
  useDeleteCliente,
  useFetchClientes,
} from "../../controller/ABMClientController";

//Fetch personas
import { useFetchPersonas } from "../../controller/ABMPersonController";
//Fetch empresas
import { useFetchEmpresas } from "../../controller/ABMEnterpriseController";

import {
  ClienteDTO,
  ClienteResponseDTO,
  ClientesType,
  defaultClienteDTO,
} from "../types/clientType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import { PersonasType, defaultPersonasType } from "../types/personType";
import { EnterpriseType, defaultEnterpriseType } from "../types/enterpriseType";
import BuscarBar from "../UI Elements/BuscarBar";
import ToggleEstadoBtn from "../UI Elements/ToggleEstadoBtn";
import EditarBtn from "../UI Elements/EditarBtn";
import SeleccionarBtn from "../UI Elements/SelectBtn";

interface LB_ClientesProps {
  seleccion: string;
}

export default function LB_Clientes(props: LB_ClientesProps) {
  const [data, setData] = useState<ClientesType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [showingClients, setShowingClients] = useState<
    ClienteResponseDTO[] | null
  >([]);
  //Pido personas y empresas
  const [personas, setPersonas] = useState<PersonasType[] | null>([]);
  const [empresas, setEmpresas] = useState<EnterpriseType[] | null>([]);
  const [clientes, setClientes] = useState<ClienteResponseDTO[] | null>([]);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldFetchPersonas, setShouldFetchPersonas] = useState(true);
  const [shouldFetchEmpresas, setShouldFetchEmpresas] = useState(true);
  const [shouldFetchClientes, setShouldFetchClientes] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  const [clienteDTO, setClienteDTO] = useState<ClienteDTO>(defaultClienteDTO);
  const [filterByPersona, setFilterByPersona] = useState(true);
  const [filterByEmpresa, setFilterByEmpresa] = useState(true);
  let fetchResponseEmpresa = useFetchEmpresas(undefined, shouldFetchEmpresas);
  let fetchResponsePersonas = useFetchPersonas(undefined, shouldFetchEmpresas);
  let fetchResponseClientes = useFetchClientes(undefined, shouldFetchClientes);

  let fetchResponse = useFetchClientes(undefined, shouldFetchClientes);
  let deleteResponse = useDeleteCliente(idToDelete, shouldDelete);
  let createResponse = useCreateCliente(clienteDTO, shouldCreate);

  const { pedido, setPedido } = useContext(UserLoggedContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (fetchResponseEmpresa && shouldFetchEmpresas) {
      if (
        !fetchResponseEmpresa.loading &&
        !fetchResponseEmpresa.hasError &&
        fetchResponseEmpresa.json
      ) {
        setEmpresas(fetchResponseEmpresa.json);
        setShouldFetchEmpresas(false);
      } else if (
        !fetchResponseEmpresa.loading &&
        fetchResponseEmpresa.hasError
      ) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setEmpresas(null);
      }
    }
  }, [fetchResponseEmpresa]);

  useEffect(() => {
    if (fetchResponsePersonas && shouldFetchPersonas) {
      if (
        !fetchResponsePersonas.loading &&
        !fetchResponsePersonas.hasError &&
        fetchResponsePersonas.json
      ) {
        setPersonas(fetchResponsePersonas.json);
        setShouldFetchPersonas(false);
      } else if (
        !fetchResponsePersonas.loading &&
        fetchResponsePersonas.hasError
      ) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setPersonas(null);
      }
    }
  }, [fetchResponsePersonas]);

  useEffect(() => {
    if (
      !shouldFetchPersonas &&
      fetchResponsePersonas &&
      fetchResponsePersonas.json &&
      !shouldFetchEmpresas &&
      fetchResponseEmpresa &&
      fetchResponseEmpresa.json
    ) {
      console.log("Tiene personas y empresas, pedir clientes");
      setShouldFetchClientes(true);
    }
  }, [shouldFetchEmpresas, shouldFetchPersonas]);

  useEffect(() => {
    if (fetchResponseClientes && shouldFetchClientes) {
      if (
        !fetchResponseClientes.loading &&
        !fetchResponseClientes.hasError &&
        fetchResponseClientes.json
      ) {
        console.log(fetchResponseClientes.json);
        setClientes(fetchResponseClientes.json);
        setShouldFetchClientes(false);
      } else if (
        !fetchResponseClientes.loading &&
        fetchResponseClientes.hasError
      ) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setClientes(null);
      }
    }
  }, [fetchResponseClientes]);

  useEffect(() => {
    if (deleteResponse && shouldDelete) {
      setShouldDelete(false);
      if (!deleteResponse.loading && !deleteResponse.hasError) {
        Swal.fire(
          "Perfecto!",
          "Cambio el estado del cliente correctamente",
          "success"
        );
        setShouldFetchClientes(true);
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al modificar cliente", "warning");
        }
      }
    }
  }, [deleteResponse]);

  const handleSearch = (searchTerm: string) => {
    let filteredClientes = clientes;

    if (clientes && personas && empresas) {
      if (searchTerm) {
        filteredClientes = clientes.filter((cliente) => {
          const persona = personas.find((p) => p.id === cliente.persona_id);
          const empresa = empresas.find((e) => e.id === cliente.empresa_id);

          const personaMatches =
            persona && filterByPersona
              ? `${persona.nombre} ${persona.apellido}`
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              : false;
          const empresaMatches =
            empresa && filterByEmpresa
              ? empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              : false;

          return (
            personaMatches ||
            empresaMatches ||
            cliente.id.toString().includes(searchTerm)
          );
        });
      }
    }

    setShowingClients(filteredClientes);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, filterByEmpresa, filterByPersona]);

  useEffect(() => {
    handleSearch("");
  }, [clientes]);

  useEffect(() => {
    if (createResponse && shouldCreate) {
      setShouldCreate(false);
      if (!createResponse.loading && !createResponse.hasError) {
        setShouldFetchEmpresas(true);
        setShouldFetchPersonas(true);
        console.log("creado");
        Swal.fire("Perfecto!", "Creo al cliente correctamente", "success");
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al crear cliente", "warning");
        }
      }
    }
  }, [deleteResponse]);

  useEffect(() => {
    console.log(clienteDTO);
  }, [clienteDTO]);

  // Function to handle the change of the select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setClienteDTO((prevDTO) => ({
      ...prevDTO,
      [name]: value === "" ? null : parseInt(value),
    }));
  };

  const createClient = () => {
    setShouldCreate(true);
  };

  const onConfirm = async (cliente: ClienteResponseDTO) => {
    if (cliente) {
      console.log(`Id to delete is : ${cliente.id}`);
      setIdToDelete(cliente.id);
      setShouldDelete(true);
    }
  };

  const addToPedido = (cliente: ClienteResponseDTO) => {
    // Assuming that 'personas' and 'empresas' are accessible here and are not null
    const persona = personas?.find((p) => p.id === cliente.persona_id);
    const empresa = empresas?.find((e) => e.id === cliente.empresa_id);

    // Creating the cliente object in the form that 'pedido' expects
    const clienteForPedido = {
      id: cliente.id,
      persona: persona || defaultPersonasType,
      empresa: empresa || null,
      eliminado: cliente.eliminado,
    };

    setPedido({ ...pedido, cliente: clienteForPedido });
  };

  const handleClickedElement = (selected: ClienteResponseDTO) => {
    // Find the full persona and empresa details
    const persona = personas?.find((p) => p.id === selected.persona_id);
    const empresa = selected.empresa_id
      ? empresas?.find((e) => e.id === selected.empresa_id)
      : null;

    Swal.fire({
      title: "Confirmar cambio de estado de una persona?",
      text: `Esta por ${selected.eliminado ? "activar" : "desactivar"} a ${
        persona ? persona.nombre : "una persona"
      } ${empresa ? "de la empresa " + empresa.nombre : ""}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(selected);
      } else if (result.isDenied || result.isDismissed) {
        // Handle the denial or dismissal of the alert if necessary
      }
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const actionButtons = (row: ClienteResponseDTO) => (
    <div className="d-flex flex-row align-items-center justify-content-center spaceHorizontalChilds">
      <ToggleEstadoBtn
        fnOnClick={() => handleClickedElement(row)}
        estado={row.eliminado}
      />
      <EditarBtn fnOnClick={() => navigate(`/clientes/AMClientes/${row.id}`)} />
    </div>
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12 bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-row justify-center items-center mt-4 mb-4 ">
          <form
            className={`flex flex-column justify-content-center align-items-center px-4 text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-200 shadow-md shadow-gray-300 rounded-lg`}
          >
            <label
              htmlFor="persona_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-1"
            >
              Persona:
            </label>
            <div className="flex items-center">
              <select
                name="persona_id"
                id="persona_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500"
                onChange={handleSelectChange}
              >
                <option value="">---Seleccione Persona---</option>
                {personas?.map((persona, index) => (
                  <option key={index} value={persona.id}>
                    ID: {persona.id} - {persona.nombre} {persona.apellido}
                  </option>
                ))}
              </select>

              <div
                onClick={() => console.log("agregar persona")}
                className="flex items-center ml-1 cursor-pointer px-2"
              >
                <PersonWorkspace /> +
              </div>
            </div>
            <label
              htmlFor="empresa_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-3"
            >
              Empresa:
            </label>
            <div className="flex items-center">
              <select
                name="empresa_id"
                id="empresa_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500"
                onChange={handleSelectChange}
              >
                <option value="">---Seleccione Empresa---</option>
                {empresas?.map((empresa, index) => (
                  <option key={index} value={empresa.id}>
                    ID: {empresa.id} - {empresa.nombre}
                  </option>
                ))}
              </select>
              <div
                onClick={() => console.log("agregar empresa")}
                className="flex items-center ml-1 cursor-pointer px-2"
              >
                <Building /> +
              </div>
            </div>
            <button
              className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={(e) => {
                setShouldCreate(true);
              }}
            >
              {clienteDTO?.empresa_id === null
                ? "CREAR CLIENTE PERSONA"
                : "CREAR CLIENTE EMPRESA"}
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center mb-4">
          <div className="flex-auto flex justify-center mb-4">
            <BuscarBar fnOnChange={handleSearchChange} value={searchTerm} />
            <div className="flex items-center ml-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterByPersona}
                  onChange={(e) => setFilterByPersona(e.target.checked)}
                  className="mr-2"
                />
                <PersonWorkspace className="text-blue-400" />
              </label>
            </div>
            <div className="flex items-center ml-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterByEmpresa}
                  onChange={(e) => setFilterByEmpresa(e.target.checked)}
                  className="mr-2"
                />
                <Building className="text-green-400" />
              </label>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingComponent />
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-4 py-3 text-center">Id</th>
                    <th className="px-4 py-3 text-center">Tipo de Cliente</th>
                    <th className="px-4 py-3 text-center">Persona</th>
                    <th className="px-4 py-3 text-center">Empresa</th>
                    <th className="px-4 py-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {showingClients
                    ?.sort((a, b) => (a.id < b.id ? -1 : 1))
                    .map((cliente, index) => {
                      const persona = personas?.find(
                        (p) => p.id === cliente.persona_id
                      );
                      const empresa = cliente.empresa_id
                        ? empresas?.find((e) => e.id === cliente.empresa_id)
                        : null;
                      return (
                        <tr
                          key={index}
                          className={`border-b text-center ${
                            cliente.eliminado && "bg-gray-300"
                          }`}
                        >
                          <td className="py-2 px-4">{cliente.id}</td>
                          <td className="py-2 px-4">
                            {cliente.empresa_id ? "Empresa" : "Persona"}
                          </td>
                          <td className="py-2 px-4">
                            {`${persona?.nombre} ${persona?.apellido}`}
                          </td>
                          <td className="py-2 px-4">{empresa?.nombre}</td>
                          <td className="py-2 px-4 flex justify-content-center">
                            {!props.seleccion && actionButtons(cliente)}
                            {props.seleccion === "simple" &&
                              !cliente.eliminado && (
                                <SeleccionarBtn
                                  fnOnClick={() => {
                                    addToPedido(cliente);
                                  }}
                                  seleccionado={
                                    pedido.cliente.id === cliente.id
                                  }
                                />
                              )}
                          </td>
                        </tr>
                      );
                    })}
                  {showingClients?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-2 px-4 text-center">
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
