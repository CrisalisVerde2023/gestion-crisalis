package com.finnegans.gestioncrisalis.dtos.mappers;

import com.finnegans.gestioncrisalis.dtos.PersonaDTO;
import com.finnegans.gestioncrisalis.models.Persona;

public class PersonaDTOMapper {
    private Persona persona;
    private PersonaDTO personaDTO;

    private PersonaDTOMapper(){

    }

    public static PersonaDTOMapper builder(){
        return new PersonaDTOMapper();
    }

    public PersonaDTOMapper setPersona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public PersonaDTOMapper setPersonaDTO(PersonaDTO personaDTO){
        this.personaDTO = personaDTO;
        return this;
    }

    public Persona build(){
        if (persona == null) throw new RuntimeException("Debe pasar la entidad Persona");

        if (personaDTO != null){
            persona.setNombre(personaDTO.getNombreDTO());
            persona.setApellido(personaDTO.getApellidoDTO());
            persona.setFechaNacimiento(personaDTO.getFechaNacimientoDTO());
        }

        return persona;
    }
}
