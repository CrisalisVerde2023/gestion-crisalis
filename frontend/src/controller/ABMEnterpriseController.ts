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
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_EMPRESAS}`,
      params: overrides,
    },
    shouldExecute
  );
};

export const useModifyEmpresa = (
  updatedData: Partial<EnterpriseType>,
  shouldExecute = false
) => {
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_EMPRESAS}/${updatedData.id}`,
      params: updatedData,
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
