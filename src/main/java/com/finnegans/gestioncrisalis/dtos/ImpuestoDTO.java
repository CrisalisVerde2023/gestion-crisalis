package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class ImpuestoDTO {

    @NotBlank(message = "El campo nombre no debe estar vacío.")
    @JsonProperty("nombre")
    private String nombreDTO;

    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer=3, fraction=2)
    @JsonProperty("porcentaje")
    private Float porcentajeDTO;
}
