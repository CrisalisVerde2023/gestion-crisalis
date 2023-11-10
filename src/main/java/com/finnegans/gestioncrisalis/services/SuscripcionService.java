package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.models.Cliente;

import java.util.List;

public interface SuscripcionService {

    public List<Long> getServiciosActivos(Cliente cliente);

}
