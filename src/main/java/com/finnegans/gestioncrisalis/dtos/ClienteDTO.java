package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {
    @JsonProperty("persona_id")
    private Long personaIdDTO;

    @JsonProperty("empresa_id")
    private Long empresaIdDTO;
}
