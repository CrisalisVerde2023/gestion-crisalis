package com.finnegans.gestioncrisalis.repositories.reportes;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finnegans.gestioncrisalis.views.ReporteServicioMayorDescuento;

@Repository
public interface ReporteServicioMayorDescuentoRepository extends JpaRepository<ReporteServicioMayorDescuento, Long> {
    @Query(value = "SELECT\r\n" + //
            "\tROW_NUMBER() OVER (ORDER BY sq2.cliente, sq2.descuento DESC) AS id,\r\n" + //
            "\tsq2.*\r\n" + //
            "FROM(\r\n" + //
            "\tSELECT\r\n" + //
            "\t\tRANK() OVER (PARTITION BY sq1.cliente ORDER BY sq1.descuento DESC) AS rnk,\r\n" + //
            "\t\tsq1.*\r\n" + //
            "\tFROM(\r\n" + //
            "\t\tSELECT\r\n" + //
            "\t\t\tCASE WHEN (emp.nombre IS NULL) THEN per.nombre || ' ' || per.apellido ELSE emp.nombre END AS cliente,\r\n" + //
            "\t\t\tser.nombre AS servicio,\r\n" + //
            "\t\t\tSUM(ordDet.descuento * ordDet.cantidad) AS descuento\r\n" + //
            "\t\tFROM ordenes ord\r\n" + //
            "\t\t\tINNER JOIN orden_detalles ordDet ON ord.id = ordDet.orden_id\r\n" + //
            "\t\t\tINNER JOIN descuentos des ON des.orden_id = ord.id\r\n" + //
            "\t\t\tINNER JOIN productos_servicios ser ON ser.id = des.servicio_id\r\n" + //
            "\t\t\tINNER JOIN clientes cli ON cli.id = ord.cliente_id\r\n" + //
            "\t\t\tINNER JOIN personas per ON per.id = cli.persona_id\r\n" + //
            "\t\t\tLEFT JOIN empresas emp ON emp.id = cli.empresa_id\r\n" + //
            "\t\tWHERE DATE(ord.fecha_creacion) BETWEEN :fecha_desde AND :fecha_hasta\r\n" + //
            "\t\tGROUP BY cliente, servicio\r\n" + //
            "\t\tORDER BY descuento DESC) AS sq1) AS sq2\r\n" + //
            "WHERE sq2.rnk = 1 AND sq2.descuento > 0", nativeQuery = true)
    List<ReporteServicioMayorDescuento> getServicioMayorDescuento(@Param("fecha_desde") LocalDate fechaDesde, @Param("fecha_hasta") LocalDate fechaHasta);
}