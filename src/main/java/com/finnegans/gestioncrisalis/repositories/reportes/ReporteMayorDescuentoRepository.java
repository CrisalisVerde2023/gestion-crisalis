package com.finnegans.gestioncrisalis.repositories.reportes;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.finnegans.gestioncrisalis.views.ReporteMayorDescuento;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReporteMayorDescuentoRepository extends JpaRepository<ReporteMayorDescuento, Long> {
    @Query(value = "SELECT\n" +
            "\tROW_NUMBER() OVER (ORDER BY sq3.cliente, sq3.servicio, sq3.descuento DESC) AS id_nro,\n" +
            "\tsq3.*\n" +
            "FROM\n" +
            "\t(SELECT\n" +
            "\t\tcliente,\n" +
            "\t\tservicio,\n" +
            "\t\tid_orden,\n" +
            "\t\tmax(descuento) AS descuento\n" +
            "\tFROM (SELECT\n" +
            "\t\tfecha,\n" +
            "\t\tid_orden,\n" +
            "\t\tdescuento,\n" +
            "\t\tcliente,\n" +
            "\t\tROW_NUMBER() OVER (PARTITION BY sq.cliente ORDER BY sq.descuento DESC) AS servicioRow,\n" +
            "\t\tservicio\n" +
            "\t\tFROM\n" +
            "\t\t\t(SELECT \n" +
            "\t\t\t\tordenes.fecha_creacion AS fecha,\n" +
            "\t\t\t\tordenes.id AS id_orden,\n" +
            "\t\t\t\tSUM(od.descuento * od.cantidad) AS descuento,\n" +
            "\t\t\t\tproductos_servicios.nombre AS servicio,\n" +
            "\t\t\t\tCASE WHEN (empresas.nombre IS NULL) THEN personas.nombre || ' ' || personas.apellido ELSE empresas.nombre END AS cliente\n" +
            "\t\t\tFROM \n" +
            "\t\t\t\tpublic.orden_detalles od\n" +
            "\t\t\t\tINNER JOIN public.ordenes ON ordenes.id = od.orden_id\n" +
            "\t\t\t\tINNER JOIN public.descuentos ON descuentos.orden_id = ordenes.id\n" +
            "\t\t\t\tINNER JOIN public.clientes ON clientes.id = ordenes.cliente_id\n" +
            "\t\t\t\tINNER JOIN public.personas ON personas.id = clientes.persona_id\n" +
            "\t\t\t\tINNER JOIN public.productos_servicios ON productos_servicios.id = descuentos.servicio_id\n" +
            "\t\t\t\tLEFT JOIN public.empresas ON empresas.id = clientes.empresa_id\n" +
            "\t\t\tWHERE DATE(public.ordenes.fecha_creacion) BETWEEN :fecha_desde AND :fecha_hasta\n" +
            "\t\t\tGROUP BY \n" +
            "\t\t\t\tordenes.fecha_creacion,\n" +
            "\t\t\t\tid_orden,\n" +
            "\t\t\t\tcliente,\n" +
            "\t\t\t\tservicio\n" +
            "\t\t\t) AS sq) AS sq2\n" +
            "\tWHERE servicioRow = 1\n" +
            "\tGROUP BY\n" +
            "\t\tcliente,\n" +
            "\t\tservicio,\n" +
            "\t\tid_orden\n" +
            "\tORDER BY\n" +
            "\t\tcliente, servicio, descuento DESC) AS sq3\n" +
            "\t\tWHERE sq3.descuento > 0", nativeQuery = true)
    List<ReporteMayorDescuento> getMayorDescuento(@Param("fecha_desde") LocalDate fechaDesde, @Param("fecha_hasta") LocalDate fechaHasta);
}
