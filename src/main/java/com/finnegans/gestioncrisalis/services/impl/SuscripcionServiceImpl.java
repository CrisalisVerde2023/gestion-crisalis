package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.Orden;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.models.Suscripcion;
import com.finnegans.gestioncrisalis.repositories.OrdenDetalleRepository;
import com.finnegans.gestioncrisalis.repositories.SuscripcionRepository;
import com.finnegans.gestioncrisalis.services.SuscripcionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SuscripcionServiceImpl implements SuscripcionService {
    private final SuscripcionRepository suscripcionRepository;
    private final OrdenDetalleRepository ordenDetalleRepository;

    public SuscripcionServiceImpl(SuscripcionRepository suscripcionRepository, OrdenDetalleRepository ordenDetalleRepository) {
        this.suscripcionRepository = suscripcionRepository;
        this.ordenDetalleRepository = ordenDetalleRepository;
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

        return idsServiciosActivos;
    }

    public void createSub(List<Long> idsOD) {
        List<OrdenDetalle> detalles = this.ordenDetalleRepository.findAllById(idsOD);
        Suscripcion sub = new Suscripcion();

        sub.setOrdenDetalle(detalles.get(0));
        sub.setEstadoSuscripcion(false);

        this.suscripcionRepository.save(sub);
    }

    
}


