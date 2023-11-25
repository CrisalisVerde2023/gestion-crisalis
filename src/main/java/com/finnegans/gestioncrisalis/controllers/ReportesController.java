package com.finnegans.gestioncrisalis.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finnegans.gestioncrisalis.services.ReporteService;

@RestController
@RequestMapping("/api/reportes")
public class ReportesController {
    private ReporteService reportesServices;

    public ReportesController(ReporteService reportesService) {
        this.reportesServices = reportesService;
    }

    @GetMapping(value = "/historial")
    public ResponseEntity<?> reporte1() {
        return new ResponseEntity<>(this.reportesServices.getHistorialPedidos(), HttpStatus.OK);
    }

    @GetMapping(value = "/mayorDescuento")
    public ResponseEntity<?> reporte2() {
        return new ResponseEntity<>(this.reportesServices.getMayorDescuento(), HttpStatus.OK);
    }

    @GetMapping(value = "/descuentosPedidos")
    public ResponseEntity<?> reporte3() {
        return new ResponseEntity<>(this.reportesServices.getDescuentosPedidos(), HttpStatus.OK);
    }
}