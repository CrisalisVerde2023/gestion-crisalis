package com.finnegans.gestioncrisalis.models;

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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
            name = "PRODUCTOS_IMPUESTOS",
            joinColumns = @JoinColumn( name = "IMPUESTO_ID"),
            inverseJoinColumns = @JoinColumn( name = "PRODUCTO_ID"))
    private List<Producto> productos;


}
