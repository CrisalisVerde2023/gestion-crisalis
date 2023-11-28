package com.finnegans.gestioncrisalis.dtos.mappers;

import com.finnegans.gestioncrisalis.dtos.request.EmpresaResponseDTO;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.validations.DateParser;

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
        String formattedDate = DateParser.formatDateToString(empresa.getStart_date(), "yyyy-MM-dd");
        return new EmpresaResponseDTO(empresa.getId(), empresa.getNombre(), empresa.getCuit(), formattedDate, empresa.isEliminado());
    }


}
