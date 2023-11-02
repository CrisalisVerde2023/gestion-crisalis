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

  