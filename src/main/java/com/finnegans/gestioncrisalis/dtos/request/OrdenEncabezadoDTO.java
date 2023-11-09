package com.finnegans.gestioncrisalis.dtos.request;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrdenEncabezadoDTO {
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime fechaCreacion;
    private String persona;
    private String empresa;
    private Long cantProds;
    private Long cantServs;
    private Double total;
    private Boolean anulado;
}