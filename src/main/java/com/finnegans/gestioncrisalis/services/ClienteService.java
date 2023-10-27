package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.ClienteDTO;
import com.finnegans.gestioncrisalis.dtos.request.ClienteResponseDTO;
import com.finnegans.gestioncrisalis.models.Cliente;

public interface ClienteService {
    ClienteResponseDTO save(ClienteDTO cliente);
}
