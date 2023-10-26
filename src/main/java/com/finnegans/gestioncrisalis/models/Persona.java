package com.finnegans.gestioncrisalis.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Table(name = "personas")
public class Persona {
    @Id
    private Long id;
    private String nombre;
    private String apellido;
    private String telefono;
    private LocalDate fechaNacimiento;
}
