import {
  ProductOrService,
  ProductServiceType,
} from "../components/types/productServiceType";
import { useFetch, HTTPMethod, useFetchReturnType } from "./../hooks/useFetch";

const URL_API_PRODS_SERVS = "http://localhost:8080/api/prods_servs";

export const useFetchProds_Servs = (
  id?: number,
  shouldExecute: boolean = false
) => {
  return useFetch(
    {
      method: HTTPMethod.GET,
      url: `${URL_API_PRODS_SERVS}${id && id >= 0 ? `/${id}` : ""}`,
      params: {},
    },
    shouldExecute
  );
};

export const useCreateProds_Servs = (
  overrides: Partial<ProductServiceType> = {},
  shouldExecute = false
) => {
  const params: Partial<ProductServiceType> = {};
  (Object.keys(overrides) as (keyof ProductServiceType)[]).forEach((key) => {
    const value = overrides[key];
    if (value !== undefined && value !== null) {
      (params as any)[key] = value;
    }
  });
  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_PRODS_SERVS}`,
      params,
    },
    shouldExecute
  );
};

export const useModifyProds_Servs = (
  updatedData: Partial<ProductServiceType>,
  shouldExecute = false
) => {
  const params: Partial<ProductServiceType> = {};
  (Object.keys(updatedData) as (keyof ProductServiceType)[]).forEach((key) => {
    const value = updatedData[key];
    if (value !== undefined && value !== null) {
      (params as any)[key] = value;
    }
  });

  return useFetch(
    {
      method: HTTPMethod.POST,
      url: `${URL_API_PRODS_SERVS}/${updatedData.id}`,
      params,
    },
    shouldExecute
  );
};

export const useDeleteProds_Servs = (id?: number, shouldExecute = false) => {
  return useFetch(
    {
      method: HTTPMethod.PATCH,
      url: `${URL_API_PRODS_SERVS}/${id}`,
      params: {},
    },
    shouldExecute
  );
};
