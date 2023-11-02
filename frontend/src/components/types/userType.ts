export type UsuariosType = {
  id: number;
  usuario: string;
  password: string;
  eliminado: boolean;
};

export const defaultUsuariosType = {
  id: 0,
  usuario: "",
  password: "",
  eliminado: false,
};
