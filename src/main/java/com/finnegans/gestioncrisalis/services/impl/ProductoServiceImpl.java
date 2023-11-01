package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ProductoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Producto;
import com.finnegans.gestioncrisalis.repositories.ProductoRepository;
import com.finnegans.gestioncrisalis.services.ProductoService;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository productoRepository;

    // Inyección de dependencias
    public ProductoServiceImpl(ProductoRepository productoRepository){
        this.productoRepository = productoRepository;
    }

    // Crear y Modificar
    @Override
    public Producto guardar(Long id, ProductoDTO productoDTO) {
        Producto producto = (id != null)
            ? this.productoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id)
            )
            : new Producto();

        if (productoDTO.getNombre() != null) producto.setNombre(productoDTO.getNombre());
        if (productoDTO.getCosto() != null) producto.setCosto(productoDTO.getCosto());
        if (id == null) producto.setTipo(productoDTO.getTipo());

        producto.setSoporte(
            (!producto.getTipo().equals("SERVICIO")) ? null
                : (productoDTO.getSoporte() != null)
                    ? productoDTO.getSoporte()
                    : (producto.getSoporte() == null) ? 0 : producto.getSoporte()
        );

        return this.productoRepository.save(producto);
    }

    // Alternar estado
    @Override
    public Producto alternarEstado(Long id) {
        Producto producto = this.productoRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id));

        producto.setEliminado(!producto.isEliminado());

        return this.productoRepository.save(producto);
    }

    // Eliminar
    @Override
    public void eliminar(Long id) {
        this.productoRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id));
        this.productoRepository.deleteById(id);
    }

    // Listar
    @Override
    public Producto obtener(Long id) {
        return this.productoRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id));
    }
    @Override
    public List<Producto> obtener() {
        return this.productoRepository.findAllByOrderByIdAsc();
    }
}