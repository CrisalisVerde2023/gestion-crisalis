import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { fetchPersonas } from "../../controller/ABMPersonController";
import { fetchEnterprises } from "../../controller/ABMEnterpriseController";
import { fetchClientes, updateClient } from "../../controller/ABMClientController";

import Swal from "sweetalert2";

import { PersonasType } from "../types/personType";
import { EnterpriseType } from "../types/enterpriseType";
import { ClientesType } from "../types/clientType";
export default function AM_Clientes() {
    const { idCliente } = useParams<{ idCliente: string }>();
    const idToModify = idCliente ? parseInt(idCliente, 10) : undefined;
    const location = useLocation();
    const navigate = useNavigate();

    //Loadings
    const [personasLoading, setPersonasLoading] = useState(true);
    const [empresasLoading, setEmpresasLoading] = useState(true);
    const [clientesLoading, setClientesLoading] = useState(true);

    //Pido personas y empresas
    const [personas, setPersonas] = useState<PersonasType[]>([]);
    const [empresas, setEmpresas] = useState<EnterpriseType[]>([]);

    //Busco el cliente a modificar
    const [cliente, setCliente] = useState<ClientesType>();

    //El cliente que se envia para la creacion
    const [clienteDTO, setClienteDTO] = useState({ persona_id: null, empresa_id: null });

    const goBack = () => {
        navigate(-1);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (value === '') {
            setClienteDTO({
                ...clienteDTO,
                [name]: null,
            });
            console.log(clienteDTO)
            return;
        }

        setClienteDTO({
            ...clienteDTO,
            [name]: value,
        });
        console.log(clienteDTO)
    };

    useEffect(() => {
        //fetch personas
        fetchPersonas(0).then((resp) => {
            setPersonas(resp);
            console.log(resp)
            setPersonasLoading(false);
            console.log(personasLoading)
        });
        //fetch empresas
        fetchEnterprises(setEmpresasLoading).then((resp) => {
            setEmpresas(resp);
            console.log(resp)
            setEmpresasLoading(false);
            console.log(empresasLoading)

        });
        //fetch cliente a modificar (tengo un error de typescript con el idToModify)
        fetchClientes(idToModify).then((resp) => {
            setCliente(resp);
            console.log(resp)
            setClienteDTO({
                persona_id: resp.persona.id,
                empresa_id: resp.empresa?.id,
            })
            setClientesLoading(false);
        });
        console.log(idToModify)
        console.log("el dto es esto ", clienteDTO)



    }, []);

    const handleSubmit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        try {
            await updateClient(clienteDTO, idToModify);
            console.log(clienteDTO);
            goBack();
        } catch (error) {
            Swal.fire(
                "Error!",
                "No se ha podido modificar el cliente.",
                "error"
            );
        }
    };

    return (
        <Container className=" flex items-center justify-center h-screen mt-[-60px]">
            <div className="w-1/3">
                <p>Editando cliente {idToModify}</p>
                <p>Tipo original: {cliente?.empresa === null ? "Persona" : "Empresa"}</p>
                <form className={clienteDTO.empresa_id ? "w-full rounded-lg p-3 bg-green-200" : "w-full rounded-lg p-3 bg-blue-200"} onSubmit={handleSubmit}>


                    {
                        personasLoading || empresasLoading || clientesLoading ? <p>Cargando...</p>
                            :
                            <>
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Persona:</label>
                                
                                <select name="persona_id"
                                    id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    defaultValue={cliente?.persona.id}
                                    onChange={handleSelectChange}
                                >
                                    <option value={''}>---Seleccione Persona---</option>

                                    {
                                        personas.map((persona, index) => (
                                            <option key={index} value={persona.id}>ID: {persona.id} - {persona.nombre} {persona.apellido}</option>
                                        ))
                                    }

                                </select>

                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa:</label>
                                <select name="empresa_id"
                                    id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    defaultValue={cliente?.empresa?.id}
                                    onChange={handleSelectChange}
                                >
                                    <option value={''}>---Seleccione Empresa---</option>
                                    {
                                        empresas.map((empresa, index) => (
                                            <option key={index} value={empresa.id}>ID: {empresa.id} - {empresa.nombre}</option>
                                        ))
                                    }

                                </select>
                            </>
                    }


                    <button type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {
                            clienteDTO.empresa_id ? "GUARDAR COMO EMPRESA" : "GUARDAR COMO PERSONA"
                        }
                    </button>
                </form>
            </div>

        </Container>
    );
}
