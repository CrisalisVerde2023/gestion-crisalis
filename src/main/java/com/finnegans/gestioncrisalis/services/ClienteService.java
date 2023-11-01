package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.ClienteDTO;
import com.finnegans.gestioncrisalis.dtos.request.ClienteResponseDTO;



import java.util.List;

public interface ClienteService {
     ClienteResponseDTO save(ClienteDTO cliente);
     ClienteResponseDTO getById(Long id);
     List<ClienteResponseDTO> getAll();
     ClienteResponseDTO update(Long id, ClienteDTO clienteDTO);
     ClienteResponseDTO delete(Long id);
}
