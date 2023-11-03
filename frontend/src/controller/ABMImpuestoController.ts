import { ImpuestosType } from "../components/types/taxType";
import { HTTPMethod, useFetch } from "../hooks/useFetch";

const URL_API_IMPUESTOS = "http://localhost:8080/api/impuestos";

export const useFetchImpuestos = (
  id?: number,
  shouldExecute: boolean = false
) => {
  return useFetch(
    {
      method: HTTPMethod.GET,
      url: `${URL_API_IMPUESTOS}${id && id >= 0 ? `/${id}` : ""}`,
      params: {},
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
    porcentaje: overrides.porcentaje,
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

export const useModifyImpuestos = (
  updatedData: Partial<ImpuestosType>,
  shouldExecute = false
) => {
  const params = {
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
