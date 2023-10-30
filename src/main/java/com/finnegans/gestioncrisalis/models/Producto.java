package com.finnegans.gestioncrisalis.models;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.finnegans.gestioncrisalis.dtos.ProductoDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "PRODUCTOS_SERVICIOS")
@JsonIgnoreProperties({"fechaCreacion", "fechaModificacion", "ordenDetalle"})
@JsonInclude(JsonInclude.Include.NON_NULL)
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

/*    
    @OneToMany(mappedBy = "productoServicio")
    private List<OrdenDetalle> ordenDetalle;
*/

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