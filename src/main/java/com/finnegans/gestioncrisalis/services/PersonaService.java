package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.PersonaDTO;
import com.finnegans.gestioncrisalis.models.Persona;

import java.util.List;

public interface PersonaService {
    Persona save(PersonaDTO personaDTO);
    List<Persona> getAll();
    Persona getById(Long id);

    Persona update(Long id, PersonaDTO personaDTO);
    void delete (Long id);


}
