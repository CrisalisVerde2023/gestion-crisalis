package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Orden;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<Orden,Long>{
    Optional<Orden> findById(Long id);
}
