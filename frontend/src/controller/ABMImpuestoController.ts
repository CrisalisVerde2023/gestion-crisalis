// @ts-nocheck
import { ImpuestosType } from "../components/types/taxType";
import { HTTPMethod, useFetch } from "../hooks/useFetch";

const URL_API_IMPUESTOS = "http://localhost:8080/api/impuestos";

let impuestos: ImpuestosType[] = [];

export async function createImpuesto(overrides: Partial<ImpuestosType> = {}) {
  try {
    await fetch(`${URL_API_IMPUESTOS}`, {
      method: "POST",
      body: JSON.stringify({
        nombre: overrides.nombre,
        porcentaje: overrides.porcentaje,
      }),
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al crear persona:", error);
    throw error;
  }
}

export async function modifyImpuesto(updatedData: Partial<ImpuestosType>) {
  try {
    await fetch(`${URL_API_IMPUESTOS}/${updatedData.id}`, {
      method: "POST",
      body: JSON.stringify({
        id: updatedData.id,
        nombre: updatedData.nombre,
        porcentaje: updatedData.porcentaje,
      }),
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al modificar usuario:", error);
    throw error;
  }
}

export const fetchImpuestos = async (id: number) => {
  try {
    return await (
      await fetch(`${URL_API_IMPUESTOS}${id > 0 ? `/${id}` : ""}`, {
        headers: {
          Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch (error) {
    console.error("Ocurrió un error al obtener personas:", error);
    throw error;
  }
};

export async function deleteImpuesto(id: number) {
  try {
    await fetch(`${URL_API_IMPUESTOS}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("userLogged")).token,
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      if (resp.status >= 400) throw "El servidor respondió con error";
    });
  } catch (error) {
    console.error("Ocurrió un error al cambiar estado de usuario:", error);
    throw error;
  }
}

export const useFetchImpuestos = (
  id?: number,
  shouldExecute: boolean = false
) => {
  const params = {}; // Define any parameters you might need
  return useFetch(
    {
      method: HTTPMethod.GET,
      url: `${URL_API_IMPUESTOS}${id && id >= 0 ? `/${id}` : ""}`,
      params: JSON.stringify(params),
    },
    shouldExecute
  );
};

export const useDeleteImpuesto = (id?: number, shouldExecute = false) => {
  return useFetch(
    {
      method: HTTPMethod.PATCH,
      url: `${URL_API_IMPUESTOS}/${id}`,
      params: {},
    },
    shouldExecute
  );
};