package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.OrdenDetalleDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.models.Orden;
import com.finnegans.gestioncrisalis.models.Producto;
import com.finnegans.gestioncrisalis.models.OrdenDetalle;
import com.finnegans.gestioncrisalis.repositories.*;
import com.finnegans.gestioncrisalis.services.OrdenService;
import org.springframework.stereotype.Service;
import com.finnegans.gestioncrisalis.dtos.OrdenDTO;

import java.util.List;

@Service
public class OrdenServiceImpl implements OrdenService {
    private final OrdenRepository ordenRepository;
    private final OrdenDetalleRepository ordenDetalleRepository;
    private final ProductoRepository productRepository;

    private final ClienteRepository clienteRepository;

    private final UsuarioRepository usuarioRepository;

    private final List<OrdenDetalle> detalles = null;
    public OrdenServiceImpl(OrdenRepository ordenRepository, ProductoRepository productRepository, OrdenDetalleRepository ordenDetalleRepository,ClienteRepository clienteRepository, UsuarioRepository usuarioRepository){
        this.ordenDetalleRepository = ordenDetalleRepository;
        this.productRepository = productRepository;
        this.ordenRepository = ordenRepository;
        this.clienteRepository = clienteRepository;
        this.usuarioRepository = usuarioRepository;
    }
    @Override
    public Orden save(OrdenDTO ordenDTO) {
        //Creamos una orden y una lista de detalles de orden
        Orden orden = new Orden(null,clienteRepository.findById(ordenDTO.getIdCliente()),usuarioRepository.findById(ordenDTO.getIdUsuario()),false,null,null);

        List<OrdenDetalleDTO> detallesDTO = ordenDTO.getOrdenDetalles();

        for(OrdenDetalleDTO item: detallesDTO) {
            //Traemos el producto correspondiente al detalle de orden
            Producto producto = productRepository.findById(item.getIdProductService()).orElseThrow(()->new ResourceNotFound("No se encontro el producto: "+ item.getIdProductService()));

            //Seteamos el detalle de orden con el dto, mas los campos que debemos agregar
            OrdenDetalle detalle = new OrdenDetalle(
                    null,
                    orden,
                    producto,
                    item.getQuantity(),
                    producto.getNombre(),
                    producto.getCosto(),
                    (Double) (producto.getCosto() * .21), // El tax deberia obtenerse en base al cost y los impuestos del Product. Algo así: product.sum(taxes) * product.getCost()
                    (Double) (producto.getCosto() * .1), // El discount deberia obtenerse en base a porcentaje de regla de negocio y si el cliente tiene servicios contratados o en este detalle hay algun servicio.
                    producto.getSoporte(), // En el caso de que sea un servicio se pasa esto, si no null
                    item.getTiempoGarantia(),
                    (item.getTiempoGarantia() != null) ? (Double) (item.getTiempoGarantia() * .02 * producto.getCosto()) : 0, // El cost de gtia. por regla de negocio, costo de producto y años de gtia.
                    false
            );

            detalles.add(detalle);
        }
        orden.setOrdenDetalles(detalles);

        return this.ordenRepository.save(orden);
    }

    @Override
    public List<Orden> getAll() {
        List<Orden> ordenes = this.ordenRepository.findAll();
        return ordenes;
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
