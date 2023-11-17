package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.request.SuscripcionResponseDTO;
import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.models.Suscripcion;

import java.util.List;

public interface SuscripcionService {
    public List<Suscripcion> getServiciosActivos(Cliente cliente);
    public boolean tieneServiciosActivos(Cliente cliente);
    public List<Suscripcion> createSubByOds(List<OrdenDetalle> ordDetsServ);
    public List<SuscripcionResponseDTO> getAll();
    public Suscripcion cambiarEstado(Long id);
}
