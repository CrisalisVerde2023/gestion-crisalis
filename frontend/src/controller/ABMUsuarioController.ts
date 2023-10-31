import { UsuariosType } from "../components/types/userType";
import { useFetch, HTTPMethod, useFetchReturnType } from "./../hooks/useFetch";

const URL_API_USUARIOS = "http://localhost:8080/api/usuarios";

export const useFetchUsuarios = (id?: number) => {
  const params = {}; // Define any parameters you might need
  return useFetch({
    method: HTTPMethod.GET,
    url: `${URL_API_USUARIOS}${id && id >= 0 ? `/${id}` : ""}`,
    params: JSON.stringify(params),
  });
};

export const useCreateUsuario = (
  overrides: Partial<UsuariosType> = {},
  shouldExecute = false
) => {
  const params = {
    usuario: overrides.usuario,
    password: overrides.password,
  };

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_USUARIOS}`,
      params,
    },
    shouldExecute
  );
};

export const useModifyUsuario = (
  updatedData: Partial<UsuariosType>,
  shouldExecute = false
) => {
  const params = {
    usuario: updatedData.usuario,
    password: updatedData.password,
  };

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_USUARIOS}/${updatedData.id}`,
      params,
    },
    shouldExecute
  );
};

export const useDeleteUsuario = (id: number) => {
  return useFetch({
    method: HTTPMethod.PATCH,
    url: `${URL_API_USUARIOS}/${id}`,
    params: "",
  });
};
