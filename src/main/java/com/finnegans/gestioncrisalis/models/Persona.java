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

    @Column(name = "DNI", nullable = false)
    private String dni;

    @Column(name = "FECHA_CREACION", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private LocalDate fechaCreacion;

    @PrePersist
    public void prePersist() {
        fechaCreacion = LocalDate.now();
        fechaModificacion = LocalDate.now();
    }

    @Column(name = "FECHA_MODIFICACION")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private LocalDate fechaModificacion;

    @PreUpdate
    public void preUpdate() {
        fechaModificacion = LocalDate.now();
    }

}
