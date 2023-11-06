import React, { useReducer } from "react";
import { ACTION_TYPES, tableInitial, tableReducer } from "./tableReducer";

export const useTableReducer = () => {
  const [table, dispatch] = useReducer(tableReducer, tableInitial);

  const getData = (params) =>
    dispatch({
      type: ACTION_TYPES.GET,
      payload: params,
    });

  const removeData = (params) =>
    dispatch({
      type: ACTION_TYPES.PATCH,
      payload: params,
    });

  /* const clearCart = () => dispatch({ type: "CLEAR_CART" }); */

  return { table, getData, removeData };
};
