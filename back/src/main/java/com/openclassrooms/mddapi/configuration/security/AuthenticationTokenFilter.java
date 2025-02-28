package com.openclassrooms.mddapi.configuration.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Intercepts all HTTP requests before they reach application controllers
 */
public class AuthenticationTokenFilter extends OncePerRequestFilter {

    Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    /**
     * Checks if the token is valid and allows it utilisation for authentication
     *
     * @param request     as HttpServletRequest
     * @param response    as HttpServletResponse
     * @param filterChain as FilterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, ServletException, IOException {
        try {
            String token = parseJwt(request);
            if (token != null && jwtService.validateJwtToken(token)) {
                // Load the concerned user
                String email = jwtService.getUserNameFromJwtToken(token);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                // Updates the SecurityContextHolder
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (RuntimeException e) {
            logger.error("Cannot set user authentication: {}", e);
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Parses the JWT token from the Authorization header of the HTTP request.
     *
     * @param request the HTTP request containing the Authorization header
     * @return the JWT token extracted from the Authorization header, or null if not present
     */
    private String parseJwt(HttpServletRequest request) {
        String jwtToken = null;

        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("jwt_token")) {
                jwtToken = cookie.getValue();
            }
        }
        return jwtToken;
    }
}
