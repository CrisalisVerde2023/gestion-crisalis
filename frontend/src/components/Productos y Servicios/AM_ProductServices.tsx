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

import { ImpuestosType } from "../types/taxType";
import { useCrud } from "../../hooks/useCrud";

export default function AM_ProductService() {
  const { getAllData, estado:{json, loading} } = useCrud({url: "http://localhost:8080/api/impuestos"});
  

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
  const [shouldFetch, setShouldFetch] = useState(true);
  //let fetchImpuestos = useFetchImpuestos(undefined, shouldFetch);
  const [impuestos, setImpuestos] = useState<ImpuestosType[] | null>(null);

  //Le mando un useEffect que escuche los cambios de impuestos y me los guarde en un estado
  useEffect(() => {
    !loading && 
    setImpuestos(json);
  }, [loading]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, item: number) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setFormData({ ...formData, idImpuestos: [...formData.idImpuestos, item] });
    } else {
      setFormData({
        ...formData,
        idImpuestos: formData.idImpuestos.filter((el) => el !== item),//Con este filter lo que hago es que me devuelva un array con todos los elementos que no sean el que le paso por parametro
      });
    }
  };

  //-----------------------------------------------------------------------------------------------------------------------------
  const goBack = () => {
    navigate(-1);
  };

  const ImpuestosOptions = ["IVA 10.5", "IVA 21", "Sin IVA"];

  if (idToModify !== undefined) {
    fetchedData = useFetchProds_Servs(idToModify, true);
  }

  useEffect(() => {
    if (fetchedData && !fetchedData.hasError && fetchedData.json) {
      setFormData({ ...fetchedData.json, password: "" });
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
      return (
        formData.nombre.length > 0 &&
        formData.soporte !== null &&
        formData.soporte !== undefined
      );
    } else {
      return false; // Or some other default logic
    }
  }

  const errorsForm = () => {
    const errors = [];
    if (!formData.nombre.length) {
      errors.push("El nombre es obligatorio");
    }
    if (formData.tipo === ProductOrService.Producto && formData.costo == null) {
      errors.push("No olvides ingresar el precio");
    }
    // Allow formData.soporte to be 0 but not null or undefined
    if (
      formData.tipo === ProductOrService.Servicio &&
      formData.soporte == null
    ) {
      errors.push("No olvides ingresar el costo de mantenimiento");
    }

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
                <div className="w-full  bg-slate-300 p-1 rounded-lg">
                  <div className="flex justify-between mb-1 items-center">
                    <p className="font-bold text-sm ml-1">Agregar Impuestos</p>
                    <input type="text" placeholder="Filtrar Impuesto" className="pl-2 rounded-sm" />
                  </div>

                  <div className="w-full min-h-[80px] bg-atlantis-100 flex justify-start items-start flex-wrap p-1 rounded-lg">
                    {
                      impuestos?.map((impuesto) => (
                        <div key={impuesto.id} className="border-2 mr-4 p-[3px] rounded-xl bg-atlantis-500">
                          <label key={impuesto.id} className="cursor-pointer">
                            <input
                              type="checkbox"
                              className="mr-1"
                              onChange={(e) => handleCheckboxChange(e, impuesto.id)}
                            />
                            {impuesto.nombre} {impuesto.porcentaje}%
                          </label>
                        </div>
                      ))
                    }
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

                  <button
                    className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
                    onClick={goBack}
                  >
                    Volver
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
