package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finnegans.gestioncrisalis.validations.UsuarioOnUpdate;
import com.finnegans.gestioncrisalis.validations.ValidUsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClienteDTO {
    @JsonProperty("nombre")
    private String nombreDTO;
}
