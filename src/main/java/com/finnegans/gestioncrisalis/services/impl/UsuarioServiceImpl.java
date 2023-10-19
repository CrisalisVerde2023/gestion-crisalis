package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.UsuarioDTO;
import com.finnegans.gestioncrisalis.dtos.mappers.UsuarioDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.UsuarioResponseDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.enums.EmailType;
import com.finnegans.gestioncrisalis.models.Usuario;
import com.finnegans.gestioncrisalis.repositories.UsuarioRepository;
import com.finnegans.gestioncrisalis.services.EmailService;
import com.finnegans.gestioncrisalis.services.UsuarioService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, EmailService emailService){
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }
    @Override
    public UsuarioResponseDTO save(UsuarioDTO usuarioDTO) throws MessagingException, UnsupportedEncodingException {
        emailService.sendEmailFromTemplate(usuarioDTO.getUsuarioDTO(), EmailType.CREATE);

        Usuario usuario = this.usuarioRepository.save(
                Usuario.builder()
                .usuario(usuarioDTO.getUsuarioDTO())
                .password(passwordEncoder.encode(usuarioDTO.getPasswordDTO()))
                .eliminado(false)
                .fechaCreacion(LocalDateTime.now())
                .build()
        );

        return UsuarioDTOMapper.builder().setUsuario(usuario).build();
    }
    @Override
    public List<UsuarioResponseDTO> getAll() {
        List<Usuario> usuarios = this.usuarioRepository.findAll();

        return usuarios.stream().map(
                usuario -> UsuarioDTOMapper.builder().setUsuario(usuario).build()
        ).collect(Collectors.toList());
    }
    @Override
    public UsuarioResponseDTO getById(Long id) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        return UsuarioDTOMapper.builder().setUsuario(usuario).build();
    }
    @Override
    public UsuarioResponseDTO update(Long id, UsuarioDTO usuarioDTO) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        if (StringUtils.isNotBlank(usuarioDTO.getUsuarioDTO())) {
            usuario.setUsuario(usuarioDTO.getUsuarioDTO());
        }
        if (StringUtils.isNotBlank(usuarioDTO.getPasswordDTO())){
            usuario.setPassword(passwordEncoder.encode(usuarioDTO.getPasswordDTO()));
        }

        usuario.setFechaModificacion(LocalDateTime.now());
        Usuario usuarioSave = this.usuarioRepository.save(usuario);

        return UsuarioDTOMapper.builder().setUsuario(usuarioSave).build();
    }
    @Override
    public void delete(Long id) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        usuario.setEliminado(!usuario.isEliminado());

        this.usuarioRepository.save(usuario);
    }
}
