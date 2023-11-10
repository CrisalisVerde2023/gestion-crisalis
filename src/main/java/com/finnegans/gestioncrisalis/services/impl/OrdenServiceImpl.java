package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.OrdenDetalleDTO;
import com.finnegans.gestioncrisalis.dtos.request.OrdenEncabezadoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.*;
import com.finnegans.gestioncrisalis.repositories.*;
import com.finnegans.gestioncrisalis.services.OrdenService;
import org.springframework.stereotype.Service;
import com.finnegans.gestioncrisalis.dtos.OrdenDTO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class OrdenServiceImpl implements OrdenService {
    private final OrdenRepository ordenRepository;
    private final OrdenDetalleRepository ordenDetalleRepository;
    private final ProductoRepository productRepository;
    private final ClienteRepository clienteRepository;
    private final UsuarioRepository usuarioRepository;

    public OrdenServiceImpl(OrdenRepository ordenRepository, ProductoRepository productRepository, OrdenDetalleRepository ordenDetalleRepository,ClienteRepository clienteRepository, UsuarioRepository usuarioRepository){
        this.ordenDetalleRepository = ordenDetalleRepository;
        this.productRepository = productRepository;
        this.ordenRepository = ordenRepository;
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
    }
    @Override
    public Orden generar(OrdenDTO ordenDTO, boolean provisorio) {
        Cliente cliente = clienteRepository.findById(ordenDTO.getIdCliente()).orElseThrow(()->new ResourceNotFound("No se encontró el cliente: "+ ordenDTO.getIdCliente()));
        Usuario usuario = usuarioRepository.findById(ordenDTO.getIdUsuario()).orElseThrow(()->new ResourceNotFound("No se encontró el usuario: "+ ordenDTO.getIdUsuario()));
        List<OrdenDetalle> detalles = new ArrayList<>();

        // Levantamos el listado de productos/servicios (OrdenDetalleDTO) solicitados desde el front
        List<OrdenDetalleDTO> detallesDTO = ordenDTO.getOrdenDetalles();

        //Creamos una orden y una lista de detalles de orden
        Orden orden = new Orden(null, cliente, usuario, false, null, null);

        // Antes de correr el motor habría que obtener los Productos/servicios por id, definir los nuevos serviciosActivos totales y pasar el boolean de !serviciosActivos.isEmpty() al motor.

        // Obtener serviciosActivos del Cliente
        //servicioSuscripciones.getServiciosActivosPorCliente(cliente.)

            /*
            
            cliente.getEmpresa() != null => Empresa;
            cliente.getEmpresa() == null => Persona;

            cliente.getEmpresa() != null => Empresa {
                empresa = cliente.getEmpresa();
                clientesTodos = empresa.getClientes();

                for clientesTodos -> .getOrdenes();
                    for ordenes -> .orderDetalles
                        .filtra orderDetalles por tipo == "SERVICIO".
                            .getSuscripcion() . filtrar por Activos
                                .getOrderDetalle.productoServicio.getId()
            }
            */
        
        // Motor (List<Productos> productos, detallesDTO, boolean tieneServiciosActivos)
        // Cambiar la lógica: Buscar todos los productos por IDs e iterar sobre eso, luego iterar el detallesDTO para buscar los datos del item correspondiente (hacerlo modulado).
        for(OrdenDetalleDTO item: detallesDTO) {
            boolean tieneServiciosActivos = false;

            //Traemos el producto correspondiente al detalle de orden
            Producto producto = productRepository.findById(item.getIdProductService()).orElseThrow(()->new ResourceNotFound("No se encontró el producto: "+ item.getIdProductService()));

            //Seteamos el detalle de orden con el dto, mas los campos que debemos agregar
            detalles.add(new OrdenDetalle(
                null,
                orden,
                producto,
                item.getCantidad(),
                producto.getNombre(),
                producto.getCosto(),
                producto.getImpuestos().stream().mapToDouble(imp -> imp.getPorcentaje()).sum() * producto.getCosto(), // Provisorio hasta implementar la tabla de Impuestos de OrderDetail.
                ((producto.getTipo().equals("PRODUCTO")) && (tieneServiciosActivos)) ? (producto.getCosto() * .1) : 0,
                producto.getSoporte() == null ? 0 : producto.getSoporte(), // En el caso de que sea un servicio se pasa esto, si no null
                item.getGarantia(),
                (item.getGarantia() != null) ? (item.getGarantia() * .02 * producto.getCosto()) : 0,
                false,
                producto.getTipo()
            ));
        }

        // Fin motor

        orden.setOrdenDetalles(this.ordenDetalleRepository.saveAllAndFlush(detalles));
        return orden; //this.ordenRepository.save(orden);

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
}