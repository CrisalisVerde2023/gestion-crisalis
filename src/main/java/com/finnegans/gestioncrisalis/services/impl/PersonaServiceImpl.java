package com.finnegans.gestioncrisalis.services.impl;


import com.finnegans.gestioncrisalis.dtos.PersonaDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.DuplicateDniException;
import com.finnegans.gestioncrisalis.exceptions.custom.EmptyNameAndApellidoException;
import com.finnegans.gestioncrisalis.exceptions.custom.InvalidDniException;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Persona;
import com.finnegans.gestioncrisalis.repositories.PersonaRepository;
import com.finnegans.gestioncrisalis.services.PersonaService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;





import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class PersonaServiceImpl implements PersonaService {
    private final PersonaRepository personaRepository;

    public PersonaServiceImpl(PersonaRepository personaRepository){
        this.personaRepository = personaRepository;
    }

    @Override
    public Persona save(PersonaDTO personaDTO) {
        Optional<Persona> existingPersona = personaRepository.findByDni(personaDTO.getDniDTO());

        if (existingPersona.isPresent()){
            throw new DuplicateDniException("Ya existe una persona con el mismo DNI");
        }

        String dni = personaDTO.getDniDTO();

        if (!dni.matches("[0-9]{8}")) {
            throw new InvalidDniException("El DNI debe contener exactamente 8 dígitos numéricos.");
        }

        if ((personaDTO.getNombreDTO() == null || personaDTO.getNombreDTO().isEmpty()) &&
                (personaDTO.getApellidoDTO() == null || personaDTO.getApellidoDTO().isEmpty())) {
            throw new EmptyNameAndApellidoException("Tanto el nombre como el apellido no pueden estar vacíos");
        }

        Persona persona = new Persona();
        persona.setNombre(personaDTO.getNombreDTO());
        persona.setApellido(personaDTO.getApellidoDTO());
        persona.setDni(personaDTO.getDniDTO());



        return this.personaRepository.save(persona);
    }

    @Override
    public List<Persona> getAll(){
        return this.personaRepository.findAll();
    }

    @Override
    public Persona getById(Long id) {
        return personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Persona con ID: " + id + " no encontrada"));
    }

    @Override
    public void delete(Long id){
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Persona con ID:" + id + " no encontrada"));

        persona.setEliminado(!persona.isEliminado());
        this.personaRepository.save(persona);
    }

    @Override
    public Persona update(Long id, PersonaDTO personaDTO){
        Persona persona = this.personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Persona con ID:" + id + " no encontrada"));
        if (StringUtils.isNotBlank(personaDTO.getNombreDTO())){
            persona.setNombre(personaDTO.getNombreDTO());
        }

        if (StringUtils.isNotBlank(personaDTO.getApellidoDTO())){
            persona.setApellido(personaDTO.getApellidoDTO());
        }

        if (StringUtils.isNotBlank(personaDTO.getDniDTO())){
            persona.setDni(personaDTO.getDniDTO());
        }

        persona.setFechaModificacion(LocalDateTime.now());
        Persona personaSave = this.personaRepository.save(persona);
        return personaSave;
    }


}