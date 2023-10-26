package com.finnegans.gestioncrisalis.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class PersonaResponseDTO {
    private Long idDTO;
    private String nombreDTO;
    private String apellidoDTO;
    private LocalDate fechaNaciemientoDTO;
}
