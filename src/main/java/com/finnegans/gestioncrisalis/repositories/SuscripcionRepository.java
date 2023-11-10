package com.finnegans.gestioncrisalis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.models.Suscripcion;
import java.util.List;

@Repository
public interface SuscripcionRepository extends JpaRepository<Suscripcion, Long> {
    List<Suscripcion> findAllByOrdenDetalleList(List<OrdenDetalle> ordenDetalles);
}
