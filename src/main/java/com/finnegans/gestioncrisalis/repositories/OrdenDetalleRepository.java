package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdenDetalleRepository extends JpaRepository<OrdenDetalle,Long> {
    List<OrdenDetalle> findByOrden(Long id);
}
