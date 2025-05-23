package com.CodeReview.services.Implementation;

import com.CodeReview.Exceptions.RefreshTokenException;
import com.CodeReview.Exceptions.ResourceAlreadyExists;
import com.CodeReview.dto.LoginDTO;
import com.CodeReview.dto.LoginResponseDTO;
import com.CodeReview.dto.SignupDTO;
import com.CodeReview.entities.UserEntity;
import com.CodeReview.services.AuthService;
import com.CodeReview.services.SessionService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImple implements AuthService {

    private final ModelMapper mapper;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final SessionService sessionService;

    @Transactional
    @Override
    public SignupDTO signup(SignupDTO signupDTO) {

        UserEntity checkUser = userService.findByEmail(signupDTO.getEmail());
        if(checkUser!=null) throw new ResourceAlreadyExists("User already exists with email: "+ signupDTO.getEmail());
        UserEntity user = mapper.map(signupDTO, UserEntity.class);
        userService.saveUser(user);
        return signupDTO;
    }

    @Transactional
    @Override
    public LoginResponseDTO login(LoginDTO loginDTO, HttpServletResponse response) {

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(),loginDTO.getPassword()));

            UserEntity user = (UserEntity) authentication.getPrincipal();

            String accessToken = jwtService.generateAccessToken(user);
            Boolean sessionExists = sessionService.findSession(user.getId());
            if(!sessionExists) {
                String refreshToken = jwtService.generateRefreshToken(user);

                response.setHeader("Set-Cookie",
                        "refreshToken=" + refreshToken +
                                "; HttpOnly; Max-Age=30; Path=/; SameSite=None; Secure=false");
        }else{
                String refreshToken = sessionService.getRefreshToken(user.getId());
                response.setHeader("Set-Cookie",
                        "refreshToken=" + refreshToken +
                                "; HttpOnly; Max-Age=30; Path=/; SameSite=None; Secure=false");
            }

        return new LoginResponseDTO(accessToken);
    }

    @Override
    public LoginResponseDTO refresh(HttpServletRequest request) {
        log.info("refresh endpoint hit");
        String refreshTokenInCookie = getRefreshTokenFromCookie(request);
        try{
        Long userID = jwtService.getUserIdByToken(refreshTokenInCookie);

        String refreshToken = sessionService.getRefreshToken(userID);

        if(refreshToken.equals(refreshTokenInCookie)){
            String accessToken = jwtService.generateAccessToken(userService.findByID(userID));
            return new LoginResponseDTO(accessToken);
        }else {

            throw new RefreshTokenException("Refresh Token Is not valid or null");
        }
        }catch ( ExpiredJwtException e) {
            Long userID = jwtService.getUserIdFromExpiredToken(getRefreshTokenFromCookie(request));
            sessionService.deleteSession(userID);
            System.out.println("Session deleted");
            throw new RefreshTokenException("Refresh token expired");
        }

    }

    private String getRefreshTokenFromCookie(HttpServletRequest request){
        if(request.getCookies() !=null){
            for(Cookie cookie: request.getCookies()){
                if("refreshToken".equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
