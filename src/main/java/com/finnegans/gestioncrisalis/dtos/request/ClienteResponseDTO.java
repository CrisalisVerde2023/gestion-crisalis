package com.finnegans.gestioncrisalis.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClienteResponseDTO {
    @JsonProperty("id")
    private Long idDTO;

    @JsonProperty("nombre")
    private String nombreDTO;

    @JsonProperty("eliminado")
    private boolean eliminadoDTO;
}
