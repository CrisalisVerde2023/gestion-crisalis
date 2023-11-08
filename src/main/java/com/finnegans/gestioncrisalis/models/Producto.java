package com.finnegans.gestioncrisalis.models;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.finnegans.gestioncrisalis.dtos.ProductoDTO;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter //El @Data te arma bardo, cuidadillo
@Setter //El @Data te arma bardo, cuidadillo
@Table(name = "PRODUCTOS_SERVICIOS")
@JsonIgnoreProperties({"fechaCreacion", "fechaModificacion", "ordenDetalle"})
//@JsonInclude(JsonInclude.Include.NON_NULL)
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NOMBRE", nullable = false, unique = true)
    private String nombre;

    @Column(name = "ELIMINADO", nullable = false, columnDefinition = "boolean default false")
    private boolean eliminado;

    @Column(name = "TIPO", nullable = false)
    private String tipo;

    @Column(name = "COSTO", nullable = false)
    private Float costo;
    
    @Column(name = "SOPORTE")
    private Float soporte;

    @Column(name = "FECHA_CREACION", nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "FECHA_MODIFICACION")
    private LocalDateTime fechaModificacion;


    @OneToMany(mappedBy = "productoServicio")
    @JsonIgnore
    private List<OrdenDetalle> ordenDetalle;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "PRODUCTOS_IMPUESTOS",
            joinColumns = @JoinColumn(name = "PRODUCTO_ID"),
            inverseJoinColumns = @JoinColumn(name = "IMPUESTO_ID"))
    private List<Impuesto> impuestos;

    public Producto(ProductoDTO productDTO){
        this.nombre = productDTO.getNombre();
        this.tipo = productDTO.getTipo();
        this.costo = productDTO.getCosto();
        this.soporte = productDTO.getSoporte();
    }

    @PrePersist
    public void prePersist() {
        this.fechaCreacion = LocalDateTime.now();
        this.fechaModificacion = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.fechaModificacion = LocalDateTime.now();
    }
}