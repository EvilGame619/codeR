package com.CodeReview.services.Implementation;

import com.CodeReview.entities.SessionEntity;
import com.CodeReview.entities.UserEntity;
import com.CodeReview.services.SessionService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class JWTService {

    @Value("${jwt.secretKey}")
    private String key;

    private SecretKey generateKey(){
        return Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
    }

    private final SessionService sessionService;

    public String generateAccessToken(UserEntity user){
        return Jwts.builder()
                .subject(user.getId().toString())
                .claim("email",user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*60))
                .signWith(generateKey())
                .compact();
    }

    public String generateRefreshToken(UserEntity user){
        String refreshToken =  Jwts.builder()
                .subject(user.getId().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .signWith(generateKey())
                .compact();
        SessionEntity session = SessionEntity.builder()
                .refreshToken(refreshToken)
                .createdAt(createdAt(refreshToken))
                .expiresAt(expiresAt(refreshToken))
                .user(user)
                .build();
        sessionService.saveSession(session);
        return refreshToken;
    }

    public Long getUserIdByToken(String token) {
        Claims claims = extractClaim(token);

        // Manually check for expiration
        Date expiration = claims.getExpiration();
        if (expiration != null && expiration.before(new Date())) {
            throw new ExpiredJwtException(null, claims, "Token is expired");
        }

        return Long.valueOf(claims.getSubject());
    }

    public boolean isTokenExpired(String refreshToken){
        Claims claims = extractClaim(refreshToken);
        return claims.getExpiration() != null && claims.getExpiration().before(new Date());

    }
    private Claims extractClaim(String token){
        return Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Date createdAt(String token){
        Claims claims = extractClaim(token);
        return claims.getIssuedAt();
    }
    private Date expiresAt(String token){
        Claims claims = extractClaim(token);
        return claims.getExpiration();
    }

    public Long getUserIdFromExpiredToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload(); // No manual expiration check here

        return Long.valueOf(claims.getSubject());
    }

    public String extractTokenFromCookie(HttpServletRequest request, String cookieName){
        if(request.getCookies() !=null){
            for(Cookie cookie: request.getCookies()){
                if(Objects.equals(cookie.getName(), cookieName)){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
