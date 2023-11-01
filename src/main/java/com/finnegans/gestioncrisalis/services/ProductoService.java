package com.finnegans.gestioncrisalis.services;

import java.util.List;

import com.finnegans.gestioncrisalis.dtos.ProductoDTO;
import com.finnegans.gestioncrisalis.models.Producto;

public interface ProductoService {
    Producto guardar(Long id, ProductoDTO productoDTO);
    void eliminar(Long id);
    Producto alternarEstado(Long id);
    Producto obtener(Long id);
    List<Producto> obtener();
}