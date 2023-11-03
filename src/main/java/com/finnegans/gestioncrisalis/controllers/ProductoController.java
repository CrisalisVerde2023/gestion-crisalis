package com.finnegans.gestioncrisalis.controllers;

import com.finnegans.gestioncrisalis.dtos.ProductoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.InvalidDataException;
import com.finnegans.gestioncrisalis.exceptions.custom.MissingDataException;
import com.finnegans.gestioncrisalis.services.ProductoService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/api/prods_servs")
public class ProductoController {
    private final ProductoService productoService;

    // Inyección de dependencias
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // Listar todos
    @GetMapping()
    public ResponseEntity<?> obtener() {
        return new ResponseEntity<>(this.productoService.obtener(), HttpStatus.OK);
    }

    // Listar uno
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> obtener(@PathVariable @Positive Long id) {
        return new ResponseEntity<>(this.productoService.obtener(id), HttpStatus.OK);
    }

    // Crear
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> guardar(@RequestBody @Valid ProductoDTO productoDTO) {
        this.checkDTO(productoDTO, true);

        return new ResponseEntity<>(this.productoService.guardar(null, productoDTO), HttpStatus.CREATED);
    }

    // Modificar
    @PostMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> guardar(@PathVariable @Positive Long id, @RequestBody @Valid ProductoDTO productoDTO) {
        this.checkDTO(productoDTO, false);

        return new ResponseEntity<>(this.productoService.guardar(id, productoDTO), HttpStatus.OK);
    }

    // Alternar estado
    @PatchMapping(value = "/{id}")
    public ResponseEntity<?> alternarEstado(@PathVariable @Positive @NotNull Long id) {
        return new ResponseEntity<>(this.productoService.alternarEstado(id), HttpStatus.OK);
    }

    // Eliminar
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable @Positive Long id) {
        this.productoService.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Validar DTO
    private void checkDTO(ProductoDTO dto, boolean isForCreate) {
        if ((isForCreate) && ((dto.getNombre() == null) || (dto.getTipo() == null) || (dto.getCosto() == null)))
            throw new MissingDataException("Campo obligatorio faltante");

        if (
            ((dto.getNombre() != null) && ((dto.getNombre().isBlank())))
            || ((isForCreate) && (!dto.getTipo().equals("PRODUCTO")) && (!dto.getTipo().equals("SERVICIO")))
        )
            throw new InvalidDataException("Datos incorrectos o inválidos");
    }
}