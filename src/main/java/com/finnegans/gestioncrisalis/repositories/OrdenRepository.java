package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.dtos.request.OrdenEncabezadoDTO;
import com.finnegans.gestioncrisalis.models.Orden;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<Orden,Long>{
    Optional<Orden> findById(Long id);
    @Query("SELECT new com.finnegans.gestioncrisalis.dtos.request.OrdenEncabezadoDTO(ord.id, ord.fechaCreacion, CONCAT(per.nombre, ' ', per.apellido) AS persona, emp.nombre, count(CASE WHEN od.tipo = 'PRODUCTO' THEN 1 END) AS cantProds, count(CASE WHEN od.tipo = 'SERVICIO' THEN 1 END) AS cantServs, sum((od.costo - COALESCE(descuento, 0) + COALESCE((SELECT sum(odi.porcentaje) FROM OrdenDetalleImpuesto odi WHERE odi.ordenDetalle = od.id), 0) * od.costo / 100 + COALESCE(garantia_costo, 0) + COALESCE(servicio_soporte, 0)) * cantidad) AS total, ord.anulado) FROM Orden ord INNER JOIN OrdenDetalle od ON od.orden = ord.id INNER JOIN Cliente cli ON cli.id = ord.cliente INNER JOIN Persona per ON per.id = cli.persona LEFT JOIN Empresa emp ON emp.id = cli.empresa GROUP BY ord.id, ord.fechaCreacion, persona, emp.nombre, ord.anulado")
    List<OrdenEncabezadoDTO> getEncabezados();

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE ORDEN_DETALLES_IMPUESTOS odi SET NOMBRE = imp.NOMBRE, PORCENTAJE = imp.PORCENTAJE FROM IMPUESTOS imp WHERE ((imp.ID = odi.IMPUESTO_ID) AND ((odi.NOMBRE IS NULL) OR (odi.PORCENTAJE IS NULL)))")
    void fillOrdenDetalleImpuesto();
}