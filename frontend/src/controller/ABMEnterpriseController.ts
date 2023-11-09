import { EnterpriseType } from "../components/types/enterpriseType";
import { HTTPMethod, useFetch } from "../hooks/useFetch";

const URL_API_EMPRESAS = "http://localhost:8080/api/empresas";

export const useFetchEmpresas = (
  id?: number,
  shouldExecute: boolean = false
) => {
  return useFetch(
    {
      method: HTTPMethod.GET,
      url: `${URL_API_EMPRESAS}${id && id >= 0 ? `/${id}` : ""}`,
      params: {},
    },
    shouldExecute
  );
};

export const useCreateEmpresa = (
  overrides: Partial<EnterpriseType> = {},
  shouldExecute = false
) => {
  const params = {
    nombre: overrides.nombre,
    cuit: overrides.cuit,
    start_date: overrides.start_date,
  };
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_EMPRESAS}`,
      params: params,
    },
    shouldExecute
  );
};

export const useModifyEmpresa = (
  updatedData: Partial<EnterpriseType>,
  shouldExecute = false
) => {
  const params = {
    nombre: updatedData.nombre,
    cuit: updatedData.cuit,
    start_date: updatedData.start_date,
  };
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_EMPRESAS}/${updatedData.id}`,
      params,
    },
    shouldExecute
  );
};

export const useDeleteEmpresa = (id?: number, shouldExecute = false) => {
  return useFetch(
    {
      method: HTTPMethod.PATCH,
      url: `${URL_API_EMPRESAS}/${id}`,
      params: {},
    },
    shouldExecute
  );
};
