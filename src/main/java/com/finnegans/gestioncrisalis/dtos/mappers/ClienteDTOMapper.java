package com.finnegans.gestioncrisalis.dtos.mappers;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.finnegans.gestioncrisalis.dtos.request.ClienteResponseDTO;
import com.finnegans.gestioncrisalis.models.Cliente;

public class ClienteDTOMapper {
    private Cliente cliente;
    private ClienteDTOMapper() {}

    //Creo el builder en un metodo estático que retorna una instancia de la clase,
    //luego se le aplican los metodos posteriores a ese retorno.
    public static ClienteDTOMapper builder(){
        return new ClienteDTOMapper();
    }

    //Seteo el cliente que me pasan por parametro
    public ClienteDTOMapper setCliente(Cliente cliente){
        this.cliente = cliente;
        return this;
    }

    //Creo el objeto ClienteResponseDTO con los datos del cliente que me pasaron por parametro
    public ClienteResponseDTO build(){
        if (cliente == null) throw new RuntimeException("Debe pasar la entidad Cliente");
        return new ClienteResponseDTO(cliente.getId(), cliente.getPersona(), cliente.getEmpresa(), cliente.isEliminado());
    }

}
