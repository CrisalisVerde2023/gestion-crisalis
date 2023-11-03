package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
@AllArgsConstructor
public class OrdenDetalleDTO {

    @NotBlank(message = "El campo cliente no puede ser vacio.")
    private Integer cantidad;

    private Integer garantia;
    @JsonProperty("idServicioProducto")
    private Long idProductService;

}
