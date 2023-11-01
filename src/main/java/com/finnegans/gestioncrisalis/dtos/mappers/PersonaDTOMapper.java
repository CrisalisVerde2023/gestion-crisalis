package com.finnegans.gestioncrisalis.dtos.mappers;

import com.finnegans.gestioncrisalis.dtos.PersonaDTO;
import com.finnegans.gestioncrisalis.models.Persona;

public class PersonaDTOMapper {
    private Persona persona;


    private PersonaDTOMapper(){}

    public static PersonaDTOMapper builder(){
        return new PersonaDTOMapper();
    }

    public PersonaDTOMapper setPersona(Persona persona) {
        this.persona = persona;
        return this;
    }


    public PersonaDTO build(){
        if (persona == null) throw new RuntimeException("Debe pasar la entidad Persona");

        return new PersonaDTO(persona.getNombre(), persona.getApellido(), persona.getDni());
    }
}
