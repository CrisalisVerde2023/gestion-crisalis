import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
export default function AM_Clientes() {
  const { idCliente } = useParams<{ idCliente: string }>();
  const idToModify = idCliente ? parseInt(idCliente, 10) : undefined;
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClientesType>(defaultClienteType);
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);

  //Loadings
  const [personasLoading, setPersonasLoading] = useState(true);
  const [empresasLoading, setEmpresasLoading] = useState(true);
  const [clientesLoading, setClientesLoading] = useState(true);

  //Pido personas y empresas
  const [personas, setPersonas] = useState<PersonasType[]>([]);
  const [empresas, setEmpresas] = useState<EnterpriseType[]>([]);
  const [responsePersonas, setResponsePersonas] =
    useState<useFetchReturnType | null>(null);
  const [responseEmpresas, setResponseEmpresas] =
    useState<useFetchReturnType | null>(null);

  let fetchedDataPersonas: useFetchReturnType | null = null;
  let fetchedDataEmpresas: useFetchReturnType | null = null;

  if (idToModify !== undefined) {
    fetchedDataPersonas = useFetchPersonas(idToModify, true);
    fetchedDataEmpresas = useFetchEmpresas(idToModify, true);
  }

  //Busco el cliente a modificar
  const [cliente, setCliente] = useState<ClientesType>();

  //El cliente que se envia para la creacion
  const [clienteDTO, setClienteDTO] = useState({
    persona_id: null,
    empresa_id: null,
  });

  useEffect(() => {
    if (
      fetchedDataPersonas &&
      !fetchedDataPersonas.hasError &&
      fetchedDataPersonas.json &&
      fetchedDataEmpresas &&
      !fetchedDataEmpresas.hasError &&
      fetchedDataEmpresas.json
    ) {
      setClientesLoading(false);
      setFormData({ ...fetchedDataPersonas.json, ...fetchedDataEmpresas });
    }
  }, [fetchedDataPersonas, fetchedDataEmpresas]);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (responsePersonas) {
      if (
        !responsePersonas.loading &&
        !responsePersonas.hasError &&
        responsePersonas.json
      ) {
        console.log("Personas loaded");
        setPersonasLoading(false);
      } else if (!responsePersonas.loading && responsePersonas.hasError) {
        // logic for handling errors
      }
    }
  }, [responsePersonas]);

  useEffect(() => {
    if (responseEmpresas) {
      if (
        !responseEmpresas.loading &&
        !responseEmpresas.hasError &&
        responseEmpresas.json
      ) {
        console.log("Empresas loaded");
        setEmpresasLoading(false);
      } else if (!responseEmpresas.loading && responseEmpresas.hasError) {
        // logic for handling errors
      }
    }
  }, [responseEmpresas]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (value === "") {
      setClienteDTO({
        ...clienteDTO,
        [name]: null,
      });
      console.log(clienteDTO);
      return;
    }

    setClienteDTO({
      ...clienteDTO,
      [name]: value,
    });
    console.log(clienteDTO);
  };

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

  const createResponse = useCreateCliente(clienteDTO, shouldCreate);
  const modifyResponse = useModifyCliente(idToModify, clienteDTO, shouldModify);

  const handleSubmit = () => {
    const complete = isFormComplete();

    if (complete) {
      console.log("ok");
      Swal.fire({ text: "Espere por favor...", showConfirmButton: false });
      if (!idToModify) {
        setShouldCreate(true);
      } else {
        setShouldModify(true);
      }
    } else {
      Swal.fire(
        "Atención!",
        "Debe completar los campos requeridos correctamente.",
        "warning"
      );
    }
  };

  useEffect(() => {
    Swal.close();
    if (createResponse && shouldCreate) {
      setShouldCreate(false);
      if (!createResponse.loading && !createResponse.hasError) {
        Swal.fire("Perfecto!", "Cliente creado correctamente", "success");
        goBack();
      } else if (!createResponse.loading && createResponse.hasError) {
        if (createResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al crear cliente", "warning");
        }
      }
    }
    if (modifyResponse && shouldModify) {
      setShouldModify(false);
      console.log(modifyResponse);
      if (!modifyResponse.loading && !modifyResponse.hasError) {
        Swal.fire("Perfecto!", "Cliente modificado correctamente", "success");
        goBack();
      } else if (!modifyResponse.loading && modifyResponse.hasError) {
        if (modifyResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al modificar cliente", "warning");
        }
      }
    }
  }, [createResponse, modifyResponse]);

  return (
    <Container className=" flex items-center justify-center h-screen mt-[-60px]">
      <div className="w-1/3">
        <p>Editando cliente {idToModify}</p>
        <p>
          Tipo original: {cliente?.empresa === null ? "Persona" : "Empresa"}
        </p>
        <form
          className={
            clienteDTO.empresa_id
              ? "w-full rounded-lg p-3 bg-green-200"
              : "w-full rounded-lg p-3 bg-blue-200"
          }
          onSubmit={handleSubmit}
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
                defaultValue={cliente?.persona.id}
                onChange={handleSelectChange}
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
                defaultValue={cliente?.empresa?.id}
                onChange={handleSelectChange}
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
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {clienteDTO.empresa_id
              ? "GUARDAR COMO EMPRESA"
              : "GUARDAR COMO PERSONA"}
          </button>
        </form>
        <div className="flex justify-center items-center mb-4">
          <div className="flex justify-evenly mt-2 mx-2">
            <button
              onClick={() => goBack()}
              className="bg-red-600 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-red-700"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
