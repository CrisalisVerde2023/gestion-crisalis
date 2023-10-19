package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.LoginDTO;
import com.finnegans.gestioncrisalis.dtos.mappers.UsuarioDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.UsuarioResponseDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.exceptions.custom.UserDisabled;
import com.finnegans.gestioncrisalis.models.Usuario;
import com.finnegans.gestioncrisalis.repositories.UsuarioRepository;
import com.finnegans.gestioncrisalis.services.LoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    private final UsuarioRepository usuarioRepository;
    public LoginServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public ResponseEntity<?> attempt(LoginDTO loginDTO) {
        String username = loginDTO.getUsuarioDTO();
        Usuario usuario = this.usuarioRepository.findByUsuario(username)
                .orElseThrow(() -> new ResourceNotFound("Credenciales inválidas."));

        UsuarioResponseDTO usuarioResponseDTO = UsuarioDTOMapper.builder().setUsuario(usuario).build();

        if (usuario.isEliminado()) throw new UserDisabled();
        return  BCrypt.checkpw(loginDTO.getPasswordDTO(), usuario.getPassword()) ?
             new ResponseEntity<>(usuarioResponseDTO, HttpStatus.ACCEPTED) :
             new ResponseEntity<>("Credenciales inválidas.", HttpStatus.NOT_FOUND);
        }
}
