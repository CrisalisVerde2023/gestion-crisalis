package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import com.finnegans.gestioncrisalis.services.EmpresaService;
import com.finnegans.gestioncrisalis.validations.EmpresaOnUpdate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {
    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService){
        this.empresaService = empresaService;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody EmpresaDTO empresaDTO) {
        this.empresaService.save(empresaDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(this.empresaService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return new ResponseEntity<>(this.empresaService.getById(id), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Validated(EmpresaOnUpdate.class) @RequestBody EmpresaDTO empresaDTO) {
        this.empresaService.update(id, empresaDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @PatchMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        this.empresaService.delete(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
