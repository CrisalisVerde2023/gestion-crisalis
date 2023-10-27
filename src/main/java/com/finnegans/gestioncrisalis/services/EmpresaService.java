package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import com.finnegans.gestioncrisalis.dtos.request.EmpresaResponseDTO;

import java.util.List;

public interface EmpresaService {
    EmpresaResponseDTO save(EmpresaDTO empresaDTO);
    List<EmpresaResponseDTO> getAll();
    EmpresaResponseDTO getById(int id);
    EmpresaResponseDTO update(int id, EmpresaDTO empresaDTO);
    void delete(int id);
}
