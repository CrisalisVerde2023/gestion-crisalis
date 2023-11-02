package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.models.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
@Repository
public interface OrdenDetalleRepository extends JpaRepository<OrdenDetalle,Long> {

    List<OrdenDetalle> findByOrden(Long id);
}
