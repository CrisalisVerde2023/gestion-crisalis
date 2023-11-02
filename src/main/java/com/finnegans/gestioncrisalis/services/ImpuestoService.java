package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.ImpuestoDTO;
import com.finnegans.gestioncrisalis.models.Impuesto;

import java.util.List;

public interface ImpuestoService {
    Impuesto save(ImpuestoDTO impuestoDTO);

    Impuesto getById(Long id);

    List<Impuesto> getAll();

    Impuesto update(Long id, ImpuestoDTO impuestoDTO);

    void delete(Long id);



}
