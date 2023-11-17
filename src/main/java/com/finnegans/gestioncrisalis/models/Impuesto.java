package com.finnegans.gestioncrisalis.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table (name="IMPUESTOS")
public class Impuesto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE", nullable = false)
    private String nombre;

    @Column(name = "PORCENTAJE", nullable = false)
    private Float  porcentaje;

    @Column(name = "ELIMINADO", nullable = false, columnDefinition = "boolean default false")
    private boolean eliminado;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "PRODUCTOS_IMPUESTOS",
            joinColumns = @JoinColumn( name = "IMPUESTO_ID"),
            inverseJoinColumns = @JoinColumn( name = "PRODUCTO_ID"))
    private List<Producto> productos;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "ORDEN_DETALLES_IMPUESTOS",
            joinColumns = @JoinColumn( name = "IMPUESTO_ID"),
            inverseJoinColumns = @JoinColumn( name = "ORDEN_DETALLE_ID"))
    private List<OrdenDetalle> ordenDetalle;
}
