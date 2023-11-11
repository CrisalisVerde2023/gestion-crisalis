package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.repositories.ClienteRepository;

import com.finnegans.gestioncrisalis.services.SuscripcionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/suscripciones")
public class SuscripcionController {
    private SuscripcionService suscripcionService;
    private ClienteRepository clienteRepository;

    public SuscripcionController(SuscripcionService suscripcionService, ClienteRepository clienteRepository) {
        this.suscripcionService = suscripcionService;
        this.clienteRepository = clienteRepository;
    }

    // No hace falta tener un controller de esto
    @GetMapping("/cliente/{id}")
    public ResponseEntity<?> getServiciosActivos(@PathVariable Long id){
       Cliente cliente = this.clienteRepository.findById(id)
               .orElseThrow(() -> new ResourceNotFound("Cliente no encontrado con ID: " + id));

        return new ResponseEntity<>(this.suscripcionService.getServiciosActivos(cliente), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getSuscripciones(){
        return new ResponseEntity<>(suscripcionService.getAll(), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> cambiarEstado(@PathVariable Long id) {
        return new ResponseEntity<>(suscripcionService.cambiarEstado(id), HttpStatus.OK);
    }

}