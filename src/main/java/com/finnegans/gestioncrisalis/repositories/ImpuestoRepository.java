package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Impuesto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImpuestoRepository extends JpaRepository<Impuesto, Long> {

    Optional<Impuesto> findByNombre(String nombre);

}
