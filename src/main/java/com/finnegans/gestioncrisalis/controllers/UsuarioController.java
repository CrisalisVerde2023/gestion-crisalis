package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.UsuarioDTO;
import com.finnegans.gestioncrisalis.services.UsuarioService;
import com.finnegans.gestioncrisalis.validations.UsuarioOnCreate;
import com.finnegans.gestioncrisalis.validations.UsuarioOnUpdate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.constraints.PositiveOrZero;
import java.io.UnsupportedEncodingException;

@RestController
@Validated
@RequestMapping("/api/usuarios")
public class UsuarioController {
    private final UsuarioService usuarioService;
    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }
    @PostMapping
    public ResponseEntity<?> create(@Validated({UsuarioOnCreate.class}) @RequestBody UsuarioDTO usuarioDTO) throws MessagingException, UnsupportedEncodingException {
        this.usuarioService.save(usuarioDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<?> getAll(){
        return new ResponseEntity<>(this.usuarioService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable @PositiveOrZero Long id){
        return new ResponseEntity<>(this.usuarioService.getById(id), HttpStatus.OK);
    }
    @PostMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable @PositiveOrZero Long id,
                                    @RequestBody @Validated(UsuarioOnUpdate.class) UsuarioDTO usuarioDTO){
        this.usuarioService.update(id, usuarioDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PatchMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable @PositiveOrZero Long id){
        this.usuarioService.delete(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
