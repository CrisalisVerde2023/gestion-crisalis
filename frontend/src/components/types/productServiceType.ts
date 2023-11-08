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

  //Agrego un array para los impuestos
  idImpuestos: number[];
};

export const defaultProductServiceValues: ProductServiceType = {
  id: 0, // you can replace this with a logic to generate a unique id
  nombre: "",
  tipo: ProductOrService.Producto,
  costo: 0,
  soporte: null,
  
  cantidad: 1,
  garantia: null,

  idImpuestos: [],
};
