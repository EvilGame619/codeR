package com.CodeReview.Helper;

import com.CodeReview.entities.UserEntity;
import com.CodeReview.services.Implementation.JWTService;
import com.CodeReview.services.Implementation.UserService;
import com.CodeReview.services.SessionService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Random;

@Slf4j
@Component
@RequiredArgsConstructor
public class Oauth2Handler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;
    public static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private final JWTService jwtService;
    private final SessionService sessionService;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException{

        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;

        DefaultOAuth2User defaultOAuth2User = (DefaultOAuth2User) oAuth2AuthenticationToken.getPrincipal();
        UserEntity user = userService.findByEmail(defaultOAuth2User.getAttribute("email"));
        if(user==null){
            UserEntity newUser = UserEntity.builder()
                    .email(defaultOAuth2User.getAttribute("email"))
                    .userName(userNameGenerator(4))
                    .firstName(defaultOAuth2User.getAttribute("given_name"))
                    .lastName(defaultOAuth2User.getAttribute("family_name"))
                    .build();

            user = userService.saveUser(newUser);
        }

        String accessToken = jwtService.generateAccessToken(user);
        Boolean sessionExists = sessionService.findSession(user.getId());
        if(!sessionExists) {
            String refreshToken = jwtService.generateRefreshToken(user);

            response.setHeader("Set-Cookie",
                    "refreshToken=" + refreshToken +
                            "; HttpOnly; Max-Age=86400; Path=/; SameSite=None; Secure=false");
        }else{
            String refreshToken = sessionService.getRefreshToken(user.getId());
            response.setHeader("Set-Cookie",
                    "refreshToken=" + refreshToken +
                            "; HttpOnly; Max-Age=86400; Path=/; SameSite=None; Secure=false");
        }

        String frontEndUrl = "http://localhost:5173/dashboard?token="+accessToken;
        getRedirectStrategy().sendRedirect(request,response,frontEndUrl);

    }

    private String userNameGenerator(int length){
        Random random = new Random();
        StringBuilder sb = new StringBuilder(4);
        for(int i =0;i<length;i++){
            int index = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }
        if (userService.findByUserName(sb.toString())==null) return sb.toString();
        else return userNameGenerator(4);

    }
}
