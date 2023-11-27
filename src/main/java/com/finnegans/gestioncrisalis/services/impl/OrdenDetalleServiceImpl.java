package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.controllers.OrdenDetalleController;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.repositories.OrdenDetalleRepository;
import com.finnegans.gestioncrisalis.services.OrdenDetalleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class OrdenDetalleServiceImpl implements OrdenDetalleService {
    private final OrdenDetalleRepository ordenDetalleRepository;
    private static final Logger logger = LoggerFactory.getLogger(OrdenDetalleServiceImpl.class);

    public OrdenDetalleServiceImpl(OrdenDetalleRepository ordenDetalleRepository) {
        this.ordenDetalleRepository = ordenDetalleRepository;

    }

    @Override
    public List<OrdenDetalle> findAllOrdenDetalles() {
        return this.ordenDetalleRepository.findAll();
    }
    @Override
    public OrdenDetalle findOrdenDetalleById(Long id) {
        logger.info("Order ID Serv Imp: {}", id);
       return this.ordenDetalleRepository.findById(id)
                .orElseThrow(() -> new
                        ResourceNotFound("OrdenDetalle no encontrada con id: " + id));

    }
    @Override
    public OrdenDetalle cancelOrdenDetalle(Long id) {
        OrdenDetalle ordenDetalle = this.ordenDetalleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Detalle de orden no encontrado con id: ".concat(String.valueOf(id))));

        ordenDetalle.setAnulado(!ordenDetalle.isAnulado());
        return this.ordenDetalleRepository.save(ordenDetalle);
    }

}
