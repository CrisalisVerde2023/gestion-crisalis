package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.ordenDTO;
import com.finnegans.gestioncrisalis.models.Orden;

import java.util.List;

public interface OrdenService {

    public Orden save(ordenDTO ordenDTO);
    public List<Orden> getAll();
}
