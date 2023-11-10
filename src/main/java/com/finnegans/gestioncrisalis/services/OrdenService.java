package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.OrdenDTO;
import com.finnegans.gestioncrisalis.dtos.request.OrdenEncabezadoDTO;
import com.finnegans.gestioncrisalis.models.Orden;

import java.util.List;

public interface OrdenService {

    public Orden generar(OrdenDTO ordenDTO, boolean provisorio);
    public List<OrdenEncabezadoDTO> getAll();
    public Orden getById(Long id);
    public void anular(Long id);
}
