import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  countProductServicios,
  createProductService,
  defaultProductServiceValues,
  findProductServiceById,
  getNextID,
  modifyProductService,
  selectAll,
} from "../../controller/ABMProductController";
import {
  ProductOrService,
  ProductServiceType,
} from "../types/productServiceType";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";

export default function AM_ProductService() {
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

  const goBack = () => {
    navigate(-1);
  };

  // Initialize formData
  const [formData, setFormData] = useState<ProductServiceType>(
    idToModify !== undefined && idToModify !== null
      ? findProductServiceById(idToModify) || defaultProductServiceValues
      : defaultProductServiceValues
  );

  const ImpuestosOptions = ["IVA 10.5", "IVA 21", "Sin IVA"];

  const isFormComplete = () => {
    if (location.pathname.includes("/AMProductos")) {
      return formData.name && formData.cost;
    } else if (location.pathname.includes("/AMServicios")) {
      return formData.name && formData.support;
    } else {
      return false; // Or some other default logic
    }
  };

  const errorsForm = () => {
    const errors = [];
    if (!formData.name.length) {
      errors.push("El nombre es obligatorio");
    }
    if (formData.type === ProductOrService.Producto && !formData.cost) {
      errors.push("No olvides ingresar el precio");
    }
    if (formData.type === ProductOrService.Servicio && !formData.support) {
      errors.push("No olvides ingresar el costo de mantenimiento");
    }

    return errors;
  };

  useEffect(() => {
    // Assign a new ID if idToModify is undefined
    console.log(formData);
    console.log("ID is: " + idToModify);
    if (idToModify === undefined || idToModify === null) {
      setFormData({
        ...formData,
        id: getNextID(),
      });
    }
  }, []);

  useEffect(() => {
    // Set the type field based on the URL path
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: location.pathname.includes("/AMProductos")
        ? ProductOrService.Producto
        : ProductOrService.Servicio,
    }));
  }, [location]);

  const handleSubmit = () => {
    if (isFormComplete()) {
      Swal.fire({ text: "Espere por favor...", showConfirmButton: false });
      (idToModify !== undefined && idToModify !== null
        ? modifyProductService(idToModify, formData)
        : createProductService(formData)
      )
        .then(() => {
          Swal.fire({
            title: "Realizado!",
            text: `Se ha ${
              idToModify !== undefined && idToModify !== null
                ? "modificado"
                : "creado"
            } el producto/servicio.`,
            icon: "success",
            timer: 2000,
          }).then(() => goBack());
        })
        .catch((error) => {
          console.error("Error while saving data:", error);
          Swal.fire(
            "Error!",
            `No se ha podido ${
              idToModify !== undefined && idToModify !== null
                ? "modificar"
                : "crear"
            } el producto/servicio.`,
            "error"
          );
        });
    } else {
      Swal.fire(
        "Atención!",
        "Debe completar los campos requeridos correctamente.",
        "warning"
      );
    }
  };

  const handleSelectChange = (value: string) => {
    if (
      value === ProductOrService.Producto &&
      !location.pathname.includes("/AMProductos")
    ) {
      navigate(
        `/productosyservicios/AMProductos/${
          idToModify !== undefined && idToModify !== null ? formData.id : ""
        }`,
        {
          replace: true,
        }
      );
    } else if (
      value === ProductOrService.Servicio &&
      !location.pathname.includes("/AMServicios")
    ) {
      navigate(
        `/productosyservicios/AMServicios/${
          idToModify !== undefined && idToModify !== null ? formData.id : ""
        }`,
        {
          replace: true,
        }
      );
    }
  };

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
          <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-2 pr-2 pl-2">
            <div className="p-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo
              </label>
              <select
                name="productOrServiceType"
                id="productOrServiceType"
                className=" bg-denim-400 px-4 py-2 rounded-md text-white font-medium hover:bg-denim-500"
                aria-label=".form-select-lg"
                defaultValue={
                  location.pathname.includes("/AMProductos")
                    ? ProductOrService.Producto
                    : ProductOrService.Servicio
                }
                onChange={(e) => handleSelectChange(e.target.value.toString())}
              >
                <option
                  value={`${ProductOrService.Producto}`}
                  className="pr-6 pl-6"
                >
                  Producto
                </option>
                <option
                  value={`${ProductOrService.Servicio}`}
                  className="pr-6 pl-6"
                >
                  Servicio
                </option>
              </select>
            </div>
          </div>
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
                          setFormData({ ...formData, name: e.target.value })
                        }
                        value={formData.name}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="costo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {location.pathname.includes("/AMProductos")
                          ? "Costo"
                          : location.pathname.includes("/AMServicios")
                          ? "Mantenimiento"
                          : "Precio Base"}
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
                          if (formData.type === ProductOrService.Producto) {
                            setFormData({ ...formData, cost: value });
                          } else {
                            setFormData({ ...formData, support: value });
                          }
                        }}
                        value={
                          formData.type === ProductOrService.Producto
                            ? formData.cost
                            : formData.support
                        }
                        onFocus={(e) => e.target.select()}
                      />
                    </div>
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
                <div className="flex items-center justify-between">
                  <button
                    {...(!isFormComplete() || !!errorsForm().length
                      ? { disabled: true }
                      : {})}
                    onClick={handleSubmit}
                    className={`${
                      !isFormComplete() || !!errorsForm().length
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
