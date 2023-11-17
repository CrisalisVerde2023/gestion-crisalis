import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useCreateProds_Servs,
  useFetchProds_Servs,
  useModifyProds_Servs,
} from "../../controller/ABMProductController";
import {
  ProductOrService,
  ProductServiceType,
  defaultProductServiceValues,
} from "../types/productServiceType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { useFetchReturnType } from "../../hooks/useFetch";

import { Trash, Plus, Filter } from "react-bootstrap-icons";

import { ImpuestosType } from "../types/taxType";
import { useCrud } from "../../hooks/useCrud";
import VolverBtn from "../UI Elements/VolverBtn";

const HOST_API_IMPUESTOS: string = "http://localhost:8080/api/impuestos";

export default function AM_ProductService() {
  const {
    getAllData,
    estado: { json, loading },
  } = useCrud(HOST_API_IMPUESTOS);

  const { idProdServ } = useParams<{ idProdServ: string }>();
  const idToModify =
    idProdServ !== undefined
      ? idProdServ === "0"
        ? 0
        : parseInt(idProdServ)
      : undefined;
  const [isLoading, setIsLoading] = useState(false);
  //const [selectedImpuesto, setSelectedImpuesto] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);
  const [response, setResponse] = useState<useFetchReturnType | null>(null);
  let fetchedData: useFetchReturnType | null = null;
  // Initialize formData
  const [formData, setFormData] = useState<ProductServiceType>(
    defaultProductServiceValues
  );

  //Para listar los impuestos----------------------------------------------------------------------------------------------
  //const [shouldFetch, setShouldFetch] = useState(true);//Esto quedó de la segunda forma que se manejaban las peticiones http

  //let fetchImpuestos = useFetchImpuestos(undefined, shouldFetch);
  const [impuestos, setImpuestos] = useState<ImpuestosType[] | null>(null);
  const [impuestosFiltrados, setImpuestosFiltrados] = useState<ImpuestosType[] | null>(null)
  const [searchTerm, setSearchTerm] = useState("");

  //Le mando un useEffect que escuche los cambios de impuestos y me los guarde en un estado
  useEffect(() => {
    !loading && setImpuestos(json);
  }, [loading]);

  //Use Effect para el filtrado de impuestos
  useEffect(() => {
    const impuestosFiltrados = impuestos?.filter(impuesto =>
      impuesto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setImpuestosFiltrados(impuestosFiltrados || []);
  }, [searchTerm, impuestos]);

  const handleQuitarImpuesto = (item: number) => {
    setFormData({
      ...formData,
      idImpuestos: (formData.idImpuestos || []).filter((el) => el !== item), //Con este filter lo que hago es que me devuelva un array con todos los elementos que no sean el que le paso por parametro
    });
  };

  const handleAgregarImpuesto = (item: number) => {
    if (formData.idImpuestos.filter((el) => el === item).length === 0) {
      setFormData({
        ...formData,
        idImpuestos: [...(formData.idImpuestos || []), item],
      });
    }
  };

  //-----------------------------------------------------------------------------------------------------------------------------
  const goBack = () => {
    navigate(-1);
  };

  if (idToModify !== undefined) {
    //Aca se está fetcheando de la forma anterior, no la primera, la segunda. Hay que cambiarlo si pinta
    fetchedData = useFetchProds_Servs(idToModify, true);
    console.log("la data que viene en el fetch es: ", fetchedData);
  }

  useEffect(() => {
    if (fetchedData && !fetchedData.hasError && fetchedData.json) {
      //Esto debe ser una funcion que mapee los id de los impuestos y los meta al que cambia
      const idDeImpuestos = (fetchedData.json.impuestos || [])
        .map((impuesto: ImpuestosType) => impuesto.id)
        .filter((id: number) => id !== undefined);

      setFormData({
        ...fetchedData.json,
        idImpuestos: idDeImpuestos,
        password: "",
      }); //No entiendo de donde sale ese password, debe haber quedado default en el hook pero hay que volarlo
    }
  }, [fetchedData]);

  useEffect(() => {
    if (response) {
      if (!response.loading && !response.hasError && response.json) {
        console.log("here");
      } else if (!response.loading && response.hasError) {
        // logic for handling errors
      }
    }
  }, [response]);

  function isFormComplete(): boolean {
    if (location.pathname.includes("/AMProductos")) {
      return formData.nombre.length > 0 && formData.costo >= 0;
    } else if (location.pathname.includes("/AMServicios")) {
      // Explicitly allow formData.soporte to be 0
      return formData.nombre.length > 0;
    } else {
      return false; // Or some other default logic
    }
  }

  const errorsForm = () => {
    const errors = [];
    if (formData.nombre.length === 0) {
      errors.push("El nombre es obligatorio");
    }
    if (formData.tipo === ProductOrService.Producto && formData.costo == null) {
      errors.push("No olvides ingresar el precio");
    }
    // Allow formData.soporte to be 0 but not null or undefined

    return errors;
  };

  const createResponse = useCreateProds_Servs(formData, shouldCreate);
  const modifyResponse = useModifyProds_Servs(formData, shouldModify);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tipo: location.pathname.includes("/AMProductos")
        ? ProductOrService.Producto
        : ProductOrService.Servicio,
    }));
  }, [location]);

  const handleSubmit = () => {
    const errors = errorsForm();
    const complete = isFormComplete();

    if (errors.length === 0 && complete) {
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
        Swal.fire(
          "Perfecto!",
          "Producto/Servicio creado correctamente",
          "success"
        );
        goBack();
      } else if (!createResponse.loading && createResponse.hasError) {
        if (createResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al crear Producto/Servicio", "warning");
        }
      }
    }
    if (modifyResponse && shouldModify) {
      setShouldModify(false);
      console.log(modifyResponse);
      if (!modifyResponse.loading && !modifyResponse.hasError) {
        Swal.fire(
          "Perfecto!",
          "Producto/Servicio modificado correctamente",
          "success"
        );
        goBack();
      } else if (!modifyResponse.loading && modifyResponse.hasError) {
        if (modifyResponse.statusCode >= 400) {
          Swal.fire(
            "Atención!",
            "Error al modificar Producto/Servicio",
            "warning"
          );
        }
      }
    }
  }, [createResponse, modifyResponse]);

  return (
    <>
      <section
        className={
          idToModify !== undefined && idToModify !== null
            ? "bg-atlantis-25"
            : "bg-denim-25"
        }
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen mt-[-56px] lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {idToModify === undefined || idToModify === null
                      ? "Alta"
                      : "Modificación"}{" "}
                    de{" "}
                    {location.pathname.includes("/AMProductos")
                      ? "productos"
                      : location.pathname.includes("/AMServicios")
                        ? "servicios"
                        : null}
                  </h1>
                </div>
                {isLoading ? (
                  <LoadingComponent />
                ) : (
                  <>
                    {idToModify !== undefined && idToModify !== null && (
                      <div>
                        <h3>ID: {formData.id}</h3>
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Nombre de producto"
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        value={formData.nombre}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="costo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Costo
                      </label>
                      <input
                        type="number"
                        name="costo"
                        id="costo"
                        min={0}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="$"
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setFormData({ ...formData, costo: value });
                        }}
                        value={formData.costo}
                        onFocus={(e) => e.target.select()}
                      />
                    </div>
                    {location.pathname.includes("/AMServicios") && (
                      <div>
                        <label
                          htmlFor="mantenimiento"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Mantenimiento
                        </label>
                        <input
                          type="number"
                          name="mantenimiento"
                          id="mantenimiento"
                          min={0}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="$"
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setFormData({ ...formData, soporte: value });
                          }}
                          value={
                            formData.soporte !== null &&
                              formData.soporte !== undefined
                              ? Number(formData.soporte)
                              : ""
                          }
                          onFocus={(e) => e.target.select()}
                        />
                      </div>
                    )}
                  </>
                )}
                {errorsForm().length ? (
                  <div>
                    {errorsForm().map((el, idx) => (
                      <p key={idx.toString()} className="text-red-500 ">
                        {el}
                      </p>
                    ))}
                  </div>
                ) : null}

                <div className=" bg-denim-700 rounded-lg p-1 h-[150px] flex flex-col">
                  <span className="text-white font-bold">Impuestos asociados al {formData.tipo.toLocaleLowerCase()}</span>
                  
                  <div className="overflow-y-auto flex-1 h-full rounded-lg bg-white p-1">
                    {formData.idImpuestos?.length === 0 && (
                      <p>Este {formData.tipo} está libre de impuestos</p>
                    )}
                    <ul>
                      {formData.idImpuestos?.map((idImpuesto) => (
                        <div
                          className="bg-denim-50 min-h-[35px] rounded-xl mb-1 flex justify-between items-center px-2 cursor-pointer hover:bg-denim-200"
                          key={idImpuesto}
                          onClick={() => handleQuitarImpuesto(idImpuesto)}
                        >
                          <p>
                            {
                              impuestos?.find((obj) => obj.id === idImpuesto)
                                ?.nombre
                            }{" "}
                            {
                              impuestos?.find((obj) => obj.id === idImpuesto)
                                ?.porcentaje
                            }
                            %{" "}
                            {impuestos?.find((obj) => obj.id === idImpuesto)
                              ?.eliminado ? (
                              <span className="text-red-700 font-bold">
                                - Suspendido
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                          <Trash />
                        </div>
                      ))}

                    </ul>
                  </div>
                </div>

                <div className="w-full  bg-denim-700 p-1 rounded-lg">
                  <div className="flex justify-between mb-1 items-center">
                    <p className="font-bold text-sm ml-1 text-white">Agregar Impuestos</p>
                    <div className="flex items-center">
                      <span className="text-white">

                        <Filter />
                      </span>
                      <input
                        type="text"
                        placeholder="Filtrar Impuesto"
                        className="pl-2 ml-1 rounded-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="w-full h-[200px] overflow-y-auto bg-white p-1 rounded-lg ">
                    {impuestosFiltrados?.map((impuesto) => (
                      <div
                        key={impuesto.id}
                        className={`border-2 p-[3px] f hover:bg-atlantis-600 cursor-pointer rounded-xl ${impuesto.eliminado
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-atlantis-500"
                          } `}
                      >
                        <div
                          key={impuesto.id}
                          className="cursor-pointer pl-2 flex justify-between items-center"
                          onClick={() => handleAgregarImpuesto(impuesto.id)}
                        >
                          <p>
                            {impuesto.nombre} {impuesto.porcentaje}%
                          </p>{" "}
                          <span className="text-3xl">
                            <Plus />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    {...(!isFormComplete() || !!errorsForm().length
                      ? { disabled: true }
                      : {})}
                    onClick={handleSubmit}
                    className={`${!isFormComplete() || !!errorsForm().length
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-denim-400 hover:bg-denim-500"
                      } px-4 py-2 rounded-md text-white font-medium tracking-wide`}
                  >
                    {idToModify !== undefined && idToModify !== null
                      ? "Modificar"
                      : "Crear"}{" "}
                    {location.pathname.includes("/AMProductos")
                      ? "producto"
                      : location.pathname.includes("/AMServicios")
                        ? "servicio"
                        : ""}
                  </button>

                  <VolverBtn fnOnClick={goBack} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
