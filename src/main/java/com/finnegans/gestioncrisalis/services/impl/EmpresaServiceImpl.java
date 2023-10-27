package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.EmpresaDTO;
import com.finnegans.gestioncrisalis.dtos.mappers.EmpresaDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.EmpresaResponseDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Empresa;
import com.finnegans.gestioncrisalis.repositories.EmpresaRepository;
import com.finnegans.gestioncrisalis.services.EmpresaService;
import com.finnegans.gestioncrisalis.validations.DateParser;
import com.sun.jdi.request.InvalidRequestStateException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpresaServiceImpl implements EmpresaService {
    private final EmpresaRepository empresaRepository;

    public EmpresaServiceImpl(EmpresaRepository empresaRepository){
        this.empresaRepository = empresaRepository;
    }

    @Override
    public EmpresaResponseDTO save(EmpresaDTO empresaDTO) {
        LocalDateTime startDate = null;
        try {
            startDate = DateParser.parseStringToLocalDateTime(empresaDTO.getStart_dateDTO(), "yyyy-MM-dd'T'HH:mm:ss");
        } catch (DateTimeParseException e) {
            //throw new YourCustomException("Invalid date format", e);
        }

        Empresa empresa = this.empresaRepository.save(
                Empresa.builder()
                        .nombre(empresaDTO.getNombreDTO())
                        .cuit(empresaDTO.getCuitDTO())
                        .start_date(startDate)
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
            LocalDateTime parsedDate = DateParser.parseStringToLocalDateTime(empresaDTO.getStart_dateDTO(), "yyyy-MM-dd'T'HH:mm:ss");
            empresa.setStart_date(parsedDate);
        } catch (DateTimeParseException e) {
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

        this.empresaRepository.deleteById(id);
    }
}
