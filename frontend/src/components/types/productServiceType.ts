import { ImpuestosType } from "./taxType";

export enum ProductOrService {
  Producto = "PRODUCTO",
  Servicio = "SERVICIO",
}

export type ProductServiceType = {
  id: number;
  nombre: string;
  tipo: ProductOrService;
  costo: number;
  impuestos: ImpuestosType[];
  soporte: number | null;
  cantidad: number;
  garantia: number | null;
  idImpuestos: number[];
  eliminado: boolean;

  descuento: number | null;
  garantiaCosto: number | null;
  impuesto: number;
};


export const defaultProductServiceValues: ProductServiceType = {
  id: -1,
  nombre: "",
  tipo: ProductOrService.Producto,
  costo: 0,
  soporte: null,
  impuestos: [],
  cantidad: 1,
  garantia: null,
  idImpuestos: [],
  eliminado: false,

  descuento: null,
  garantiaCosto: null,
  impuesto: 0
};
