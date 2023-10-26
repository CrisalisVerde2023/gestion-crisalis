package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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

    @JsonProperty("fecha_nacimiento")
    private LocalDateTime fechaNacimientoDTO;
}
