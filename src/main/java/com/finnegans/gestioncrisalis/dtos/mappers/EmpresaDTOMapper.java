package com.finnegans.gestioncrisalis.dtos.mappers;

import com.finnegans.gestioncrisalis.dtos.request.EmpresaResponseDTO;
import com.finnegans.gestioncrisalis.models.Empresa;

public class EmpresaDTOMapper {
    private Empresa empresa;

    private EmpresaDTOMapper() {}

    public static EmpresaDTOMapper builder() {
        return new EmpresaDTOMapper();
    }

    public EmpresaDTOMapper setEmpresa(Empresa empresa) {
        this.empresa = empresa;
        return this;
    }

    public EmpresaResponseDTO build() {
        if (empresa == null) throw new RuntimeException("Debe pasar la entidad Empresa");

        return new EmpresaResponseDTO(empresa.getId(), empresa.getNombre(), empresa.getCuit(), empresa.getStart_date());
    }
}
