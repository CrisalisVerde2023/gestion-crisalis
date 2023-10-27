package com.finnegans.gestioncrisalis.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EmpresaResponseDTO {
    @JsonProperty("id")
    private int idDTO;

    @JsonProperty("nombre")
    private String nombreDTO;

    @JsonProperty("cuit")
    private String cuitDTO;

    @JsonProperty("start_date")
    private LocalDateTime start_dateDTO;
}
