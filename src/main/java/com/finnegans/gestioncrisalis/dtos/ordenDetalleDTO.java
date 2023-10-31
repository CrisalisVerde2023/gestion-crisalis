package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
@AllArgsConstructor
public class ordenDetalleDTO {

    @NotBlank(message = "El campo cliente no puede ser vacio.")
    @JsonProperty("cantidad")
    private int quantity;
    @JsonProperty("tiempoGarantia")
    private int tiempoGarantia;

    @JsonProperty("idServicioProducto");
    private Long idProductService;

}
