package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ImpuestoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Impuesto;
import com.finnegans.gestioncrisalis.repositories.ImpuestoRepository;
import com.finnegans.gestioncrisalis.services.ImpuestoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImpuestoServiceImpl implements ImpuestoService {

    private final ImpuestoRepository impuestoRepository;

    public ImpuestoServiceImpl(ImpuestoRepository impuestoRepository) {
        this.impuestoRepository = impuestoRepository;
    }

    @Override
    public Impuesto save(ImpuestoDTO impuestoDTO) {
        Impuesto impuesto = new Impuesto();
        impuesto.setNombre(impuestoDTO.getNombre());
        impuesto.setPorcentaje(impuestoDTO.getPorcentaje());

        return this.impuestoRepository.save(impuesto);
    }

    @Override
    public Impuesto getById(Long id) {
        return impuestoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Impuesto con ID:"+ id +" No encontrado"));
    }

    @Override
    public List<Impuesto> getAll() {
        return this.impuestoRepository.findAll();
    }

    @Override
    public Impuesto update(Long id, ImpuestoDTO impuestoDTO) {
        Impuesto impuesto = this.impuestoRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFound("Impuesto con ID:" + id + " no encotrado"));
        if (StringUtils.isNotBlank(impuestoDTO.getNombre())){
            impuesto.setNombre(impuestoDTO.getNombre());
        }

        if (impuestoDTO.getPorcentaje() != null){
            impuesto.setPorcentaje(impuestoDTO.getPorcentaje());
        }

        Impuesto impuestoSave = this.impuestoRepository.save(impuesto);
        return impuestoSave;
    }

    @Override
    public void delete(Long id) {
        Impuesto impuesto = impuestoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Impuesto con ID:" + id + " no encontrado"));
        impuestoRepository.delete(impuesto);
    }
}
