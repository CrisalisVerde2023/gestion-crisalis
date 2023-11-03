export type ImpuestosType = {
    id: number ;
    nombre: string;
    porcentaje: number; //Checkear esto
    eliminado: boolean;
  };
  
  export const defaultImpuestosType = {
    id: 0,
    nombre: "",
    porcentaje: 0.0,
    eliminado: false,
  };