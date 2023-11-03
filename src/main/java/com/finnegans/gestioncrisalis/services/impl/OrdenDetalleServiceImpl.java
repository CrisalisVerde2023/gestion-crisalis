package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.repositories.OrdenDetalleRepository;
import com.finnegans.gestioncrisalis.services.OrdenDetalleService;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class OrdenDetalleServiceImpl implements OrdenDetalleService {
    private final OrdenDetalleRepository ordenDetalleRepository;

    public OrdenDetalleServiceImpl(OrdenDetalleRepository ordenDetalleRepository) {
        this.ordenDetalleRepository = ordenDetalleRepository;

    }
    @Override
    public List<OrdenDetalle> getOrdenDetalleByOrden(Long id) {
        return this.ordenDetalleRepository
                .findByOrden(id);

    }

    @Override
    public List<OrdenDetalle> getAll() {
        return this.ordenDetalleRepository.findAll();
    }
    @Override
    public OrdenDetalle getById(Long id) {
       return this.ordenDetalleRepository.findById(id)
                .orElseThrow(() -> new
                        ResourceNotFound("OrdenDetalle no encontrada con id: " + id));

    }
    @Override
    public OrdenDetalle anular(Long id) {
        OrdenDetalle ordenDetalle = this.ordenDetalleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Detalle de orden no encontrado con id: ".concat(String.valueOf(id))));

        ordenDetalle.setAnulado(!ordenDetalle.isAnulado());
        return this.ordenDetalleRepository.save(ordenDetalle);
    }

}
