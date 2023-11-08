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
    public Orden save(OrdenDTO ordenDTO) {
        Cliente cliente = clienteRepository.findById(ordenDTO.getIdCliente()).orElseThrow(()->new ResourceNotFound("No se encontro el cliente: "+ ordenDTO.getIdCliente()));

        List<OrdenDetalle> detalles = new ArrayList<>();

        Usuario usuario = usuarioRepository.findById(ordenDTO.getIdUsuario()).orElseThrow(()->new ResourceNotFound("No se encontro el usuario: "+ ordenDTO.getIdUsuario()));

        //Creamos una orden y una lista de detalles de orden
        Orden orden = new Orden(null, cliente, usuario, false, null, null);


        List<OrdenDetalleDTO> detallesDTO = ordenDTO.getOrdenDetalles();

        for(OrdenDetalleDTO item: detallesDTO) {
            //Traemos el producto correspondiente al detalle de orden
            Producto producto = productRepository.findById(item.getIdProductService()).orElseThrow(()->new ResourceNotFound("No se encontro el producto: "+ item.getIdProductService()));

            //Seteamos el detalle de orden con el dto, mas los campos que debemos agregar
            detalles.add(new OrdenDetalle(
                    null,
                    orden,
                    producto,
                    item.getCantidad(),
                    producto.getNombre(),
                    producto.getCosto(),
                    producto.getCosto() * .21, // El tax deberia obtenerse en base al cost y los impuestos del Product. Algo así: product.sum(taxes) * product.getCost()
                    0.0, // El discount deberia obtenerse en base a porcentaje de regla de negocio y si el cliente tiene servicios contratados o en este detalle hay algun servicio.
                    producto.getSoporte() == null ? 0 : producto.getSoporte(), // En el caso de que sea un servicio se pasa esto, si no null
                    item.getGarantia(),
                    (item.getGarantia() != null) ? (item.getGarantia() * .02 * producto.getCosto()) : 0, // El cost de gtia. por regla de negocio, costo de producto y años de gtia.
                    false,
                    producto.getTipo()
            ));
        }

        orden.setOrdenDetalles(this.ordenDetalleRepository.saveAllAndFlush(detalles));
        return this.ordenRepository.save(orden);

    }

    @Override
    public List<OrdenEncabezadoDTO> getAll() {
        return this.ordenRepository.metodoPrueba();
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