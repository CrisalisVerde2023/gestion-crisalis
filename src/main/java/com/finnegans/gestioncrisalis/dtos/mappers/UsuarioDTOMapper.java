package com.finnegans.gestioncrisalis.dtos.mappers;

import com.finnegans.gestioncrisalis.dtos.request.UsuarioResponseDTO;
import com.finnegans.gestioncrisalis.models.Usuario;

public class UsuarioDTOMapper {
    private Usuario usuario;
    private UsuarioDTOMapper() {}

    public static UsuarioDTOMapper builder(){
        return new UsuarioDTOMapper();
    }
    public UsuarioDTOMapper setUsuario(Usuario usuario){
        this.usuario = usuario; 
        return this;
    }
    public UsuarioResponseDTO build(){
        if (usuario == null) throw new RuntimeException("Debe pasar la entidad Usuario");

        return new UsuarioResponseDTO(usuario.getId(), usuario.getUsuario(), usuario.isEliminado());
    }
}
