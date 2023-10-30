package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Producto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findAllByOrderByIdAsc();
}