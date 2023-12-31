package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.UsuarioDTO;
import com.finnegans.gestioncrisalis.enums.RoleType;
import com.finnegans.gestioncrisalis.dtos.mappers.UsuarioDTOMapper;
import com.finnegans.gestioncrisalis.dtos.request.UsuarioResponseDTO;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.Role;
import com.finnegans.gestioncrisalis.enums.EmailType;
import com.finnegans.gestioncrisalis.models.Usuario;
import com.finnegans.gestioncrisalis.repositories.RoleRepository;
import com.finnegans.gestioncrisalis.repositories.UsuarioRepository;
import com.finnegans.gestioncrisalis.services.EmailService;
import com.finnegans.gestioncrisalis.services.UsuarioService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final RoleRepository roleRepository;
    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, EmailService emailService, RoleRepository roleRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public UsuarioResponseDTO save(UsuarioDTO usuarioDTO) throws MessagingException, UnsupportedEncodingException {
        emailService.sendEmailFromTemplate(usuarioDTO.getUsuarioDTO(), EmailType.CREATE);

        List<Role> roles = new ArrayList<>();
        Role rol = this.roleRepository.findByRole(RoleType.ROLE_USER.toString())
                .orElseThrow(() -> new ResourceNotFound("Rol no encontrado."));
        roles.add(rol);

        Usuario usuario = this.usuarioRepository.save(
                Usuario.builder()
                .usuario(usuarioDTO.getUsuarioDTO())
                .password(passwordEncoder.encode(usuarioDTO.getPasswordDTO()))
                .roles(roles)
                .eliminado(false)
                .fechaCreacion(LocalDateTime.now())
                .build()
        );

        return UsuarioDTOMapper.builder().setUsuario(usuario).build();
    }
    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> getAll() {
        List<Usuario> usuarios = this.usuarioRepository.findAll();

        return usuarios.stream().map(
                usuario -> UsuarioDTOMapper.builder().setUsuario(usuario).build()
        ).collect(Collectors.toList());
    }
    @Override
    @Transactional(readOnly = true)
    public UsuarioResponseDTO getById(Long id) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        return UsuarioDTOMapper.builder().setUsuario(usuario).build();
    }
    @Override
    @Transactional
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
    @Transactional
    public void delete(Long id) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        usuario.setEliminado(!usuario.isEliminado());

        this.usuarioRepository.save(usuario);
    }
}
