package com.openclassrooms.mddapi.configuration.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    Logger logger = LogManager.getLogger(this.getClass());

    @Value("${mddapi.app.jwtSecret}")
    private String jwtSecret;

    @Value("${mddapi.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    /**
     * Returns key to encode the JWT token
     *
     * @return Key
     */
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    /**
     * Parses the email token from JWT token
     *
     * @param token as String
     * @return String
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Creates a token with the connected user's information
     *
     * @param authentication as Authentication created with a success connexion
     * @return String
     */
    public String generateToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        return buildToken((userPrincipal.getEmail()));
    }

    /**
     * Creates a token with the connected user's information
     *
     * @param email as String
     * @return String
     */
    public String generateToken(String email) {
        return buildToken(email);
    }

    /**
     * Creates a token
     *
     * @param email as String
     * @return String
     */
    private String buildToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Checks if a token is valid
     *
     * @param token as String
     * @return boolean
     */
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is unsupported: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    /**
     * Get cookie with token
     *
     * @param token    as String
     * @param response as HttpServletResponse
     */
    public void getCookieFromToken(String token, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt_token", token);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 60 * 24);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}
