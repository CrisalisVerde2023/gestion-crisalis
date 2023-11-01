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
    firstName: "",
    lastName: "",
    dni: "",
  },
  empresa: {
    id: -1,
    name: "",
    cuit: "",
    startDate: "",
  },
};

export const defaultTestClienteType = {
  //! SOLO PARA TESTEO, BORRAR ESTO
  id: 99,
  persona: {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
    dni: "12345678",
  },
  empresa: {
    id: 1,
    nombre: "Equipo Verde",
    cuit: "20123456789",
    startDate: "2023-10-26T15:30:00",
  },
};