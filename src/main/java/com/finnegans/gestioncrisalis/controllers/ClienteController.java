package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.ClienteDTO;
import com.finnegans.gestioncrisalis.repositories.ClienteRepository;
import com.finnegans.gestioncrisalis.services.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
