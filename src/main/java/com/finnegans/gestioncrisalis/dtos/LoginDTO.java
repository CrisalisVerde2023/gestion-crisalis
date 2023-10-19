package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
@Data
@AllArgsConstructor
public class LoginDTO {
    @NotBlank(message = "El campo usuario no puede ser vacio.")
    @JsonProperty("usuario")
    private String usuarioDTO;
    @NotBlank(message = "El campo password no puede ser vacio.")
    @JsonProperty("password")
    private String passwordDTO;
}
