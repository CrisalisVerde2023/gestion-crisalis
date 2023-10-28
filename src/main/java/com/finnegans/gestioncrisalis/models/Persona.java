package com.finnegans.gestioncrisalis.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "personas")
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE", nullable = false)
    private String nombre;

    @Column(name = "APELLIDO", nullable = false)
    private String apellido;

    @Column(name = "DNI", nullable = false, unique = true)
    private String dni;

    @Column(name = "FECHA_CREACION", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private LocalDate fechaCreacion;

    @PrePersist
    public void prePersist() {
        fechaCreacion = LocalDate.now();
        fechaModificacion = LocalDateTime.now();
    }

    @Column(name = "FECHA_MODIFICACION")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private LocalDateTime fechaModificacion;

    @PreUpdate
    public void preUpdate() {
        fechaModificacion = LocalDateTime.now();
    }

}
