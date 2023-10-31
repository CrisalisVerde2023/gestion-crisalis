package com.finnegans.gestioncrisalis.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

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
        @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
        @GenericGenerator(strategy = "native", name = "native")
        @Column(name = "ID", nullable = false)
        private Long id;
        @Column(name="idCliente", nullable = false)
        private Long idCliente;

        @Column(name="idUsuario", nullable = false)
        private Long idUsuario;

        @Column(name = "ANULADO", nullable = false, columnDefinition = "boolean default false")
        private boolean anulado;

        @Column(name = "FECHA_CREACION", nullable = false)
        private LocalDateTime fechaCreacion;

        @OneToMany(mappedBy = "orden")
        private List<ordenDetalle> ordenDetalles;

    }

