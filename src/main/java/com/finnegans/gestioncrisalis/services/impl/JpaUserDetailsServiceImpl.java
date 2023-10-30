package com.finnegans.gestioncrisalis.services.impl;

import com.finnegans.gestioncrisalis.models.Usuario;
import com.finnegans.gestioncrisalis.repositories.UsuarioRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JpaUserDetailsServiceImpl implements UserDetailsService {
    private UsuarioRepository usuarioRepository;
    public JpaUserDetailsServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = this.usuarioRepository.findByUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Usuario %s no encontrado.", username)));

        List<GrantedAuthority> authorities = usuario.getRoles()
                .stream().map(rol -> new SimpleGrantedAuthority(rol.getRole())).collect(Collectors.toList());

        return new User(usuario.getUsuario(),
                usuario.getPassword(),
                true,
                true,
                true,
                true,
                authorities);
    }
}
