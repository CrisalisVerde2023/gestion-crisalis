import React from "react";
import LB_Impuestos from "./LB_Impuestos";
import { TableImpuestos } from "./TableImpuestos";

export default function ABMImpuestos() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        {/* <LB_Impuestos /> */}
        <TableImpuestos />
      </div>
    </div>
  );
}
