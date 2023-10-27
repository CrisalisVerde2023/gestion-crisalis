package com.finnegans.gestioncrisalis.dtos.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.models.Persona;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClienteResponseDTO {
    @JsonProperty("id")
    private Long idDTO;

    @JsonProperty("persona")
    private Persona persona;

    @JsonProperty("empresa")
    private EmpresaResponseDTO empresa;

    @JsonProperty("eliminado")
    private boolean eliminadoDTO;
}
