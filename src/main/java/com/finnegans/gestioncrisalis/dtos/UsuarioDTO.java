package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finnegans.gestioncrisalis.validations.UsuarioOnCreate;
import com.finnegans.gestioncrisalis.validations.UsuarioOnUpdate;
import com.finnegans.gestioncrisalis.validations.ValidUsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@ValidUsuarioDTO(groups = UsuarioOnUpdate.class)
public class UsuarioDTO {
    @NotBlank(message = "El campo usuario no puede ser vacio.", groups = UsuarioOnCreate.class)
    @Email(message = "El campo usuario debe ser un email de formato valido.", groups = {UsuarioOnCreate.class, UsuarioOnUpdate.class})
    @JsonProperty("usuario")
    private String usuarioDTO;
    @NotBlank(message = "El campo password no puede ser vacio.", groups = UsuarioOnCreate.class)
    @JsonProperty("password")
    private String passwordDTO;
}
