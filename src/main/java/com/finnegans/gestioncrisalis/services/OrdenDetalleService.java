package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import java.util.List;

public interface OrdenDetalleService {

    List<OrdenDetalle> findAllOrdenDetalles();

    OrdenDetalle findOrdenDetalleById(Long id);

    OrdenDetalle cancelOrdenDetalle(Long id);
}
