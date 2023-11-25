package com.finnegans.gestioncrisalis.views;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import org.hibernate.annotations.Subselect;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Subselect(
        "SELECT " + //
                "ROW_NUMBER() OVER (ORDER BY sq1.cliente, sq1.servicio, sq1.descuento DESC) AS id_nro, " +
                "sq1.* " +
                "FROM " +
                "(SELECT " +
                "CASE WHEN (emp.nombre IS NULL) THEN per.nombre || ' ' || per.apellido ELSE emp.nombre END AS cliente, " +
                "ser.nombre AS servicio, " +
                "ord.fecha_creacion::date AS fecha, " +
                "sum(ordDet.descuento * ordDet.cantidad) AS descuento " +
                "FROM ordenes ord " +
                "INNER JOIN orden_detalles ordDet ON ord.id = ordDet.orden_id " +
                "INNER JOIN descuentos des ON des.orden_id = ord.id " +
                "INNER JOIN productos_servicios ser ON ser.id = des.servicio_id " +
                "INNER JOIN clientes cli ON cli.id = ord.cliente_id " +
                "INNER JOIN personas per ON per.id = cli.persona_id " +
                "LEFT JOIN empresas emp ON emp.id = cli.empresa_id " +
                "GROUP BY cliente, servicio, fecha " +
                "ORDER BY cliente, servicio, descuento DESC) sq1")
@Data
public class ReporteDescuento{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long idNro;

    private String cliente;
    private String servicio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fecha;

    private Double descuento;
}
