import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import {
    PencilFill,
    XCircleFill,
    CheckCircleFill,
    PersonWorkspace,
    Building,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";

//Fetch clientes
import { createClient, fetchClientes, deleteClient } from "../../controller/ABMClientController";

//Fetch personas
import { fetchPersonas } from "../../controller/ABMPersonController";
//Fetch empresas
import { fetchEnterprises } from "../../controller/ABMEnterpriseController";

import { ClientesType } from "../types/clientType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import { PersonasType } from "../types/personType";
import { EnterpriseType } from "../types/enterpriseType";

export default function LB_Clientes() {
    const [data, setData] = useState<ClientesType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    //Pido personas y empresas
    const [personas, setPersonas] = useState<PersonasType[]>([]);
    const [empresas, setEmpresas] = useState<EnterpriseType[]>([]);

    //El cliente que se envia para la creacion
    const [clienteDTO, setClienteDTO] = useState({ persona_id: null, empresa_id: null });

    const { userLogged } = useContext(UserLoggedContext);

    const fetchData = async () => {
        try {
            return await fetchClientes(0);
        } catch (error) {
            Swal.fire("Error!", "No se han podido obtener datos.", "error");
        }
    };

    //Fc para manejar el cambio de los select
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (value === '') {
            setClienteDTO({
                ...clienteDTO,
                [name]: null,
            });
            return;
        }

        setClienteDTO({
            ...clienteDTO,
            [name]: value,
        });
        console.log(clienteDTO)
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("se envio esto:", clienteDTO)
        await createClient(clienteDTO).catch(() => {
            Swal.fire(
                "Error!",
                "No se pudo crear el cliente.",
                "error"
            );
        });
        setIsLoading(true);
        fetchData().then((resp) => {
            console.log(resp)
            setData(resp);
            setIsLoading(false);
        });
    }

    const onConfirm = (row: ClientesType) => {
        if (row)
            deleteClient(row.id)
                .then(() => {
                    fetchData().then((resp) => {
                        setData(resp);

                    });
                })
                .catch(() => {
                    Swal.fire("Error!", "No se ha podido cambiar el estado.", "error");
                });
    };


    useEffect(() => {
        setIsLoading(true);
        fetchData().then((resp) => {
            console.log(resp)
            setData(resp);
            setIsLoading(false);
        });
        //fetch personas
        fetchPersonas(0).then((resp) => {
            setPersonas(resp);
            console.log(resp)
        });
        //fetch empresas
        fetchEnterprises(setIsLoading).then((resp) => {
            setEmpresas(resp);
            console.log(resp)
        });
    }, [location]);



    const actionButtons = (row: ClientesType) => (
        <div className="d-flex flex-row align-items-center">
            <Button
                className="actionButton"
                onClick={() => onConfirm(row)}
            >
                {row.eliminado ? <CheckCircleFill /> : <XCircleFill />}
            </Button>
            <Link className="actionButton ml-8" to={`/clientes/AMClientes/${row.id}`}>
                <PencilFill />
            </Link>
        </div>
    );

    return (
        <>
            <Container className="relative">
                {/* <div className="bg-black bg-opacity-50 w-full h-full absolute left-[0px] top-[-0px] flex justify-center items-center">
                <form className={`w-1/3 ${clienteDTO.empresa_id === null ? 'bg-blue-200' : 'bg-green-200'}`} onSubmit={handleSubmit}>
                        <div></div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Persona:</label>
                        <select name="persona_id"
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

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

                            onChange={handleSelectChange}
                        >
                            <option value={''}>---Seleccione Empresa---</option>
                            {
                                empresas.map((empresa, index) => (
                                    <option key={index} value={empresa.id}>ID: {empresa.id} - {empresa.nombre}</option>
                                ))
                            }
                        </select>
                        <button type="submit" className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            {
                                clienteDTO.empresa_id === null ? 'CREAR CLIENTE PERSONA' : 'CREAR CLIENTE EMPRESA'
                            }
                        </button>
                    </form>
                </div> */}
                <Row className="d-flex flex-row justify-content-center align-items-center mt-4 mb-4">

                    <form className={`w-1/3 rounded-lg p-2 ${clienteDTO.empresa_id === null ? 'bg-blue-200' : 'bg-green-200'}`} onSubmit={handleSubmit}>


                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Persona:</label>
                        <div className="flex items-center">
                            <select name="persona_id"
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"

                                onChange={handleSelectChange}
                            >
                                <option value={''}>---Seleccione Persona---</option>
                                {
                                    personas.map((persona, index) => (
                                        <option key={index} value={persona.id}>ID: {persona.id} - {persona.nombre} {persona.apellido}</option>
                                    ))
                                }
                            </select>

                            <div onClick={() => console.log("agregar persona")} className="flex items-center ml-1 cursor-pointer">
                                <PersonWorkspace /> +
                            </div>
                        </div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa:</label>
                        <div className="flex items-center">
                            <select name="empresa_id"
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                onChange={handleSelectChange}
                            >
                                <option value={''}>---Seleccione Empresa---</option>
                                {
                                    empresas.map((empresa, index) => (
                                        <option key={index} value={empresa.id}>ID: {empresa.id} - {empresa.nombre}</option>
                                    ))
                                }
                            </select>
                            <div onClick={() => console.log("agregar empresa")} className="flex items-center ml-1 cursor-pointer">
                                <Building /> +
                            </div>
                        </div>
                        <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            {
                                clienteDTO.empresa_id === null ? 'CREAR CLIENTE PERSONA' : 'CREAR CLIENTE EMPRESA'
                            }
                        </button>
                    </form>


                </Row>
                <Row
                    className="d-flex flex-row justify-content-center align-items-center "
                    style={{ marginBottom: "15px" }}
                >
                    <Col xs="auto" className=" w-full flex justify-start">
                        <div className="flex items-center">
                            <input type="checkbox" />
                            <PersonWorkspace className="text-blue-400 ml-1 text-xl" />
                        </div>
                        <div className="flex items-center mx-2">
                            <input type="checkbox" />
                            <Building className="text-green-400 ml-1 text-xl" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar Persona"
                            className="inputSearch mr-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Buscar Empresa"
                            className="inputSearch"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                    </Col>

                </Row>
                {/* Data Table */}
                <Row>
                    {isLoading ? (
                        <Col>
                            <LoadingComponent />
                        </Col>
                    ) : (
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Tipo de Cliente</th>
                                        <th>Persona</th>
                                        <th>Empresa</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.sort((a: ClientesType, b: ClientesType) =>
                                        a.id < b.id
                                            ? -1
                                            : 1
                                    )
                                        .map((row, index) => (
                                            <tr key={index}>
                                                <td>{row.id}</td>
                                                {
                                                    row.empresa ?
                                                        <td className="flex items-center justify-center "><Building className="text-green-400" /> </td>
                                                        :
                                                        <td className="flex items-center justify-center "><PersonWorkspace className="text-blue-400" /> </td>
                                                }

                                                <td>{row.persona.nombre} {row.persona.apellido}</td>
                                                <td>{row.empresa ? row.empresa.nombre : "-"}</td>
                                                <td>{row.eliminado ? <p className="text-red-600 font-bold">Inactivo</p> : <p className="text-green-600 font-bold">Activo</p>}</td>
                                                <td className="flex justify-around">
                                                    {actionButtons(row)}
                                                    <button type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-0.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        Crear Pedido
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}
