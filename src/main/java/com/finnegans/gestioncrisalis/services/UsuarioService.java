package com.finnegans.gestioncrisalis.services;

import com.finnegans.gestioncrisalis.dtos.UsuarioDTO;
import com.finnegans.gestioncrisalis.dtos.request.UsuarioResponseDTO;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UsuarioService {
    UsuarioResponseDTO save(UsuarioDTO usuarioDTO) throws MessagingException, UnsupportedEncodingException;
    List<UsuarioResponseDTO> getAll();
    UsuarioResponseDTO getById(Long id);
    UsuarioResponseDTO update(Long id, UsuarioDTO usuarioDTO);
    void delete(Long id);
}
