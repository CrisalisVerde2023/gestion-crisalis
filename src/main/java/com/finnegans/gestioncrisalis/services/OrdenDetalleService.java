package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import java.util.List;

public interface OrdenDetalleService {

    public List<OrdenDetalle> getAll();

    public OrdenDetalle getById(Long id);
    public OrdenDetalle anular(Long id);
    List<OrdenDetalle> getOrdenDetalleByOrden(Long id);
}
