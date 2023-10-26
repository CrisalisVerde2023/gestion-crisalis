package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.mappers.PersonaDTOMapper;
import com.finnegans.gestioncrisalis.dtos.PersonaDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Persona;
import com.finnegans.gestioncrisalis.repositories.PersonaRepository;
import com.finnegans.gestioncrisalis.services.PersonaService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonaServiceImpl implements PersonaService {
    private final PersonaRepository personaRepository;

    public PersonaServiceImpl(PersonaRepository personaRepository){
        this.personaRepository = personaRepository;
    }

    /*
     @Override
        public List<Persona> getAll(){
             List<Persona> personas = personaRepository.findAll();
     return personas.stream().map(
                     persona -> PersonaDTOMapper.builder().setPersona(persona).build()
             ).collect(Collectors.toList());
     }

          @Override
        public PersonaDTO getById(Long id){
              Persona persona = personaRepository.findById(id)
                      .orElseThrow(() -> new ResourceNotFound("Persona con ID: " + id + " no encontrada"));


              return PersonaDTOMapper.builder().setPersona(persona).build();
          }
     */

    @Override
    public Persona save(PersonaDTO personaDTO) {
        Persona persona = new Persona();
        persona.setNombre(personaDTO.getNombreDTO());
        persona.setApellido(personaDTO.getApellidoDTO());
        persona.setDni(personaDTO.getDniDTO());

        return this.personaRepository.save(persona);
    }

    /*

    @Override
    public void delete(Long id){
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Persona con ID:" + id + " no encontrada"));
        personaRepository.delete(persona);
    }

     */
}

