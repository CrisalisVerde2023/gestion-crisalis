package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.ClienteDTO;
import com.finnegans.gestioncrisalis.repositories.ClienteRepository;
import com.finnegans.gestioncrisalis.services.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;


    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody ClienteDTO clienteDTO) {
        return new ResponseEntity<>(this.clienteService.save(clienteDTO), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return new ResponseEntity<>(this.clienteService.getById(id), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(this.clienteService.getAll(), HttpStatus.OK);
    }
    @PostMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ClienteDTO clienteDTO){
        return new ResponseEntity<>(this.clienteService.update(id, clienteDTO), HttpStatus.OK);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        return new ResponseEntity<>(this.clienteService.delete(id), HttpStatus.ACCEPTED);
    }
}
