package com.finnegans.gestioncrisalis.views;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Subselect;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;

@Entity
@Subselect(
        "SELECT\n" +
                "\tid_nro,\n" +
                "\tcliente,\n" +
                "\tservicio,\n" +
                "\tid_orden,\n" +
                "\tmax(descuento) AS descuento\n" +
                "FROM (SELECT\n" +
                "\tfecha,\n" +
                "\tid_orden,\n" +
                "\tdescuento,\n" +
                "\tcliente,\n" +
                "\tROW_NUMBER() OVER (PARTITION BY sq.cliente, sq.id_orden ORDER BY sq.cliente, sq.id_orden DESC) AS id_nro,\n" +
                "\tservicio\n" +
                "\tFROM\n" +
                "\t\t(SELECT \n" +
                "\t\t\tordenes.fecha_creacion AS fecha,\n" +
                "\t\t\tordenes.id AS id_orden,\n" +
                "\t\t\tSUM(od.descuento) AS descuento,\n" +
                "\t\t\tproductos_servicios.nombre AS servicio,\n" +
                "\t\t\tCASE WHEN (empresas.nombre IS NULL) THEN personas.nombre || ' ' || personas.apellido ELSE empresas.nombre END AS cliente\n" +
                "\t\tFROM \n" +
                "\t\t\tpublic.orden_detalles od\n" +
                "\t\t\tINNER JOIN public.ordenes ON ordenes.id = od.orden_id\n" +
                "\t\t\tINNER JOIN public.descuentos ON descuentos.orden_id = ordenes.id\n" +
                "\t\t\tINNER JOIN public.clientes ON clientes.id = ordenes.cliente_id\n" +
                "\t\t\tINNER JOIN public.personas ON personas.id = clientes.persona_id\n" +
                "\t\t\tINNER JOIN public.productos_servicios ON productos_servicios.id = descuentos.servicio_id\n" +
                "\t\t\tLEFT JOIN public.empresas ON empresas.id = clientes.empresa_id\n" +
                "\t\tWHERE public.ordenes.fecha_creacion::date BETWEEN '20231101' AND '20231124'\n" +
                "\t\tGROUP BY \n" +
                "\t\t\tordenes.fecha_creacion,\n" +
                "\t\t\tid_orden,\n" +
                "\t\t\tcliente,\n" +
                "\t\t\tservicio\n" +
                "\t\t) AS sq) AS sq2\n" +
                "WHERE id_nro = 1\n" +
                "GROUP BY\n" +
                "\tid_nro,\n" +
                "\tcliente,\n" +
                "\tservicio,\n" +
                "\tid_orden" )
@Getter
public class ReporteMayorDescuento{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long idNro;

    private String cliente;
    private String servicio;

    private Long idOrden;

    private Double descuento;
}
