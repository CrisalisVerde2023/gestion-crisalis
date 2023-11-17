import { HTTPMethod, useFetch } from "../hooks/useFetch";
import { PersonasType } from "./../components/types/personType";

const URL_API_PERSONAS = "http://localhost:8080/api/personas";

export const useFetchPersonas = (
  id?: number,
  shouldExecute: boolean = false
) => {
  return useFetch(
    {
      method: HTTPMethod.GET,
      url: `${URL_API_PERSONAS}${id && id >= 0 ? `/${id}` : ""}`,
      params: {},
    },
    shouldExecute
  );
};

export const useCreatePersonas = (
  overrides: Partial<PersonasType> = {},
  shouldExecute = false
) => {
  const params = {
    id: overrides.id,
    nombre: overrides.nombre,
    apellido: overrides.apellido,
    dni: Number(overrides.dni),
    eliminado: overrides.eliminado,
  };

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_PERSONAS}`,
      params: params,
    },
    shouldExecute
  );
};

export const useModifyPersonas = (
  updatedData: Partial<PersonasType>,
  shouldExecute = false
) => {
  const params = {
    id: updatedData.id,
    nombre: updatedData.nombre,
    apellido: updatedData.apellido,
    dni: Number(updatedData.dni),
    eliminado: updatedData.eliminado,
  };
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_PERSONAS}/${updatedData.id}`,
      params: params,
    },
    shouldExecute
  );
};

export const useDeletePersonas = (id?: number, shouldExecute = false) => {
  return useFetch(
    {
      method: HTTPMethod.PATCH,
      url: `${URL_API_PERSONAS}/${id}`,
      params: {},
    },
    shouldExecute
  );
};
