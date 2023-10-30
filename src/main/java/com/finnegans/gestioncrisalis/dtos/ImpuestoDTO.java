package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImpuestoDTO {

    @NotBlank(message = "El campo nombre no debe estar vacío.")
    @JsonProperty("nombre")
    private String nombre;

    @NotBlank(message = "El campo porcentaje no debe estar vacío.")
    @JsonProperty("porcentaje")
    private Float porcentaje;
}
