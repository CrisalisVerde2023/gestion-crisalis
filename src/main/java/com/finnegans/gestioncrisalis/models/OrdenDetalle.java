package com.finnegans.gestioncrisalis.models;


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
    private Orden orden;

    @ManyToOne(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL,
            optional = false
    )
    @JoinColumn(name="PRODUCTO_ID")
    private Producto productoServicio;

    @Column(name = "QUANTITY", nullable = false)
    private Integer quantity;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "COST", nullable = false)
    private Float cost;

    @Column(name = "TAX", nullable = false)
    private Double tax;

    @Column(name = "DISCOUNT", nullable = false)
    private Double discount;

    @Column(name = "SERVICE_SUPPORT", nullable = false)
    private Float service_support;

    @Column(name = "WARRANTY_YEARS", nullable = false)
    private Integer warranty_years;

    @Column(name = "WARRANTY_COST", nullable = false)
    private Double warranty_cost;
    @Column(name = "ANULADO", nullable = false)
    private boolean anulado;
}
