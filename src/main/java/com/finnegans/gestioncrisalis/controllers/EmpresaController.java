package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import com.finnegans.gestioncrisalis.services.EmpresaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {
    private final EmpresaService empresaService;

    public EmpresaController(EmpresaService empresaService){
        this.empresaService = empresaService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody EmpresaDTO empresaDTO) {
        this.empresaService.save(empresaDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(this.empresaService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id){
        return new ResponseEntity<>(this.empresaService.getById(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody EmpresaDTO empresaDTO){
        this.empresaService.update(id, empresaDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id){
        this.empresaService.delete(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
