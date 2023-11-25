package com.finnegans.gestioncrisalis.views;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.Subselect;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;

@Entity
@Subselect(
    "SELECT " +
    	"ROW_NUMBER() OVER (ORDER BY sq1.cliente, sq1.nombre, sq1.orden) AS id_nro, " +
	    "sq1.* " +
    "FROM " +
        "(SELECT " +
	        "CASE WHEN (emp.nombre IS NULL) THEN per.nombre || ' ' || per.apellido ELSE emp.nombre END AS cliente, " +
	        "pro.nombre, " +
	        "ord.id AS orden, " +
	        "ord.anulado, " +
	        "ord.fecha_creacion::date AS fecha, " +
	        "ordDet.cantidad, " +
	        "ordDet.costo, " +
	        "sum(odi.porcentaje) * ordDet.costo / 100 AS impuestos " +
        "FROM ordenes ord " +
    	    "INNER JOIN orden_detalles ordDet ON ord.id = ordDet.orden_id " +
	        "INNER JOIN productos_servicios pro ON pro.id = ordDet.producto_id " +
	        "INNER JOIN clientes cli ON cli.id = ord.cliente_id " +
    	    "INNER JOIN personas per ON per.id = cli.persona_id " +
	        "INNER JOIN orden_detalles_impuestos odi ON odi.orden_detalle_id = ordDet.id " +
	        "LEFT JOIN empresas emp ON emp.id = cli.empresa_id " + 
    "GROUP BY cliente, pro.nombre, orden, ord.anulado, fecha, ordDet.cantidad, ordDet.costo) sq1")
@Getter
public class ReporteHistorial{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
    private Long idNro;
    
    private String cliente;
    private String nombre;
    private Boolean anulado;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fecha;

	private Float costo;
	private Integer cantidad;
    private Double impuestos;
}