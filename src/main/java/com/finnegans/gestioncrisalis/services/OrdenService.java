package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.OrdenDTO;
import com.finnegans.gestioncrisalis.models.Orden;

import java.util.List;

public interface OrdenService {

    public Orden save(OrdenDTO ordenDTO);
    public List<Orden> getAll();
    public Orden getById(Long id);
    public void anular(Long id);
}
