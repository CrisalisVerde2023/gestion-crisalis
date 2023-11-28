package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import com.finnegans.gestioncrisalis.dtos.mappers.EmpresaDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.EmpresaResponseDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.repositories.EmpresaRepository;
import com.finnegans.gestioncrisalis.services.EmpresaService;
import com.sun.jdi.request.InvalidRequestStateException;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpresaServiceImpl implements EmpresaService {
    private final EmpresaRepository empresaRepository;
    private static final SimpleDateFormat inputDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public EmpresaServiceImpl(EmpresaRepository empresaRepository){
        this.empresaRepository = empresaRepository;
    }

    @Override
    public EmpresaResponseDTO save(EmpresaDTO empresaDTO) {
        Date inputDate = null;
        try {
            inputDate = inputDateFormat.parse(empresaDTO.getStart_dateDTO());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        Empresa empresa = this.empresaRepository.save(
                Empresa.builder()
                        .nombre(empresaDTO.getNombreDTO())
                        .cuit(empresaDTO.getCuitDTO())
                        .start_date(inputDate)
                        .build()
        );

        return EmpresaDTOMapper.builder().setEmpresa(empresa).build();
    }

    @Override
    public List<EmpresaResponseDTO> getAll() {
        List<Empresa> empresas = this.empresaRepository.findAll();

        return empresas.stream().map(
                empresa -> EmpresaDTOMapper.builder().setEmpresa(empresa).build()
        ).collect(Collectors.toList());
    }

    @Override
    public EmpresaResponseDTO getById(Long id) {
        Empresa empresa = this.empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Empresa no encontrada con id: " + id));

        return EmpresaDTOMapper.builder().setEmpresa(empresa).build();
    }

    @Override
    public EmpresaResponseDTO update(Long id, EmpresaDTO empresaDTO) {
        Empresa empresa = this.empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Empresa no encontrada con id: " + id));

        try {
            empresa.setStart_date(inputDateFormat.parse(empresaDTO.getStart_dateDTO()));
        } catch (ParseException e) {
            throw new InvalidRequestStateException("Invalid date format");
        }

        empresa.setNombre(empresaDTO.getNombreDTO());
        empresa.setCuit(empresaDTO.getCuitDTO());

        Empresa updatedEmpresa = this.empresaRepository.save(empresa);

        return EmpresaDTOMapper.builder().setEmpresa(updatedEmpresa).build();
    }


    @Override
    public void delete(Long id) {
        Empresa empresa = this.empresaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Empresa no encontrada con id: " + id));

        empresa.setEliminado(!empresa.isEliminado());
        this.empresaRepository.save(empresa);
    }
}
