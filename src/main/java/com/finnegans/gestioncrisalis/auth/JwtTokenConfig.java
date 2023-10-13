package com.finnegans.gestioncrisalis.auth;
import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;

public class JwtTokenConfig {
    public final static SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();
    public final static String PREFIX_TOKEN = "Bearer ";
    public final static String HEADER_AUTHORIZATION = "Authorization";
    public final static String HEADER_CONTENT_TYPE = "Content-Type";
}
