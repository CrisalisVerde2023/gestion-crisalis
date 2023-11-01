package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.models.Impuesto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImpuestoRepository extends JpaRepository<Impuesto, Long> {
}
