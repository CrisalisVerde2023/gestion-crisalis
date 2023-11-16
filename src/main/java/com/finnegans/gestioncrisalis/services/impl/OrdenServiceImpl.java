package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.OrdenDetalleDTO;
import com.finnegans.gestioncrisalis.dtos.request.OrdenEncabezadoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.*;
import com.finnegans.gestioncrisalis.repositories.*;
import com.finnegans.gestioncrisalis.services.OrdenService;
import com.finnegans.gestioncrisalis.services.SuscripcionService;

import org.springframework.stereotype.Service;
import com.finnegans.gestioncrisalis.dtos.OrdenDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdenServiceImpl implements OrdenService {
    private final OrdenRepository ordenRepository;
    private final OrdenDetalleRepository ordenDetalleRepository;
    private final ProductoRepository productRepository;
    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;
    private final SuscripcionService suscripcionService;

    public OrdenServiceImpl(OrdenRepository ordenRepository, ProductoRepository productRepository, OrdenDetalleRepository ordenDetalleRepository,ClienteRepository clienteRepository, UsuarioRepository usuarioRepository, SuscripcionService suscripcionService){
        this.ordenDetalleRepository = ordenDetalleRepository;
        this.productRepository = productRepository;
        this.ordenRepository = ordenRepository;
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
        this.suscripcionService = suscripcionService;
    }

    @Override
    public Orden generar(OrdenDTO ordenDTO, boolean provisorio) {
        Cliente cliente = (ordenDTO.getIdCliente() == null)
            ? null
            : clienteRepository.findById(ordenDTO.getIdCliente()).orElseThrow(()->new ResourceNotFound("No se encontró el cliente: " + ordenDTO.getIdCliente()));
        Usuario usuario = usuarioRepository.findById(ordenDTO.getIdUsuario()).orElseThrow(()->new ResourceNotFound("No se encontró el usuario: " + ordenDTO.getIdUsuario()));
        List<OrdenDetalle> detalles;

        //Creamos una orden en blanco
        Orden orden = new Orden(null, cliente, usuario, false, null, null);

        // Levantamos el listado de productos/servicios (OrdenDetalleDTO) solicitados desde el front
        List<OrdenDetalleDTO> detallesDTO = ordenDTO.getOrdenDetalles();

        // Obtengo los productos y servicios:
        List<Producto> productosServicios = productRepository.findAllById(detallesDTO.stream().map(OrdenDetalleDTO::getIdProductService).collect(Collectors.toList()));
        if (productosServicios.isEmpty()) throw new ResourceNotFound("No se encontraron productos/servicios que procesar");

        boolean tieneServiciosPedidos = productosServicios.stream().anyMatch(producto -> producto.getTipo().equals("SERVICIO"));
        boolean aplicaDescuento = (tieneServiciosPedidos || suscripcionService.tieneServiciosActivos(cliente));

        // Llamada al motor
        detalles = calculin(productosServicios, detallesDTO, aplicaDescuento, orden);

        // Provisorio indica si es solo cálculo (true) o si también hay que guardar el pedido calculado (false)
        orden.setOrdenDetalles(provisorio ? detalles : this.ordenDetalleRepository.saveAllAndFlush(detalles));

        if (!provisorio) { // Si no es provisorio completo los impuestos del detalle
            this.ordenRepository.fillOrdenDetalleImpuesto();
            
            if (tieneServiciosPedidos) // ... y hay servicios pedidos creo las suscripciones
                suscripcionService.createSubByOds(detalles.stream().filter(detalle -> detalle.getTipo().equals("SERVICIO")).collect(Collectors.toList()));
        }

        return provisorio ? orden : this.ordenRepository.saveAndFlush(orden);
    }

    @Override
    public List<OrdenEncabezadoDTO> getAll() {
        return this.ordenRepository.getEncabezados();
    }

    public Orden getById(Long id) {
        Orden orden = this.ordenRepository.findById(id)
                .orElseThrow(() -> new
                        ResourceNotFound("Orden no encontrada con id: " + id));
        return orden;
    }

    public void anular(Long id) {
        Orden orden = this.ordenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        orden.setAnulado(!orden.isAnulado());
        this.ordenRepository.save(orden);
    }

    // Motor de cálculo
    private List<OrdenDetalle> calculin(List<Producto> productosServicios, List<OrdenDetalleDTO> detallesDTO, boolean aplicaDescuento, Orden orden) {
        return productosServicios.stream().map(producto -> {
            OrdenDetalleDTO item = detallesDTO.stream().filter(detalleDTO -> detalleDTO.getIdProductService() == producto.getId()).findFirst().get();
            List<Impuesto> impuestosActivos = producto.getImpuestos().stream().filter(el -> !el.isEliminado()).collect(Collectors.toList());

            return new OrdenDetalle(
                null,
                orden,
                producto,
                producto.getTipo().equals("PRODUCTO") ? item.getCantidad() : 1,
                producto.getNombre(),
                producto.getCosto(),
                (producto.getTipo().equals("SERVICIO")) ? null : (aplicaDescuento) ? Math.round(producto.getCosto() * .1 * 100.0) / 100.0 : 0,
                producto.getSoporte() == null ? null : producto.getSoporte(),
                item.getGarantia(),
                (item.getGarantia() != null) ? (item.getGarantia() * .02 * producto.getCosto()) : null,
                false,
                producto.getTipo(),
                null,
                impuestosActivos,
                impuestosActivos.stream().map(el -> el.getPorcentaje()).reduce(0F, (a, b) -> a + b) * producto.getCosto() / 100
            );
        }).collect(Collectors.toList());
    }
}