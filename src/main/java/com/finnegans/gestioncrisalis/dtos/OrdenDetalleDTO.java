package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
@AllArgsConstructor
public class OrdenDetalleDTO {

    @NotBlank(message = "El campo cliente no puede ser vacio.")
    @JsonProperty("cantidad")
    private Integer quantity;
    @JsonProperty("tiempoGarantia")
    private Integer tiempoGarantia;

    @JsonProperty("idServicioProducto")
    private Long idProductService;

}
