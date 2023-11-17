package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.OrdenDTO;
import com.finnegans.gestioncrisalis.services.OrdenService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.PositiveOrZero;

@RestController
@RequestMapping("/api/orden")
public class OrdenController {

    private OrdenService ordenService;

    public OrdenController(OrdenService ordenService){
        this.ordenService = ordenService;

    }

    @PostMapping
    public ResponseEntity<?> create( @RequestBody OrdenDTO ordenDTO){
        return new ResponseEntity<>(
            this.ordenService.generar(ordenDTO, false),
            HttpStatus.CREATED);
    }

    @PostMapping("/calcular")
    public ResponseEntity<?> calcular( @RequestBody OrdenDTO ordenDTO){
        return new ResponseEntity<>(
            this.ordenService.generar(ordenDTO, true).getOrdenDetalles(),
            HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(this.ordenService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable @PositiveOrZero Long id){
        return new ResponseEntity<>(this.ordenService.getById(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> anular(@PathVariable @PositiveOrZero Long id){
        this.ordenService.anular(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}


