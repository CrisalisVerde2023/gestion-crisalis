import { EnterpriseType } from "./enterpriseType";
import { PersonasType } from "./personType";

export type ClientesType = {
    id: number;
    persona: PersonasType;
    empresa: EnterpriseType;
    eliminado: boolean;
};

export type ClienteDTO = {
    persona_id: string | null;
    empresa_id: string | null;
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
        start_date: "",
    },
};