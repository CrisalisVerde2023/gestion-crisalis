package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ImpuestoDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.DataIntegrityException;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Impuesto;
import com.finnegans.gestioncrisalis.repositories.ImpuestoRepository;
import com.finnegans.gestioncrisalis.services.ImpuestoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImpuestoServiceImpl implements ImpuestoService {

    private final ImpuestoRepository impuestoRepository;

    public ImpuestoServiceImpl(ImpuestoRepository impuestoRepository) {
        this.impuestoRepository = impuestoRepository;
    }

    @Override
    public Impuesto save(ImpuestoDTO impuestoDTO) {
        Optional<Impuesto> impuestoExist = impuestoRepository.findByNombre(impuestoDTO.getNombreDTO().toUpperCase());

        if(impuestoExist.isPresent()){
            throw new DataIntegrityException("Este impuesto ya se encuentra creado.");
        }


        Impuesto impuesto = new Impuesto();
        impuesto.setNombre(impuestoDTO.getNombreDTO().toUpperCase());
        impuesto.setPorcentaje(impuestoDTO.getPorcentajeDTO());

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
        if (StringUtils.isNotBlank(impuestoDTO.getNombreDTO())){
            impuesto.setNombre(impuestoDTO.getNombreDTO().toUpperCase());
        }

        if (impuestoDTO.getPorcentajeDTO() != null){
            impuesto.setPorcentaje(impuestoDTO.getPorcentajeDTO());
        }

        return this.impuestoRepository.save(impuesto);
    }

    @Override
    public void delete(Long id) {
        Impuesto impuesto = impuestoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Impuesto con ID:" + id + " no encontrado"));

        impuesto.setEliminado(!impuesto.isEliminado());
        this.impuestoRepository.save(impuesto);
    }
}
