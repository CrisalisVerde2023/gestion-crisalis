package com.finnegans.gestioncrisalis.dtos.request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class OrdenEncabezadoDTO {
    private Long id;
    private Boolean anulado;
    private Double total;
    private String persona;
    private String empresa;
    private LocalDate fechaCreacion;
    private Long cantProds;
    private Long cantServs;

    public OrdenEncabezadoDTO(Long cantServs, Long cantProds, Long id, LocalDateTime fechaCreacion, Boolean anulado, String persona, String empresa, Double total) {
        this.cantServs = cantServs;
        this.cantProds = cantProds;
        this.id = id;
        this.fechaCreacion = fechaCreacion.toLocalDate();
        this.anulado = anulado;
        this.persona = persona;
        this.empresa = empresa;
        this.total = total;
    }
}