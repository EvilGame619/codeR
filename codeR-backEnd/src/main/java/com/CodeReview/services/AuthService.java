package com.CodeReview.services;

import com.CodeReview.dto.LoginDTO;
import com.CodeReview.dto.LoginResponseDTO;
import com.CodeReview.dto.SignupDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;


public interface AuthService {

    SignupDTO signup(SignupDTO signupDTO);

    LoginResponseDTO login(LoginDTO loginDTO, HttpServletResponse response);

    LoginResponseDTO refresh(HttpServletRequest request);

    void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication);
}
