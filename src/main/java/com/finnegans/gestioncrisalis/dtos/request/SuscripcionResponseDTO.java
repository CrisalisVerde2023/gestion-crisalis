package com.finnegans.gestioncrisalis.dtos.request;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SuscripcionResponseDTO {
    private Long id;
    private Boolean estado;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime fecha;
    private String persona;
    private String empresa;
    private String servicio;
}