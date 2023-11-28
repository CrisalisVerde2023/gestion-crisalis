package com.finnegans.gestioncrisalis.views;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Subselect;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Entity
@Getter
public class ReporteMayorDescuento{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long idNro;

    private String cliente;
    private String servicio;

    private Long idOrden;

    private Double descuento;
}
