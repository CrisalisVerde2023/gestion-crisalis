package com.finnegans.gestioncrisalis.repositories;

import com.finnegans.gestioncrisalis.dtos.request.OrdenEncabezadoDTO;
import com.finnegans.gestioncrisalis.models.Orden;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdenRepository extends JpaRepository<Orden,Long>{
    Optional<Orden> findById(Long id);
    @Query("SELECT new com.finnegans.gestioncrisalis.dtos.request.OrdenEncabezadoDTO((SELECT count(ordDet.id) FROM OrdenDetalle ordDet INNER JOIN Producto proser ON proser.id = ordDet.productoServicio WHERE proser.tipo = 'SERVICIO' AND ordDet.orden = ord.id) AS cantServs, (SELECT count(ordDet.id) FROM OrdenDetalle ordDet INNER JOIN Producto proser ON proser.id = ordDet.productoServicio WHERE proser.tipo = 'PRODUCTO' AND ordDet.orden = ord.id) AS cantProds, ord.id AS id, ord.fechaCreacion, ord.anulado, CONCAT(per.nombre, ' ', per.apellido) AS persona, emp.nombre, sum((od.costo - descuento + impuesto + garantia_costo) * cantidad) AS total) FROM Orden ord INNER JOIN OrdenDetalle od ON od.orden = ord.id INNER JOIN Cliente cli ON cli.id = ord.cliente INNER JOIN Persona per ON per.id = cli.persona LEFT JOIN Empresa emp ON emp.id = cli.empresa GROUP BY cantServs, cantProds, ord.id, ord.fechaCreacion, ord.anulado, persona, emp.nombre")
    List<OrdenEncabezadoDTO> metodoPrueba();
}