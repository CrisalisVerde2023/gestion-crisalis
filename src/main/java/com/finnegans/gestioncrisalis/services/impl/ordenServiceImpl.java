package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ordenDetalleDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Orden;
import com.finnegans.gestioncrisalis.models.ordenDetalle;
import com.finnegans.gestioncrisalis.services.OrdenService;
import org.springframework.stereotype.Service;
import com.finnegans.gestioncrisalis.dtos.ordenDTO;
import com.finnegans.gestioncrisalis.repositories.OrdenRepository;
import com.finnegans.gestioncrisalis.repositories.OrdenDetalleRepository;

import java.util.List;

@Service
public class ordenServiceImpl implements OrdenService {
    private final OrdenRepository ordenRepository;
    private final OrdenDetalleRepository ordenDetalleRepository;
    private final ProductRepository productRepository;

    private final List<ordenDetalle> detalles = null;
    public ordenServiceImpl(OrdenRepository ordenRepository, ProductRepository productRepository, OrdenDetalleRepository ordenDetalleRepository){
        this.ordenDetalleRepository = ordenDetalleRepository;
        this.productRepository = productRepository;
        this.ordenRepository = ordenRepository;
    }
    @Override
    public Orden save(ordenDTO ordenDTO) {
        //Creamos una orden y una lista de detalles de orden
        Orden orden = new Orden(null,ordenDTO.getIdCliente(),ordenDTO.getIdUsuario(),false,null,null);

        List<ordenDetalleDTO> detallesDTO = ordenDTO.getOrdenDetalles();

        for(ordenDetalleDTO item: detallesDTO) {
            //Traemos el producto correspondiente al detalle de orden
            productService producto = productRepository.findById(item.getIdProductService());

            //Seteamos el detalle de orden con el dto, mas los campos que debemos agregar
            ordenDetalle detalle = new ordenDetalle(
                    null,
                    orden,
                    producto,
                    item.getQuantity(),
                    producto.getName(),
                    producto.getCost(),
                    (float) (producto.getCost() * .21), // El tax deberia obtenerse en base al cost y los impuestos del Product. Algo así: product.sum(taxes) * product.getCost()
                    (float) (producto.getCost() * .1), // El discount deberia obtenerse en base a porcentaje de regla de negocio y si el cliente tiene servicios contratados o en este detalle hay algun servicio.
                    producto.getSupport(), // En el caso de que sea un servicio se pasa esto, si no null
                    item.getWarranty_years(),
                    (item.getWarranty_years() != null) ? (float) (item.getWarranty_years() * .02 * producto.getCost()) : 0 // El cost de gtia. por regla de negocio, costo de producto y años de gtia.
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

    @Override
    public Orden getById(Long id) {
        Orden orden = this.ordenRepository.findById(id)
                .orElseThrow(() -> new
                        ResourceNotFound("Orden no encontrada con id: " + id));
        return orden;
    }
/*
    @Override
    public void anular(Long id) {
        Orden orden = this.ordenRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        orden.setOrden(!orden.isEliminado());

        this.ordenRepository.save(orden);
    }*/
}
