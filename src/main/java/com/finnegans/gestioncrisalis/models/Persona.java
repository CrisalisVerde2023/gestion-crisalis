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
@Table(name = "PERSONAS")
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE", nullable = false)
    private String firstName;

    @Column(name = "APELLIDO", nullable = false)
    private String lastName;

    @Column(name = "DNI", nullable = false)
    private String dni;

    @OneToMany(
            mappedBy = "persona"
    )
    @JsonIgnore
    private List<Cliente> clientes;
}
