# Guia de configuracion de Spring Security (SC) e implementacion con JWT

## Autorizacion Spring Security
Cuando un cliente envía una solicitud al servidor, la solicitud pasará por una secuencia/cadena de filtros antes de llegar al servlet de destino que es realmente responsable de procesar la solicitud segun la siguiente configuracion inicial.
```java
@Configuration
public class SpringSecurityAuthorization {
    @Bean
    SecurityFilterChain filterChain (HttpSecurity httpSecurity) throws Exception {
    return httpSecurity.authorizeHttpRequests()
        //Los antMatchers seran nuestras reglas para autorizar diferentes recursos a nuestra conveniencia
        .antMatchers(HttpMethod.POST, "/login").permitAll()
        .antMatchers("/api/**").hasAnyRole("ADMIN", "USER")
        .anyRequest().authenticated()
        .and()
        //Cross Site Request Forgery, API que evita exploit en el patron MCV (JSP, Thymeleaf, forms), React por debajo lo implementa por nosotros, se deshabilita
        .csrf(config -> config.disable())
        //Deshabilitamos HttpsSesion (por defecto en SC) y en su lugar lo manejamos con JWT y React + StorageSession + Context
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
    }
}
```

## Autenticacion con JWT
Implementaremos 3 metodos de UsernamePasswordAuthenticationFilter (es un controlador que intercepta por defecto las request entrantes de tipo POST y que la ruta sea "/login") en nuestro filtro que llamaremos al momento del login
- attemptAuthentication: en el intento de login
- successfulAuthentication: si acepto las credenciales y todo salen bien
- unsuccessfulAuthentication: si rechazo las credenciales

````java
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ...
    }
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        ...
    }
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        ...
    }
}
````

Una vez terminada las 3 implementaciones hay que agregar el filtro a nuestras reglas de SC autorizacion

````java
@Configuration
public class SpringSecurityAuthorization {
    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;
    @Bean
    SecurityFilterChain filterChain (HttpSecurity httpSecurity) throws Exception {
        ...
        .and()
        .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
        ...
    }
}
````

Lo siguiente es implementar UserDetailsService, en esta implementacion validaremos contra JPA, otorgaremos roles y devolveremos User del paquete SC

````java
...
````

Ahora nos falta el filtro que valida el token generado para seguir solicitando recursos en todos nuestros endpoints protegidos

````java

````

Nuevamente necesitamos agregar el nuevo filtro a la configuracion de SC
````java
@Configuration
public class SpringSecurityAuthorization {
    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;
    @Bean
    SecurityFilterChain filterChain (HttpSecurity httpSecurity) throws Exception {
        ...
        .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
        .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager()))
        ...
    }
}
````

## Configuracion JWT
Creamos la llave secreta que firmara nuestros tokens
````java
SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
````