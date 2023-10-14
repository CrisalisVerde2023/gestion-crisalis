package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.UsuarioDTO;
import com.finnegans.gestioncrisalis.models.Usuario;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UsuarioService {
    Usuario save(UsuarioDTO usuario) throws MessagingException, UnsupportedEncodingException;
    List<Usuario> getAll();
    Usuario getById(Long id);
    Usuario update(Long id, UsuarioDTO usuarioDTO);
    void delete(Long id);
}
