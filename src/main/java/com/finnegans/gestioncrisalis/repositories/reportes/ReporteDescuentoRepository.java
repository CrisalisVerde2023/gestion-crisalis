package com.finnegans.gestioncrisalis.repositories.reportes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finnegans.gestioncrisalis.views.ReporteDescuento;

@Repository
public interface ReporteDescuentoRepository extends JpaRepository<ReporteDescuento, Long> {
}
