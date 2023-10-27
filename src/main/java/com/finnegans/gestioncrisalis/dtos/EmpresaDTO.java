package com.finnegans.gestioncrisalis.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.finnegans.gestioncrisalis.validations.EmpresaOnCreate;
import com.finnegans.gestioncrisalis.validations.EmpresaOnUpdate;
import com.finnegans.gestioncrisalis.validations.ValidEmpresaDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@ValidEmpresaDTO(groups = EmpresaOnUpdate.class)
public class EmpresaDTO {
    @NotBlank(message = "El campo nombre no puede ser vacio.", groups = EmpresaOnCreate.class)
    @JsonProperty("nombre")
    private String nombreDTO;

    @NotBlank(message = "El campo cuit no puede ser vacio.", groups = EmpresaOnCreate.class)
    @Pattern(regexp = "\\d{2}-\\d{8}-\\d{1}", message = "El formato de CUIT debe ser XX-XXXXXXXX-X", groups = {EmpresaOnCreate.class, EmpresaOnUpdate.class})
    @JsonProperty("cuit")
    private String cuitDTO;

    @JsonProperty("start_date")
    private LocalDateTime start_dateDTO;
}
