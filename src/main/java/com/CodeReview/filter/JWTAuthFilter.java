package com.CodeReview.filter;

import com.CodeReview.entities.UserEntity;
import com.CodeReview.services.Implementation.JWTService;
import com.CodeReview.services.Implementation.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String path = request.getRequestURI();
            if (path.equals("/auth/refresh") || path.equals("/auth/login") || path.equals("/auth/signup")) {

                filterChain.doFilter(request, response);
                return;
            }
            final String reqToken = request.getHeader("Authorization");

        if(reqToken==null || !reqToken.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        String token = reqToken.split("Bearer ")[1];
        Long userId = jwtService.getUserIdByToken(token);
        if(userId!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserEntity user = userService.findByID(userId);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user,null,null);
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        filterChain.doFilter(request,response);

        }
        catch (ExpiredJwtException ex){
            System.out.println("error in catch");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Access token expired");

        }
    }
}
