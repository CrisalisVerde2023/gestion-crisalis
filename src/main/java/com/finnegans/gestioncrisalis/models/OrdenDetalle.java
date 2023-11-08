package com.finnegans.gestioncrisalis.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ORDEN_DETALLES")
public class OrdenDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(strategy = "native", name = "native")
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

    @Column(name = "IMPUESTO")
    private Double impuesto;

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
}
