import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchPersonas } from "../../controller/ABMPersonController";
import { useFetchEmpresas } from "../../controller/ABMEnterpriseController";
import {
  useCreateCliente,
  useFetchClientes,
  useModifyCliente,
} from "../../controller/ABMClientController";

import Swal from "sweetalert2";

import { PersonasType } from "../types/personType";
import { EnterpriseType } from "../types/enterpriseType";
import { ClientesType, defaultClienteType } from "../types/clientType";
import { useFetchReturnType } from "../../hooks/useFetch";
import VolverBtn from "../UI Elements/VolverBtn";
export default function AM_Clientes() {
  const { idCliente } = useParams<{ idCliente: string }>();
  const idToModify = idCliente ? parseInt(idCliente, 10) : undefined;
  const navigate = useNavigate();
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);

  //Loadings
  const [personasLoading, setPersonasLoading] = useState(true);
  const [empresasLoading, setEmpresasLoading] = useState(true);
  const [clientesLoading, setClientesLoading] = useState(false);

  //Pido personas y empresas
  const [personas, setPersonas] = useState<PersonasType[]>([]);
  const [empresas, setEmpresas] = useState<EnterpriseType[]>([]);
  const [responsePersonas, setResponsePersonas] =
    useState<useFetchReturnType | null>(null);
  const [responseEmpresas, setResponseEmpresas] =
    useState<useFetchReturnType | null>(null);

  let fetchedDataPersonas: useFetchReturnType | null = null;
  let fetchedDataEmpresas: useFetchReturnType | null = null;
  let fetchedDataClientes: useFetchReturnType | null = null;

  fetchedDataPersonas = useFetchPersonas(undefined, true);
  fetchedDataEmpresas = useFetchEmpresas(undefined, true);
  
  if (idToModify !== undefined) {
    fetchedDataClientes = useFetchClientes(idToModify, clientesLoading);
  } else fetchedDataClientes = useFetchClientes(idToModify, clientesLoading);

  //Busco el cliente a modificar
  const [cliente, setCliente] = useState<ClientesType | undefined>(undefined);

  //El cliente que se envia para la creacion
  const [clienteDTO, setClienteDTO] = useState({
    persona_id: null,
    empresa_id: null,
  });

  useEffect(() => {
    if (!personasLoading && !empresasLoading) {
      setClientesLoading(true);
    }
  }, [personasLoading, empresasLoading]);

  useEffect(() => {
    if (clientesLoading) {
      console.log("trying fetch Clientes");
    }
  }, [clientesLoading]);

  useEffect(() => {
    if (
      clientesLoading &&
      fetchedDataClientes &&
      !fetchedDataClientes.hasError &&
      !fetchedDataClientes.loading
    ) {
      console.log(fetchedDataClientes.json);
      const fetchedCliente = fetchedDataClientes.json;

      // Assuming the fetchedCliente has 'empresa' and 'persona' properties
      // that you want to map to 'empresa_id' and 'persona_id' in the DTO
      setCliente(fetchedCliente);
      setClientesLoading(false);

      // Update the clienteDTO state with the fetched client details
      setClienteDTO({
        persona_id: fetchedCliente?.persona?.id || null,
        empresa_id: fetchedCliente?.empresa?.id || null,
      });
    }
  }, [fetchedDataClientes, clientesLoading]);

  useEffect(() => {
    if (
      fetchedDataPersonas &&
      !fetchedDataPersonas.hasError &&
      !fetchedDataPersonas.loading &&
      fetchedDataEmpresas &&
      !fetchedDataEmpresas.hasError &&
      !fetchedDataEmpresas.loading
    ) {
      setClientesLoading(true);
    }
  }, [fetchedDataPersonas, fetchedDataEmpresas]);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (
      fetchedDataPersonas &&
      !fetchedDataPersonas.hasError &&
      !fetchedDataPersonas.loading
    ) {
      console.log("Personas loaded");
      setPersonas(fetchedDataPersonas.json);
      setPersonasLoading(false);
    } else if (
      fetchedDataPersonas &&
      !fetchedDataPersonas.loading &&
      fetchedDataPersonas.hasError
    ) {
      // logic for handling errors
    }
  }, [fetchedDataPersonas]);

  useEffect(() => {
    if (
      fetchedDataEmpresas &&
      !fetchedDataEmpresas.hasError &&
      !fetchedDataEmpresas.loading
    ) {
      setEmpresasLoading(false);
      setEmpresas(fetchedDataEmpresas.json);
      console.log("Empresas loaded");
    } else if (
      fetchedDataEmpresas &&
      !fetchedDataEmpresas.loading &&
      fetchedDataEmpresas.hasError
    ) {
      // logic for handling errors
    }
  }, [fetchedDataEmpresas]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setClienteDTO((prevDTO) => ({
      ...prevDTO,
      [name]: Number(value) || null, // This will set to null if the value is an empty string (no selection)
    }));
  };

  useEffect(() => {
    console.log(clienteDTO);
  }, [clienteDTO]);

  const isFormComplete = () => {
    const errors = [];
    /*
    if (!formData.nombre) errors.push("El nombre es obligatorio");
    if (formData.nombre.length < 4 || formData.nombre.length > 15)
      errors.push("El nombre debe contener entre 4 y 15 caracteres");

    if (!formData.apellido) errors.push("El apellido es obligatorio");
    if (formData.apellido.length < 4 || formData.apellido.length > 15)
      errors.push("El apellido debe contener entre 4 y 15 caracteres");

    if (!formData.dni) errors.push("El DNI es obligatorio");
    if (formData.dni.length !== 8 || !/^\d{8}$/.test(formData.dni))
      errors.push("El DNI deben ser 8 dígitos numéricos");

    return errors.length === 0;*/
    return true; //!MODIFICAR ESTO
  };

  const modifyResponse = useModifyCliente(idToModify, clienteDTO, shouldModify);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // This will prevent the default form submission behavior.

    const complete = true;
    if (complete) {
      console.log("ok");
      Swal.fire({ text: "Espere por favor...", showConfirmButton: false });

      console.log("modificando....");
      setShouldModify(true);
      
    } else {
      Swal.fire(
        "Atención!",
        "Debe completar los campos requeridos correctamente.",
        "warning"
      );
    }
  };

  useEffect(() => {
    
    if (modifyResponse && shouldModify) {
      console.log("modiresponse", modifyResponse);
      Swal.close();
      if (!modifyResponse.loading && !modifyResponse.hasError) {
        Swal.fire("Perfecto!", "Cliente modificado correctamente", "success");
        goBack();
      } else {
        console.log("datosss, ", idCliente, idToModify, clienteDTO, shouldModify);
        Swal.fire("Atención!", "Error al modificar cliente", "warning");
           
      }
      setShouldModify(false);
    }
  }, [ modifyResponse, shouldModify]);

  return (
    <div className=" flex items-center justify-center h-screen mt-[-60px]">
      <div className="w-1/3">
        <p>Editando cliente {idToModify}</p>
        {cliente !== undefined &&
          !personasLoading &&
          !empresasLoading &&
          !clientesLoading && (
            <>
              <p>
                {`Persona original: ${cliente?.persona.nombre} ${cliente?.persona.apellido}`}
              </p>
              <p>
                Tipo original:{" "}
                {cliente?.empresa === null ? "Persona" : "Empresa"}
              </p>
            </>
          )}
        <form
          className={
            clienteDTO.empresa_id
              ? "w-full rounded-lg p-3 bg-green-200"
              : "w-full rounded-lg p-3 bg-blue-200"
          }
        >
          {personasLoading || empresasLoading || clientesLoading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Persona:
              </label>

              <select
                name="persona_id"
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleSelectChange}
                defaultValue={cliente?.persona.id}
              >
                <option value={""}>---Seleccione Persona---</option>

                {personas.map((persona, index) => (
                  <option key={index} value={persona.id}>
                    ID: {persona.id} - {persona.nombre} {persona.apellido}
                  </option>
                ))}
              </select>

              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Empresa:
              </label>
              <select
                name="empresa_id"
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleSelectChange}
                defaultValue={
                  cliente?.empresa !== null ? cliente?.empresa.id : 0
                }
              >
                <option value={""}>---Seleccione Empresa---</option>
                {empresas.map((empresa, index) => (
                  <option key={index} value={empresa.id}>
                    ID: {empresa.id} - {empresa.nombre}
                  </option>
                ))}
              </select>
            </>
          )}
          <button
            type="button"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            GUARDAR
          </button>
        </form>
        <div className="flex justify-center items-center mb-4">
          <div className="flex justify-evenly mt-2 mx-2">
            <VolverBtn fnOnClick={goBack} />
          </div>
        </div>
      </div>
    </div>
  );
}
