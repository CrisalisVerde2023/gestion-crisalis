package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.PersonaDTO;
import com.finnegans.gestioncrisalis.dtos.request.PersonaResponseDTO;
import com.finnegans.gestioncrisalis.models.Persona;

import java.util.List;

public interface PersonaService {
    PersonaResponseDTO save(PersonaDTO personaDTO);
    List<Persona> getAll();
    PersonaDTO getById(Long id);
    PersonaResponseDTO update(Long id, PersonaDTO personaDTO);
    void delete (Long id);
}
