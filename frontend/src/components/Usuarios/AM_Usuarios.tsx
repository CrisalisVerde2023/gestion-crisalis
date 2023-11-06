import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateUsuario,
  useFetchUsuarios,
  useModifyUsuario,
} from "../../controller/ABMUsuarioController";
import { UsuariosType, defaultUsuariosType } from "../types/userType";
import { UserLoggedContext } from "../../contexts/UserLoggedContext";
import LoadingComponent from "../LoadingComponent";
import Swal from "sweetalert2";
import { useFetchReturnType } from "../../hooks/useFetch";

export default function AM_Usuario() {
  const { idUsuario } = useParams<{ idUsuario: string }>();
  const idToModify =
    idUsuario !== undefined
      ? idUsuario === "0"
        ? 0
        : parseInt(idUsuario)
      : undefined;

  const [shouldCreate, setShouldCreate] = useState(false);
  const [shouldModify, setShouldModify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UsuariosType>(defaultUsuariosType);
  const [oldUsuario, setOldUsuario] = useState("");
  const [response, setResponse] = useState<useFetchReturnType | null>(null);
  let fetchedData: useFetchReturnType | null = null;

  if (idToModify !== undefined) {
    fetchedData = useFetchUsuarios(idToModify, true);
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

  const goBack = () => {
    navigate(-1);
  };

  function isFormComplete(): boolean {
    if (idToModify === undefined || idToModify === null) {
      return formData.usuario.length > 0 && formData.password.length > 0;
    } else {
      return (
        oldUsuario !== formData.usuario &&
        Boolean(formData.password && formData.password.length > 0)
      );
    }
  }

  const errorsForm = () => {
    const errors = [];

    if (!formData.usuario.length) errors.push("El usuario es obligatorio");
    if (!/\S+@\S+\.\S+/.test(formData.usuario))
      errors.push("El usuario debe ser un email válido");

    if (!idToModify || (idToModify && formData.password.length)) {
      if (!formData.password.length)
        errors.push("No olvides ingresar la contraseña");
      if (formData.password.length < 4 || formData.password.length > 15)
        errors.push("La contraseña debe contener entre 4 y 15 caracteres");
    }

    return errors;
  };

  const createResponse = useCreateUsuario(formData, shouldCreate);
  const modifyResponse = useModifyUsuario(formData, shouldModify);

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
        Swal.fire("Perfecto!", "Usuario creado correctamente", "success");
        goBack();
      } else if (!createResponse.loading && createResponse.hasError) {
        if (createResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al crear usuario", "warning");
        }
      }
    }
    if (modifyResponse && shouldModify) {
      setShouldModify(false);
      console.log(modifyResponse);
      if (!modifyResponse.loading && !modifyResponse.hasError) {
        Swal.fire("Perfecto!", "Usuario modificado correctamente", "success");
        goBack();
      } else if (!modifyResponse.loading && modifyResponse.hasError) {
        if (modifyResponse.statusCode >= 400) {
          Swal.fire("Atención!", "Error al modificar usuario", "warning");
        }
      }
    }
  }, [createResponse, modifyResponse]);
  return (
    <section className={idToModify ? "bg-atlantis-25" : "bg-denim-25"}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen mt-[-56px] lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="space-y-4 md:space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {!idToModify ? "Alta" : "Modificación"} de usuario
                </h1>
              </div>
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <>
                  {idToModify && (
                    <div>
                      <h3>ID: {formData.id}</h3>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Usuario
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="usuario@dominio.com"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          usuario: e.target.value.trim(),
                        })
                      }
                      value={formData.usuario}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </div>
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
                          : "bg-denim hover:bg-denim-500"
                      } px-4 py-2 rounded-md text-white font-medium tracking-wide`}
                    >
                      {idToModify ? "Modificar" : "Crear"}
                    </button>

                    <button
                      className="bg-denim-400 px-4 py-2 rounded-md text-white font-medium tracking-wide hover:bg-denim-500"
                      onClick={goBack}
                    >
                      Volver
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
