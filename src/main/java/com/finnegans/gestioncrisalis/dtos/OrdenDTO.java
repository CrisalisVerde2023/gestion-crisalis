package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
public class OrdenDTO {
    @NotBlank(message = "El campo cliente no puede ser vacio.")
    @JsonProperty("idCliente")
    private Long idCliente;
    @NotBlank(message = "El campo cliente no puede ser vacio.")
    @JsonProperty("idUsuario")
    private Long idUsuario;

    @JsonProperty("detalleOrden")
    private List<OrdenDetalleDTO> ordenDetalles;
}
