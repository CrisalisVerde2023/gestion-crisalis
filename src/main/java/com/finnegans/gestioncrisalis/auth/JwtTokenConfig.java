package com.finnegans.gestioncrisalis.auth;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.security.Key;

public class JwtTokenConfig {
    public final static SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
    public final static String PREFIX_TOKEN = "Bearer ";
    public final static String HEADER_AUTHORIZATION = "Authorization";
}
