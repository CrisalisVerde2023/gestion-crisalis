package com.finnegans.gestioncrisalis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finnegans.gestioncrisalis.models.Suscripcion;

@Repository
public interface SuscripcionRepository extends JpaRepository<Suscripcion, Long> {
}
