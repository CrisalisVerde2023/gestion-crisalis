import { EnterpriseType } from "./enterpriseType";
import { PersonasType } from "./personType";

export type ClientesType = {
    id: number;
    persona: PersonasType;
    empresa: EnterpriseType;
    eliminado: boolean;
  };
  