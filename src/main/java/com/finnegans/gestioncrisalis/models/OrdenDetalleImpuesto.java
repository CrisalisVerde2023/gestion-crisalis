package com.finnegans.gestioncrisalis.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ORDEN_DETALLES_IMPUESTOS")
public class OrdenDetalleImpuesto implements Serializable{
    @Id
    @ManyToOne(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL
    )
    @JoinColumn(name="ORDEN_DETALLE_ID")
    private OrdenDetalle ordenDetalle;

    @Id
    @ManyToOne(
        fetch = FetchType.LAZY,
        cascade = CascadeType.ALL
    )
    @JoinColumn(name="IMPUESTO_ID")
    private Impuesto impuesto;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "PORCENTAJE")
    private Float porcentaje;
}