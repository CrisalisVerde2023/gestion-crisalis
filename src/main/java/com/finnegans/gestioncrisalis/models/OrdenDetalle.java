package com.finnegans.gestioncrisalis.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ORDEN_DETALLES")
public class OrdenDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            optional = false
    )
    @JoinColumn(name="ORDEN_ID")
    @JsonIgnore
    private Orden orden;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            optional = false
    )
    @JoinColumn(name="PRODUCTO_ID")
    private Producto productoServicio;

    @Column(name = "CANTIDAD", nullable = false)
    private Integer cantidad;

    @Column(name = "NOMBRE", nullable = false)
    private String nombre;

    @Column(name = "COSTO", nullable = false)
    private Float costo;

    @Column(name = "DESCUENTO")
    private Double descuento;

    @Column(name = "SERVICIO_SOPORTE")
    private Float servicioSoporte;

    @Column(name = "GARANTIA")
    private Integer garantia;

    @Column(name = "GARANTIA_COSTO")
    private Double garantiaCosto;

    @Column(name = "ANULADO", nullable = false)
    private boolean anulado;

    @Column(name = "TIPO", nullable = false)
    private String tipo;

    @OneToOne(mappedBy = "ordenDetalle", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Suscripcion suscripcion;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "ORDEN_DETALLES_IMPUESTOS",
        joinColumns = @JoinColumn(name = "ORDEN_DETALLE_ID"),
        inverseJoinColumns = @JoinColumn(name = "IMPUESTO_ID")
    )
    private List<Impuesto> impuestos;

    @Transient
    private Float impuesto;
}
