package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.services.OrdenDetalleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/ordenDetalle")
public class OrdenDetalleController {

    private final OrdenDetalleService ordenDetalleService;

    public OrdenDetalleController(OrdenDetalleService orderDetailService) {
        this.ordenDetalleService = orderDetailService;
    }
    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDetallesOrdenes() {
        return new ResponseEntity<>(this.ordenDetalleService.getAll(), HttpStatus.OK);
    }
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrdenDetalleByOrden(@PathVariable Long id) {
        return new ResponseEntity<>(this.ordenDetalleService.getOrdenDetalleByOrden(id), HttpStatus.OK);
    }

}
