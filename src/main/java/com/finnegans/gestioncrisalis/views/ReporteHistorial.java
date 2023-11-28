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
@Subselect("SELECT \r\n" + //
		"\tROW_NUMBER() OVER (ORDER BY sq1.cliente, sq1.nombre, sq1.orden) AS id_nro,\r\n" + //
		"\tsq1.*\r\n" + //
		"FROM\r\n" + //
		"\t(SELECT\r\n" + //
		"\t\tCASE WHEN (emp.nombre IS NULL) THEN per.nombre || ' ' || per.apellido ELSE emp.nombre END AS cliente,\r\n" + //
		"\tpro.nombre,\r\n" + //
		"\tsqOrden.id AS orden,\r\n" + //
		"\tsqOrden.anulado,\r\n" + //
		"\tsqOrden.fecha_creacion::date AS fecha,\r\n" + //
		"\tordDet.cantidad,\r\n" + //
		"\tordDet.costo,\r\n" + //
		"\t\tsqOrden.impuestos_orden,\r\n" + //
		"\t\tsqOrden.subtotal_orden\r\n" + //
		"\tFROM\r\n" + //
		"\t\t(SELECT\r\n" + //
		"\t\t\tord.id,\r\n" + //
		"\t\t\tord.anulado,\r\n" + //
		"\t\t\tord.fecha_creacion,\r\n" + //
		"\t\t \tord.cliente_id,\r\n" + //
		"\t\t\tsum(sq1.impuestos_orden) AS impuestos_orden,\r\n" + //
		"\t\t\tsum((sq1.costo - COALESCE(sq1.descuento, 0) + COALESCE(sq1.servicio_soporte, 0) + COALESCE(sq1.garantia_costo, 0)) * sq1.cantidad) AS subtotal_orden\r\n" + //
		"\t\tFROM ordenes ord\r\n" + //
		"\t\tINNER JOIN\r\n" + //
		"\t\t\t(SELECT\r\n" + //
		"\t\t\t\tod.id,\r\n" + //
		"\t\t\t\tod.costo,\r\n" + //
		"\t\t\t\tod.descuento,\r\n" + //
		"\t\t\t\tod.servicio_soporte,\r\n" + //
		"\t\t\t\tod.garantia_costo,\r\n" + //
		"\t\t\t\tod.cantidad,\r\n" + //
		"\t\t\t\tod.orden_id,\r\n" + //
		"\t\t\t\tsum(odi.porcentaje * (od.costo - COALESCE(od.descuento, 0) + COALESCE(od.servicio_soporte, 0) + COALESCE(od.garantia_costo, 0)) * od.cantidad / 100) AS impuestos_orden\r\n" + //
		"\t\t\tFROM orden_detalles od\r\n" + //
		"\t\t\tLEFT JOIN orden_detalles_impuestos odi ON odi.orden_detalle_id = od.id\r\n" + //
		"\t\t\tGROUP BY od.id, od.costo, od.descuento, od.servicio_soporte, od.garantia_costo, od.cantidad, od.orden_id) sq1\r\n" + //
		"\t\tON ord.id = sq1.orden_id\r\n" + //
		"\t\tGROUP BY ord.id\r\n" + //
		"\t\t) sqOrden\r\n" + //
		"\tINNER JOIN orden_detalles ordDet ON sqOrden.id = ordDet.orden_id\r\n" + //
		"\tINNER JOIN productos_servicios pro ON pro.id = ordDet.producto_id\r\n" + //
		"\tINNER JOIN clientes cli ON cli.id = sqOrden.cliente_id\r\n" + //
		"\tINNER JOIN personas per ON per.id = cli.persona_id\r\n" + //
		"\tLEFT JOIN empresas emp ON emp.id = cli.empresa_id\r\n" + //
		"\tGROUP BY cliente, pro.nombre, orden, sqOrden.anulado, fecha, ordDet.cantidad, ordDet.costo, sqOrden.impuestos_orden, sqOrden.subtotal_orden) sq1")
@Getter
public class ReporteHistorial{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
    private Long idNro;
    
    private String cliente;
    private String nombre;
	private Long orden;
    private Boolean anulado;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fecha;

	private Integer cantidad;
	private Float costo;
    private Double impuestosOrden;
    private Double subtotalOrden;
}