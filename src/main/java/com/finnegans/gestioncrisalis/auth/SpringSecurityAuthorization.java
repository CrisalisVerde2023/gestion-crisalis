package com.finnegans.gestioncrisalis.auth;

import com.finnegans.gestioncrisalis.auth.filters.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityAuthorization {
    private AuthenticationConfiguration authenticationConfiguration;
    public SpringSecurityAuthorization(AuthenticationConfiguration authenticationConfiguration) {
        this.authenticationConfiguration = authenticationConfiguration;
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    SecurityFilterChain filterChain (HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.authorizeHttpRequests()
                .antMatchers(HttpMethod.GET, "/api/usuarios").permitAll()
                .antMatchers(HttpMethod.GET, "/api/usuarios/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/api/usuarios").hasRole("ADMIN")
                .antMatchers("/api/usuarios/**").hasRole("ADMIN")
                /*.antMatchers(HttpMethod.DELETE, "/api/usuarios/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/api/usuarios/{id}").hasRole("ADMIN")*/
                .anyRequest().authenticated()
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
                .csrf(config -> config.disable())
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }
}
