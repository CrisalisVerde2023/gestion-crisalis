package com.finnegans.gestioncrisalis.auth.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import static com.finnegans.gestioncrisalis.auth.JwtTokenConfig.*;

import com.finnegans.gestioncrisalis.enums.RoleType;
import com.finnegans.gestioncrisalis.models.Usuario;
import com.finnegans.gestioncrisalis.repositories.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private UsuarioRepository usuarioRepository;
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, ApplicationContext context) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository= context.getBean(UsuarioRepository.class);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        Usuario usuario = null;
        String username = null;
        String password = null;

        try {
            usuario = new ObjectMapper().readValue(request.getInputStream(), Usuario.class);
            username = usuario.getUsuario();
            password = usuario.getPassword();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authenticationToken);
    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String username = ((User) authResult.getPrincipal()).getUsername();

        Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();
        boolean isAdmin = roles.stream().anyMatch(rol -> rol.getAuthority().equals(RoleType.ROLE_ADMIN.toString()));
        Usuario usuario = this.usuarioRepository.findByUsuario(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Usuario %s no encontrado.", username)));
        
        Map<String,Object> claims = new HashMap<>();
        claims.put("authorities", new ObjectMapper().writeValueAsString(roles));
        claims.put("isAdmin", isAdmin);

        String token = Jwts.builder()
                .claims(claims)
                .subject(username)
                .signWith(SECRET_KEY)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000)) //1h
                .compact();

        response.addHeader(HEADER_AUTHORIZATION, PREFIX_TOKEN.concat(token));

        Map<String,Object> body = new HashMap<>();
        body.put("id", usuario.getId());
        body.put("token", token);
        body.put("message", String.format("Hola %s, iniciaste sesion exitosamente!", username));
        body.put("username", username);

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(200);
        response.setContentType("application/json");
    }
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        Map<String,Object> body = new HashMap<>();
        body.put("message", "Credenciales invalidas");
        body.put("error", failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(401);
        response.setContentType("application/json");
    }
}
