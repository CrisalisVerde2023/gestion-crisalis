package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.ImpuestoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.MissingDataException;
import com.finnegans.gestioncrisalis.services.ImpuestoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/api/impuestos")
public class ImpuestoController {
    private final ImpuestoService impuestoService;

    public ImpuestoController(ImpuestoService impuestoService) {
        this.impuestoService = impuestoService;
    }

    //LISTAR TODOS
    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(this.impuestoService.getAll(), HttpStatus.OK);
    }

    //CREAR
    @PostMapping
    public ResponseEntity<?> save(@RequestBody @Valid ImpuestoDTO impuestoDTO){
        this.impuestoService.save(impuestoDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //ELIMINAR
    @PatchMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable @Positive Long id){
        this.impuestoService.delete(id);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    //ACTUALIZAR
    @PostMapping(value = "/{id}")
    public ResponseEntity<?> update(@PathVariable @Positive Long id, @RequestBody @Valid ImpuestoDTO impuestoDTO){
        this.impuestoService.update(id, impuestoDTO);

        return  new ResponseEntity<>(HttpStatus.OK);
    }

    //BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return new ResponseEntity<>(this.impuestoService.getById(id),HttpStatus.OK);
    }




}
