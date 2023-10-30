package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import com.finnegans.gestioncrisalis.dtos.request.EmpresaResponseDTO;

import java.util.List;

public interface EmpresaService {
    EmpresaResponseDTO save(EmpresaDTO empresaDTO);
    List<EmpresaResponseDTO> getAll();
    EmpresaResponseDTO getById(Long id);
    EmpresaResponseDTO update(Long id, EmpresaDTO empresaDTO);
    void delete(Long id);
}
