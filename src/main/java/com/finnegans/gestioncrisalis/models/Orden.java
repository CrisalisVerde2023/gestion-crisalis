package com.finnegans.gestioncrisalis.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ORDENES")
public class Orden {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER,
        cascade = CascadeType.ALL)
    @JoinColumn(name="CLIENTE_ID")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.EAGER,
            cascade = CascadeType.ALL/*,
            optional = false*/)
    @JoinColumn(name="USUARIO_ID")
    private Usuario usuario;

    @Column(name = "ANULADO", nullable = false, columnDefinition = "boolean default false")
    private boolean anulado;

    @Column(name = "FECHA_CREACION", nullable = false)
    private LocalDateTime fechaCreacion;

    @OneToMany(mappedBy = "orden")
    private List<OrdenDetalle> ordenDetalles;

    @PrePersist
    public void prePersist() {
            this.fechaCreacion = LocalDateTime.now();
    }
}