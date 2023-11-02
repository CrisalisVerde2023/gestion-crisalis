import { ImpuestosType } from "../components/types/taxType";
import { useFetch, HTTPMethod, useFetchReturnType } from "./../hooks/useFetch";

const URL_API_IMPUESTOS = "http://localhost:8080/api/impuestos";

let impuestos: ImpuestosType[] = [];

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

export const useCreateImpuesto = (
  overrides: Partial<ImpuestosType> = {},
  shouldExecute = false
) => {
  const params = {
    nombre: overrides.nombre,
    password: overrides.porcentaje,
  };

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_IMPUESTOS}`,
      params,
    },
    shouldExecute
  );
};

export const useModifyImpuesto = (
  updatedData: Partial<ImpuestosType>,
  shouldExecute = false
) => {
  const params = {
    id: updatedData.id,
    nombre: updatedData.nombre,
    porcentaje: updatedData.porcentaje,
  };

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_IMPUESTOS}/${updatedData.id}`,
      params,
    },
    shouldExecute
  );
};

() => {};

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

export function findImpuestoById(id: number): ImpuestosType | null {
  const foundItem = impuestos.find((item) => item.id === id);
  return foundItem ? foundItem : null;
}

export function getNextID() {
  const maxID = Math.max(...impuestos.map((impuesto) => impuesto.id));
  return maxID + 1;
}