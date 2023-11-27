package com.finnegans.gestioncrisalis.services;

import java.time.LocalDate;
import java.util.List;

import com.finnegans.gestioncrisalis.views.ReporteDescuento;
import com.finnegans.gestioncrisalis.views.ReporteHistorial;
import com.finnegans.gestioncrisalis.views.ReporteMayorDescuento;
import com.finnegans.gestioncrisalis.views.ReporteServicioMayorDescuento;

public interface ReporteService {
     public List<ReporteHistorial> getHistorialPedidos();
     public List<ReporteMayorDescuento> getMayorDescuento();
     public List<ReporteDescuento> getDescuentosPedidos();
     public List<ReporteServicioMayorDescuento> getServicioMayorDescuento(LocalDate fechaDesde, LocalDate fechaHasta);
}