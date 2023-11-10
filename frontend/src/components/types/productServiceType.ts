export enum ProductOrService {
  Producto = "PRODUCTO",
  Servicio = "SERVICIO",
}

export type ProductServiceType = {
  id: number;
  nombre: string;
  tipo: ProductOrService;
  costo: number;

  soporte: number | null;
  cantidad: number;
  garantia: number | null;
  idImpuestos: number[];
  eliminado: boolean;
};

export const defaultProductServiceValues: ProductServiceType = {
  id: -1,
  nombre: "",
  tipo: ProductOrService.Producto,
  costo: 0,
  soporte: null,

  cantidad: 1,
  garantia: null,
  idImpuestos: [],
  eliminado: false,
};
