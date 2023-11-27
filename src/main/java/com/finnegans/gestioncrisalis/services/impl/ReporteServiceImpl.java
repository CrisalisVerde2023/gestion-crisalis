package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.repositories.reportes.ReporteDescuentoRepository;
import com.finnegans.gestioncrisalis.repositories.reportes.ReporteHistorialRepository;
import com.finnegans.gestioncrisalis.repositories.reportes.ReporteMayorDescuentoRepository;
import com.finnegans.gestioncrisalis.repositories.reportes.ReporteServicioMayorDescuentoRepository;

import com.finnegans.gestioncrisalis.services.ReporteService;
import com.finnegans.gestioncrisalis.views.ReporteDescuento;
import com.finnegans.gestioncrisalis.views.ReporteHistorial;
import com.finnegans.gestioncrisalis.views.ReporteMayorDescuento;
import com.finnegans.gestioncrisalis.views.ReporteServicioMayorDescuento;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReporteServiceImpl implements ReporteService {
    private final ReporteDescuentoRepository reporteDescuentoRepository;
    private final ReporteHistorialRepository reporteHistorialRepository;
    private final ReporteMayorDescuentoRepository reporteMayorDescuentoRepository;
    private final ReporteServicioMayorDescuentoRepository reporteServicioMayorDescuentoRepository;

    public ReporteServiceImpl(ReporteDescuentoRepository rdr, ReporteMayorDescuentoRepository rmdr, ReporteHistorialRepository rhr, ReporteServicioMayorDescuentoRepository rsmdr) {
        this.reporteDescuentoRepository = rdr;
        this.reporteHistorialRepository = rhr;
        this.reporteMayorDescuentoRepository = rmdr;
        this.reporteServicioMayorDescuentoRepository = rsmdr;
    }

    @Override
    public List<ReporteHistorial> getHistorialPedidos(){
        return this.reporteHistorialRepository.findAll();
    }

    @Override
    public List<ReporteMayorDescuento> getMayorDescuento(){
        return this.reporteMayorDescuentoRepository.findAll();
    }

    @Override
    public List<ReporteDescuento> getDescuentosPedidos(){
        return this.reporteDescuentoRepository.findAll();
    }

    @Override
    public List<ReporteServicioMayorDescuento> getServicioMayorDescuento(LocalDate fechaDesde, LocalDate fechaHasta){
        return this.reporteServicioMayorDescuentoRepository.getServicioMayorDescuento(fechaDesde, fechaHasta);
    }
}
