package com.finnegans.gestioncrisalis.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "USUARIOS")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(strategy = "native", name = "native")
    @Column(name = "ID")
    private Long id;

    @Column(name = "USUARIO", nullable = false, unique = true)
    private String usuario;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "ELIMINADO", nullable = false, columnDefinition = "boolean default false")
    private boolean eliminado;

    @Column(name = "FECHA_CREACION", nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "FECHA_MODIFICACION")
    private LocalDateTime fechaModificacion;
}
