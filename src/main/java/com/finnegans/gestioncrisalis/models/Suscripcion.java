package com.finnegans.gestioncrisalis.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SUSCRIPCIONES")
public class Suscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ORDEN_DETALLE_ID")
    private OrdenDetalle ordenDetalle;

    @Column(name = "ESTADO")
    private boolean estadoSuscripcion;
}
