package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonaDTO {
    @NotBlank(message = "El campo nombre no debe estar vacío.")
    @JsonProperty("nombre")
    private String nombreDTO;

    @NotBlank(message = "El campo apellido no debe estar vacío.")
    @JsonProperty("apellido")
    private String apellidoDTO;

    @JsonProperty("dni")
    private String dniDTO;
}
