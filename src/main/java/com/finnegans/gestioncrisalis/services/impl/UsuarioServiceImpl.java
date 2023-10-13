package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.dtos.UsuarioDTO;
import com.finnegans.gestioncrisalis.enums.RoleType;
import com.finnegans.gestioncrisalis.exceptions.custom.ResourceNotFound;
import com.finnegans.gestioncrisalis.models.EmailType;
import com.finnegans.gestioncrisalis.models.Role;
import com.finnegans.gestioncrisalis.models.Usuario;
import com.finnegans.gestioncrisalis.repositories.RoleRepository;
import com.finnegans.gestioncrisalis.repositories.UsuarioRepository;
import com.finnegans.gestioncrisalis.services.EmailService;
import com.finnegans.gestioncrisalis.services.UsuarioService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    public Usuario save(UsuarioDTO usuarioDTO) throws MessagingException, UnsupportedEncodingException {
        emailService.sendEmailFromTemplate(usuarioDTO.getUsuarioDTO(), EmailType.CREATE);

        List<Role> roles = new ArrayList<>();
        Role rol = this.roleRepository.findByRole(RoleType.ROLE_USER.toString())
                .orElseThrow(() -> new ResourceNotFound("Rol no encontrado."));
        roles.add(rol);

        return this.usuarioRepository.save(
                Usuario.builder()
                .usuario(usuarioDTO.getUsuarioDTO())
                .password(passwordEncoder.encode(usuarioDTO.getPasswordDTO()))
                .roles(roles)
                .eliminado(false)
                .fechaCreacion(LocalDateTime.now())
                .build()
        );
    }
    @Override
    public List<Usuario> getAll() {
        return this.usuarioRepository.findAll();
    }
    @Override
    public Usuario getById(Long id) {
        return this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));
    }
    @Override
    public Usuario update(Long id, UsuarioDTO usuarioDTO) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));

        if (StringUtils.isNotBlank(usuarioDTO.getUsuarioDTO())) {
            usuario.setUsuario(usuarioDTO.getUsuarioDTO());
        }
        if (StringUtils.isNotBlank(usuarioDTO.getPasswordDTO())){
            usuario.setPassword(passwordEncoder.encode(usuarioDTO.getPasswordDTO()));
        }

        usuario.setFechaModificacion(LocalDateTime.now());
        return this.usuarioRepository.save(usuario);
    }
    @Override
    public void delete(Long id) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("Usuario no encontrado con id: ".concat(String.valueOf(id))));
        usuario.setEliminado(true);
        this.usuarioRepository.save(usuario);
    }
}
