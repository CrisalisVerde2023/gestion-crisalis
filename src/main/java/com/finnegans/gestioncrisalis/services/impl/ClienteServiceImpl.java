package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.ClienteDTO;
import com.finnegans.gestioncrisalis.dtos.mappers.ClienteDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.ClienteResponseDTO;
import com.finnegans.gestioncrisalis.models.Cliente;
import com.finnegans.gestioncrisalis.repositories.ClienteRepository;
import com.finnegans.gestioncrisalis.services.ClienteService;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public ClienteResponseDTO save(ClienteDTO clienteDTO) {

        Cliente cliente = this.clienteRepository.save(
                Cliente.builder()
                        .nombre(clienteDTO.getNombreDTO())
                        .eliminado(false)
                        .build()
        );

        return ClienteDTOMapper.builder().setCliente(cliente).build();
    }

}
