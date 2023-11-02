import React, { useContext } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";

export default function SelectedClient() {
  const {pedido} = useContext(UserLoggedContext);

	return (!pedido.cliente || pedido.cliente.id < 0)
    	? <p  className="py-2 bg-denim-400 text-white"><strong>No hay Cliente seleccionado...</strong></p>
		:	
			<table className="min-w-full bg-white border-solid border-2 border-denim-400">
				<thead className="bg-denim-400 text-white ">
					<tr>
						<th className="py-2">Persona</th>
						{ pedido.cliente.empresa && <th className="py-2">Empresa</th>}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="py-2">{`${pedido.cliente.persona.nombre} ${pedido.cliente.persona.apellido}`}</td>
						{ pedido.cliente.empresa && <td className="py-2">{pedido.cliente.empresa.nombre}</td>}
					</tr>
				</tbody>
			</table>	
}