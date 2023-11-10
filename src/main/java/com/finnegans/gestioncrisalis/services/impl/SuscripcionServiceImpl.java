package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.Orden;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.models.Suscripcion;
import com.finnegans.gestioncrisalis.services.SuscripcionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SuscripcionServiceImpl implements SuscripcionService {


    @Override
    public List<Long> getServiciosActivos(Cliente cliente) {
        List<Long> idsServiciosActivos = new ArrayList<Long>();

        for (Cliente cli: (cliente.getEmpresa() != null) ? cliente.getEmpresa().getClientes() : Arrays.asList(cliente))
            for (Orden ord: cli.getOrdenes())
                for (OrdenDetalle ordDet: ord.getOrdenDetalles()) {
                    Suscripcion ordenSus = ordDet.getSuscripcion();

                    if (ordenSus.isEstadoSuscripcion())
                        idsServiciosActivos.add(ordenSus.getOrdenDetalle().getProductoServicio().getId());
                };

        return idsServiciosActivos;
    }

}


