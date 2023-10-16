package com.finnegans.gestioncrisalis.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioResponseDTO {
    @JsonProperty("id")
    private Long idDTO;

    @JsonProperty("usuario")
    private String usuarioDTO;

    @JsonProperty("eliminado")
    private boolean eliminadoDTO;
}
