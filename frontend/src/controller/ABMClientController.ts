import {
  defaultClienteDTO,
  defaultClienteType,
} from "./../components/types/clientType";
import {
  HTTPMethod,
  defaultUseFetchValues,
  useFetch,
  useFetchReturnType,
} from "./../hooks/useFetch";
import { ClienteDTO, ClientesType } from "../components/types/clientType";

const URL_API_CLIENTES = "http://localhost:8080/api/clientes";

export const useFetchClientes = (
  id?: number,
  shouldExecute: boolean = false
) => {
  let resultDTO: any;
  let result = useFetch(
    {
      method: HTTPMethod.GET,
      url: `${URL_API_CLIENTES}${id && id >= 0 ? `/${id}` : ""}`,
      params: {},
    },
    shouldExecute
  );
  if (!id) {
    resultDTO = result;
    let json: any[] = [];
    if (Array.isArray(result.json)) {
      json = result.json.map((item) => ({
        id: item.id, // Keeping the main id at the top level of each object
        persona_id: item.persona ? item.persona.id : null, // Use logical AND to avoid null reference
        empresa_id: item.empresa ? item.empresa.id : null, // Use logical AND to avoid null reference
        eliminado: item.eliminado,
      }));
    } else {
      // Handle the case where result.json is not an array or is null
      json = []; // or any other appropriate default/fallback value
    }
    resultDTO.json = json;
    return resultDTO;
  } else {
    return result;
  }
};

export const useCreateCliente = (
  overrides: Partial<ClienteDTO> = {},
  shouldExecute = false
) => {
  let params: ClienteDTO = {
    persona_id: overrides.persona_id,
    empresa_id: overrides.empresa_id,
  };
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_CLIENTES}`,
      params: params,
    },
    shouldExecute
  );
};

export const useDeleteCliente = (id?: number, shouldExecute = false) => {
  return useFetch(
    {
      method: HTTPMethod.PATCH,
      url: `${URL_API_CLIENTES}/${id}`,
      params: {},
    },
    shouldExecute
  );
};

export const useModifyCliente = (
  updateClientId: number | undefined,
  updatedData: Partial<ClienteDTO>,
  shouldExecute = false
) => {
  let params: ClienteDTO = {
    persona_id: updatedData.persona_id,
    empresa_id: updatedData.empresa_id,
  };
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_CLIENTES}/${updateClientId}`,
      params: params,
    },
    shouldExecute
  );
};
