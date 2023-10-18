export type UserLogged = {
  id: number;
  email: string;
};

export type UserLoginContextType = {
  userLogged: UserLogged;
  setUserLogin: any;
};

export const defaultUserLogState = { id: -1, email: "" };

export const defaultContext: UserLoginContextType = {
  userLogged: defaultUserLogState,
  setUserLogin: () => {},
};
