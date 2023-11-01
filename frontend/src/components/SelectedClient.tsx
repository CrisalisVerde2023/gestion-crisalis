import React, { useContext } from "react";
import { UserLoggedContext } from "../contexts/UserLoggedContext";

export default function SelectedClient() {
  const {pedido} = useContext(UserLoggedContext);

	return (
			<table className="min-w-full bg-white border-solid border-2 border-denim-400">
				<tbody>
					<tr>
						<td className="py-2"><strong>Persona:</strong></td>
						{ pedido.cliente.empresa && <td className="py-2"><strong>Empresa:</strong></td>}
					</tr>
					<tr>
						<td className="py-2">{`${pedido.cliente.persona.nombre} ${pedido.cliente.persona.apellido}`}</td>
						{ pedido.cliente.empresa && <td className="py-2">{pedido.cliente.empresa.nombre}</td>}
					</tr>
				</tbody>
			</table>
	);
}