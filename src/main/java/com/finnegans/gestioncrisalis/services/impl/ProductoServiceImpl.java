package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ProductoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Impuesto;
import com.finnegans.gestioncrisalis.models.Producto;
import com.finnegans.gestioncrisalis.repositories.ImpuestoRepository;
import com.finnegans.gestioncrisalis.repositories.ProductoRepository;
import com.finnegans.gestioncrisalis.services.ProductoService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository productoRepository;
    private final ImpuestoRepository impuestoRepository;

    // Inyección de dependencias
    public ProductoServiceImpl(ProductoRepository productoRepository, ImpuestoRepository impuestoRepository) {

        this.productoRepository = productoRepository;
        this.impuestoRepository = impuestoRepository;

    }

    // Crear y Modificar
    @Override
    public Producto guardar(Long id, ProductoDTO productoDTO) {
        Producto producto = (id != null)
            ? this.productoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id)
            )
            : new Producto();

        if (productoDTO.getNombre() != null) producto.setNombre(productoDTO.getNombre());
        if (productoDTO.getCosto() != null) producto.setCosto(productoDTO.getCosto());
        if (id == null) producto.setTipo(productoDTO.getTipo());

        producto.setSoporte(
            (!producto.getTipo().equals("SERVICIO")) ? null
                : (productoDTO.getSoporte() != null)
                    ? productoDTO.getSoporte()
                    : (producto.getSoporte() == null) ? 0 : producto.getSoporte()
        );

        if (productoDTO.getIdImpuestos() != null) {
            producto.setImpuestos(new ArrayList<>());//Instancio la lista de impuestos porque si es null no me deja agregarle elementos
            productoDTO.getIdImpuestos().forEach(
                (idImpuesto) -> {
                    Impuesto impuesto = this.impuestoRepository.findById(idImpuesto).orElseThrow(
                            () -> new ResourceNotFound("Impuesto no encontrado con id: " + idImpuesto));
                    //Si se llega a necesitar que no se carguen impuestos eliminados descomentar esta linea, por lo pronto para la lógica de desactivación
                    //Que poseen los impuestos no parece necesario ya que se comprobará la vigencia del impuesto en el momento de la venta
                    //if(impuesto.isEliminado()) throw new ResourceNotFound("El impuesto "+impuesto.getNombre()+" está eliminado");
                    producto.getImpuestos().add(impuesto);
                }
            );
        }


        return this.productoRepository.save(producto);
    }

    // Alternar estado
    @Override
    public Producto alternarEstado(Long id) {
        Producto producto = this.productoRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id));

        producto.setEliminado(!producto.isEliminado());

        return this.productoRepository.save(producto);
    }

    // Eliminar
    @Override
    public void eliminar(Long id) {
        this.productoRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id));
        this.productoRepository.deleteById(id);
    }

    // Listar
    @Override
    public Producto obtener(Long id) {
        return this.productoRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Producto o Servicio no encontrado con id: " + id));
    }
    @Override
    public List<Producto> obtener() {
        return this.productoRepository.findAllByOrderByIdAsc();
    }
}