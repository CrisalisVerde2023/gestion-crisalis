package com.finnegans.gestioncrisalis.views;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.Immutable;

import lombok.Data;

@Entity
@Immutable
@Data
public class ReporteServicioMayorDescuento{
    @Id
    @JsonIgnore
    private Long id;

    private String cliente;
    private String servicio;
    private Double descuento;
}
