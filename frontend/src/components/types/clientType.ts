import { EnterpriseType } from "./enterpriseType";
import { PersonasType } from "./personType";

export type ClienteType = {
  id: number;
  persona: PersonasType;
  empresa: EnterpriseType;
};

export const defaultClienteType = {
  //Inicia con este valor por defecto
  id: -1,
  persona: {
    id: -1,
    nombre: "",
    apellido: "",
    dni: "",
  },
  empresa: {
    id: -1,
    nombre: "",
    cuit: "",
    startDate: "",
  },
};
