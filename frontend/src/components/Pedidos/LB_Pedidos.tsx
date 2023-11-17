import React, { useState, useEffect, useContext } from "react";
import {
  PencilFill,
  XCircleFill,
  Search,
  CheckCircleFill,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {
  useFetchPedidos,
  useDeletePedidos,
} from "../../controller/ABMPedidoController";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { EncabezadoPedidoType } from "../types/EncabezadoPedidoType";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import { PedidoType } from "../types/UserLogged";
import BorrarBtn from "../UI Elements/BorrarBtn";
import BuscarBar from "../UI Elements/BuscarBar";
import { PersonasType } from "../types/personType";
import { EnterpriseType } from "../types/enterpriseType";
import { ClienteResponseDTO } from "../types/clientType";
import { useFetchEmpresas } from "../../controller/ABMEnterpriseController";
import { useFetchPersonas } from "../../controller/ABMPersonController";
import { useFetchClientes } from "../../controller/ABMClientController";
import { useFetchProds_Servs } from "../../controller/ABMProductController";
import { ProductServiceType } from "../types/productServiceType";
import VerBtn from "../UI Elements/VerBtn";

export default function LB_Pedido() {
  const [originalData, setOriginalData] = useState<
    EncabezadoPedidoType[] | null
  >([]); // Store the original unfiltered data
  const [filteredData, setFilteredData] = useState<
    EncabezadoPedidoType[] | null
  >([]); // Store the filtered results
  const [isLoading, setIsLoading] = useState(false);
  const { userLogged } = useContext(UserLoggedContext);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [shouldDelete, setShouldDelete] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  const [filterType, setFilterType] = useState(""); // 'date', 'client', 'productService'
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [selectedProductService, setSelectedProductService] = useState("");
  const [personas, setPersonas] = useState<PersonasType[] | null>([]);
  const [empresas, setEmpresas] = useState<EnterpriseType[] | null>([]);
  const [clientes, setClientes] = useState<ClienteResponseDTO[] | null>([]);
  const [shouldFetchPersonas, setShouldFetchPersonas] = useState(true);
  const [shouldFetchEmpresas, setShouldFetchEmpresas] = useState(true);
  const [shouldFetchClientes, setShouldFetchClientes] = useState(false);
  let fetchResponseEmpresa = useFetchEmpresas(undefined, shouldFetchEmpresas);
  let fetchResponsePersonas = useFetchPersonas(undefined, shouldFetchEmpresas);
  let fetchResponseClientes = useFetchClientes(undefined, shouldFetchClientes);
  const [prods_servs, setProds_Servs] = useState<ProductServiceType[] | null>(
    null
  );
  const [shouldFetchProdServ, setShouldFetchProdServ] = useState(true);
  let fetchResponseProdsServ = useFetchProds_Servs(
    undefined,
    shouldFetchProdServ
  );

  useEffect(() => {
    //Obtener Productos / Servicios
    if (fetchResponseProdsServ && shouldFetchProdServ) {
      if (
        !fetchResponseProdsServ.loading &&
        !fetchResponseProdsServ.hasError &&
        fetchResponseProdsServ.json
      ) {
        setProds_Servs(fetchResponseProdsServ.json);
        setShouldFetchProdServ(false);
      } else if (!fetchResponse.loading && fetchResponse.hasError) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setProds_Servs(null);
      }
    }
  }, [fetchResponseProdsServ]);

  useEffect(() => {
    //Obtener empresa
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
    //Obtener persona
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
    //Habilitar obtener cliente
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
    //Obtener cliente
    if (fetchResponseClientes && shouldFetchClientes) {
      if (
        !fetchResponseClientes.loading &&
        !fetchResponseClientes.hasError &&
        fetchResponseClientes.json
      ) {
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

  let fetchResponse = useFetchPedidos(undefined, shouldFetch);
  let deleteResponse = useDeletePedidos(idToDelete, shouldDelete);

  useEffect(() => {
    //Obtener pedidos
    if (fetchResponse && shouldFetch) {
      if (
        !fetchResponse.loading &&
        !fetchResponse.hasError &&
        fetchResponse.json
      ) {
        console.log(fetchResponse.json);
        setOriginalData(fetchResponse.json); // Store original data
        setFilteredData(fetchResponse.json); // Initially, filtered data is the same as original data
        setShouldFetch(false);
      } else if (!fetchResponse.loading && fetchResponse.hasError) {
        Swal.fire("Error!", "No se han podido obtener datos.", "error");
        setOriginalData(null); // Store original data
        setFilteredData(null);
      }
    }
  }, [fetchResponse]);

  useEffect(() => {
    if (deleteResponse && shouldDelete) {
      setShouldDelete(false);
      if (!deleteResponse.loading && !deleteResponse.hasError) {
        Swal.fire(
          "Perfecto!",
          "Cambio el estado del pedido correctamente",
          "success"
        );
        setShouldFetch(true);
      } else if (!deleteResponse.loading && deleteResponse.hasError) {
        if (deleteResponse.statusCode >= 400) {
          Swal.fire(
            "Atención!",
            "Error al cambiar el estado del pedido",
            "warning"
          );
        }
      }
    }
  }, [deleteResponse]);

  const handleFilterTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterType(event.target.value);
    // Reset other filter values
    setStartDate("");
    setEndDate("");
    setSelectedClient("");
    setSelectedProductService("");
  };

  useEffect(() => {
    let newFilteredData = originalData ? [...originalData] : [];
    if (filterType === "date" && startDate && endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      newFilteredData = newFilteredData.filter((pedido) => {
        const pedidoDate = new Date(pedido.fechaCreacion).getTime();
        return pedidoDate >= start && pedidoDate <= end;
      });
    } else if (filterType === "client" && selectedClient) {
      // Determine whether the selectedClient is an empresa or persona
      const [clientType, clientId] = selectedClient.split("-");

      // Convert the clientId to a number for comparison
      const numericClientId = Number(clientId);
      let clientName: string | null = null;
      let personaName: string | null = null;

      if (clientType === "empresa") {
        // Find the empresa by ID and get its name
        const empresa = empresas?.find((e) => e.id === numericClientId);
        clientName = empresa ? empresa.nombre : null;
        console.log(`Empresa Name: ${clientName}`);

        // If selectedPersona is set, find the persona by ID and get its full name
        if (selectedPersona) {
          const numericSelectedPersonaId = Number(selectedPersona);
          const persona = personas?.find(
            (p) => p.id === numericSelectedPersonaId
          );
          personaName = persona
            ? `${persona.nombre} ${persona.apellido}`
            : null;
          console.log(`Persona Name: ${personaName}`);
        }
      } else if (clientType === "persona") {
        // Find the persona by ID and get its full name
        const persona = personas?.find((p) => p.id === numericClientId);
        clientName = persona ? `${persona.nombre} ${persona.apellido}` : null;
        console.log(`Persona Name: ${clientName}`);
      }

      // Filter the pedidos based on the empresa name and persona name
      newFilteredData = newFilteredData.filter((pedido) => {
        const matchesEmpresa = clientName
          ? pedido.empresa === clientName
          : true;
        const matchesPersona = personaName
          ? pedido.persona === personaName
          : true;
        console.log(
          `Pedido Empresa: ${pedido.empresa}, Pedido Persona: ${pedido.persona}`
        );
        return matchesEmpresa && matchesPersona; // Must match both empresa and persona names, if both are provided
      });
    } else if (filterType === "productService" && selectedProductService) {
      const prodServId = parseInt(selectedProductService);
      newFilteredData = newFilteredData.filter((pedido) =>
        pedido.prods_servs.includes(prodServId)
      );
    }
    console.log(newFilteredData);
    setFilteredData(newFilteredData); // Set the filtered data
  }, [
    filterType,
    startDate,
    endDate,
    selectedClient,
    selectedPersona,
    selectedProductService,
  ]);

  const onConfirm = async (pedido: EncabezadoPedidoType) => {
    if (pedido) {
      console.log(`Id to delete is : ${pedido.id}`);
      setIdToDelete(pedido.id);
      setShouldDelete(true);
    }
  };

  const handleClickedElement = (item: EncabezadoPedidoType) => {
    Swal.fire({
      title: "Confirmar cambio de estado del pedido?",
      text: `Esta por ${
        item.anulado ? "activar" : "desactivar"
      } el pedido ID: ${item.id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí! Estoy seguro.",
      cancelButtonText: "Mejor no.",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) onConfirm(item);
    });
  };

  const actionButtons = (row: EncabezadoPedidoType) => (
    <div className="flex justify-center items-center space-x-4">
      <BorrarBtn fnOnClick={() => handleClickedElement(row)} />
      <VerBtn fnOnClick={() => console.log("llevar a orden detail")} />
    </div>
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl p-4 bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex justify-center items-center mb-4">
          <BuscarBar fnOnChange={handleSearchChange} value={searchTerm} />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <label>
            <input
              type="radio"
              name="filterType"
              value="date"
              checked={filterType === "date"}
              onChange={handleFilterTypeChange}
            />
            Filter by Date
          </label>
          <label>
            <input
              type="radio"
              name="filterType"
              value="client"
              checked={filterType === "client"}
              onChange={handleFilterTypeChange}
            />
            Filter By Client
          </label>
          <label>
            <input
              type="radio"
              name="filterType"
              value="productService"
              checked={filterType === "productService"}
              onChange={handleFilterTypeChange}
            />
            Filter by Product / Service
          </label>

          {/* Conditional Inputs based on Filter Type */}
          {filterType === "date" && (
            <>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </>
          )}
          {filterType === "client" && (
            <>
              <select
                value={selectedClient}
                onChange={(e) => {
                  setSelectedClient(e.target.value);
                  setSelectedPersona(""); // Reset selectedPersona when client changes
                }}
              >
                {/* Default option */}
                <option value="">Selecciona un cliente</option>

                {/* Filter out the clientes to show each empresa only once */}
                {empresas &&
                  Array.from(
                    new Set(clientes?.map((cliente) => cliente.empresa_id))
                  )
                    .filter((id) => id !== null) // Remove nulls which represent personas
                    .map((empresaId) => {
                      const empresa = empresas.find((e) => e.id === empresaId);
                      return (
                        empresa && (
                          <option
                            key={empresaId}
                            value={`empresa-${empresaId}`}
                          >
                            {empresa.nombre}
                          </option>
                        )
                      );
                    })}

                {/* List out personas who don't belong to an empresa */}
                {personas &&
                  clientes
                    ?.filter((cliente) => cliente.empresa_id === null)
                    .map((cliente) => {
                      const persona = personas.find(
                        (p) => p.id === cliente.persona_id
                      );
                      return (
                        persona && (
                          <option
                            key={persona.id}
                            value={`persona-${persona.id}`}
                          >
                            {persona.nombre} {persona.apellido}
                          </option>
                        )
                      );
                    })}
              </select>

              {/* Conditional select for personas if an empresa is selected */}
              {selectedClient?.startsWith("empresa-") && (
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                >
                  <option value="">Selecciona una persona</option>
                  {
                    // Filter the clientes to get the personas that belong to the selected empresa
                    clientes
                      ?.filter(
                        (cliente) =>
                          cliente.empresa_id ===
                          parseInt(selectedClient.split("-")[1])
                      )
                      .map((cliente) => {
                        // Find the corresponding persona by persona_id
                        const persona = personas?.find(
                          (p) => p.id === cliente.persona_id
                        );
                        return (
                          persona && (
                            <option key={persona.id} value={persona.id}>
                              {persona.nombre} {persona.apellido}
                            </option>
                          )
                        );
                      })
                  }
                </select>
              )}
            </>
          )}

          {filterType === "productService" && (
            <select
              value={selectedProductService}
              onChange={(e) => setSelectedProductService(e.target.value)}
            >
              <option value="">Seleccionar producto / servicio</option>
              {prods_servs ? (
                prods_servs.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.nombre}
                  </option>
                ))
              ) : (
                // If prods_servs is null or empty, display a message or empty option
                <option disabled>Loading products/services...</option>
              )}
            </select>
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingComponent />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300">ID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Fecha</th>
                  <th className="px-4 py-2 border-b border-gray-300">
                    Persona
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300">
                    Empresa
                  </th>
                  <th className="px-4 py-2 border-b border-gray-300">Prods#</th>
                  <th className="px-4 py-2 border-b border-gray-300">Servs#</th>
                  <th className="px-4 py-2 border-b border-gray-300">Total</th>
                  <th className="px-4 py-2 border-b border-gray-300">Estado</th>
                  <th className="px-4 py-2 border-b border-gray-300">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData &&
                  filteredData.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 border border-gray-300">
                        {row.id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.fechaCreacion.substring(0, 10)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.persona}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.empresa}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.cantProds}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.cantServs}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {row.anulado ? "Anulado" : "Activo"}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {actionButtons(row)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
