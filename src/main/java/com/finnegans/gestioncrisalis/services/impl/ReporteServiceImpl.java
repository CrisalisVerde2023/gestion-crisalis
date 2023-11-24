package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.repositories.reportes.ReporteDescuentoRepository;
import com.finnegans.gestioncrisalis.repositories.reportes.ReporteHistorialRepository;
import com.finnegans.gestioncrisalis.repositories.reportes.ReporteMayorDescuentoRepository;
import com.finnegans.gestioncrisalis.services.ReporteService;
import com.finnegans.gestioncrisalis.views.ReporteDescuento;
import com.finnegans.gestioncrisalis.views.ReporteHistorial;
import com.finnegans.gestioncrisalis.views.ReporteMayorDescuento;

import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ReporteServiceImpl implements ReporteService {
    private final ReporteDescuentoRepository reporteDescuentoRepository;
    private final ReporteHistorialRepository reporteHistorialRepository;
    private final ReporteMayorDescuentoRepository reporteMayorDescuentoRepository;

    public ReporteServiceImpl(ReporteDescuentoRepository rdr, ReporteMayorDescuentoRepository rmdr, ReporteHistorialRepository rhr) {
        this.reporteDescuentoRepository = rdr;
        this.reporteHistorialRepository = rhr;
        this.reporteMayorDescuentoRepository = rmdr;
    }

    @Override
    public List<ReporteHistorial> getHistorialPedidos(){
        return this.reporteHistorialRepository.findAll();
    }

    @Override
    public List<ReporteDescuento> getMayorDescuento(){
        return this.reporteDescuentoRepository.findAll();
    }

    @Override
    public List<ReporteMayorDescuento> getDescuentosPedidos(){
        return this.reporteMayorDescuentoRepository.findAll();
    }

}
