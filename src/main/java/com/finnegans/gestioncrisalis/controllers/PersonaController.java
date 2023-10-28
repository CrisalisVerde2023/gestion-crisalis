package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.PersonaDTO;
import com.finnegans.gestioncrisalis.services.PersonaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.PositiveOrZero;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {

    private final PersonaService personaService;

    public PersonaController(PersonaService personaService){
        this.personaService = personaService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody PersonaDTO personaDTO){
        return new ResponseEntity<>(this.personaService.save(personaDTO),HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {return new ResponseEntity<>(this.personaService.getAll(), HttpStatus.OK);}

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable @PositiveOrZero Long id){
        return new ResponseEntity<>(this.personaService.getById(id), HttpStatus.OK);
    }

    @PostMapping("{id}")
    public ResponseEntity<?> update(@PathVariable @PositiveOrZero Long id, @RequestBody PersonaDTO personaDTO){
        personaService.update(id, personaDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PatchMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable @PositiveOrZero Long id){
        this.personaService.delete(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

}
