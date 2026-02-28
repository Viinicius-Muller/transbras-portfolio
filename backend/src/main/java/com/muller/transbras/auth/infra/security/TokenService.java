package com.muller.transbras.auth.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.muller.transbras.auth.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {
    @Value("${app.security.jwt.secret}")
    private String secret;

    public String generateToken(User user) {
        try {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        String token = JWT.create()
                .withIssuer("transbras-auth-service")
                .withSubject(user.getUsername())
                .withClaim("id", user.getId())
                .withClaim("username", user.getUsername())
                .withClaim("role", user.getRole().toString())
                .withExpiresAt(this.generateExpiration())
                .sign(algorithm);

        return token;
    } catch (JWTCreationException e) {
        throw new RuntimeException("Failed to generate Token");
        }
    }

    public DecodedJWT validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("transbras-auth-service")
                    .build()
                    .verify(token);

        } catch (JWTVerificationException e) {
            return null;
        }
    }

    public Long getUserIdByToken(String tokenHeader ) {
        String token = this.formatToken(tokenHeader);
        DecodedJWT decodedJWT = this.validateToken(token);

        if (decodedJWT == null)
            throw new RuntimeException("Invalid token");

        return decodedJWT.getClaim("id").asLong();
    }

    public String formatToken(String tokenHeader) {
        return tokenHeader.replace("Bearer ","");
    }

    public Instant generateExpiration() {
        return LocalDateTime.now().plusDays(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
