import { EnterpriseType, defaultEnterpriseType } from "./enterpriseType";
import { PersonasType, defaultPersonasType } from "./personType";

export type ClientesType = {
  id: number;
  persona: PersonasType;
  empresa: EnterpriseType | null;
  eliminado: boolean;
};

export type ClienteResponseDTO = {
  id: number;
  persona_id: number;
  empresa_id: number | null;
  eliminado: boolean;
};

export type ClienteDTO = {
  persona_id: string | null | undefined;
  empresa_id: string | null | undefined;
};

export const defaultClienteDTO = {
  persona_id: null,
  empresa_id: null,
};

export const defaultClienteType = {
  //Inicia con este valor por defecto
  id: -1,
  persona: defaultPersonasType,
  empresa: null,
  eliminado: false,
};
