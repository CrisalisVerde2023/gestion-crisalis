package com.finnegans.gestioncrisalis.dtos;

import javax.validation.constraints.PositiveOrZero;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductoDTO {
    private Long id;
    private String tipo;
    private String nombre;

    @PositiveOrZero(message = "El campo costo debe ser mayor o igual a cero.")
    private Float costo;

    @PositiveOrZero(message = "El campo soporte debe ser mayor o igual a cero.")
    private Float soporte;

    private List<Long> idImpuestos; //Este array es para recibir los ids de los impuestos que se le asignan al producto
}