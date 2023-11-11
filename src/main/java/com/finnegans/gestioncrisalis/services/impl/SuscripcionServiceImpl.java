package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.request.SuscripcionResponseDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.models.Orden;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.models.Persona;
import com.finnegans.gestioncrisalis.models.Suscripcion;
import com.finnegans.gestioncrisalis.repositories.SuscripcionRepository;
import com.finnegans.gestioncrisalis.services.SuscripcionService;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SuscripcionServiceImpl implements SuscripcionService {
    private final SuscripcionRepository suscripcionRepository;

    public SuscripcionServiceImpl(SuscripcionRepository suscripcionRepository) {
        this.suscripcionRepository = suscripcionRepository;
    }

    @Override
    public List<Long> getServiciosActivos(Cliente cliente) {
        List<Long> idsServiciosActivos = new ArrayList<Long>();

        for (Cliente cli: (cliente.getEmpresa() != null) ? cliente.getEmpresa().getClientes() : Arrays.asList(cliente))
            for (Orden ord: cli.getOrdenes())
                for (OrdenDetalle ordDet: ord.getOrdenDetalles()) {
                    Suscripcion ordenSus = ordDet.getSuscripcion();

                    if ((ordenSus != null) && (ordenSus.isEstadoSuscripcion()))
                        idsServiciosActivos.add(ordenSus.getOrdenDetalle().getProductoServicio().getId());
                };

        return idsServiciosActivos; // [IdServicio, idServicio]
    }

    @Override
    public List<Suscripcion> createSubByOds(List<OrdenDetalle> ordDetsServ) {
        List<Suscripcion> subs = new ArrayList<Suscripcion>();

        ordDetsServ.forEach((ordDet) -> subs.add(new Suscripcion(null, ordDet, false)));

        return this.suscripcionRepository.saveAllAndFlush(subs);
    }

    @Override
    public List<SuscripcionResponseDTO> getAll() {
        List<Suscripcion> suscripciones = suscripcionRepository.findAll();
        List<SuscripcionResponseDTO> susEnc = new ArrayList<SuscripcionResponseDTO>();

        suscripciones.forEach((sus) -> {
            OrdenDetalle detalle = sus.getOrdenDetalle();
            Orden orden = detalle.getOrden();
            Cliente cliente = orden.getCliente();
            Persona persona = cliente.getPersona();
            Empresa empresa = cliente.getEmpresa();

            susEnc.add(new SuscripcionResponseDTO(sus.getId(), sus.isEstadoSuscripcion(), orden.getFechaCreacion(), persona.getNombre() + " " + persona.getApellido(), empresa.getNombre(), detalle.getProductoServicio().getNombre()));
        });

        return susEnc;
    }

    @Override
    public Suscripcion cambiarEstado(Long id) {
        Suscripcion suscripcion = this.suscripcionRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Suscripción no encontrada con id: " + id));

        suscripcion.setEstadoSuscripcion(!suscripcion.isEstadoSuscripcion());
        return this.suscripcionRepository.save(suscripcion);
    }
}