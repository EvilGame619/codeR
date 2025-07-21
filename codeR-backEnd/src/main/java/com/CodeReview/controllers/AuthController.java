package com.CodeReview.controllers;

import com.CodeReview.dto.LoginDTO;
import com.CodeReview.dto.LoginResponseDTO;
import com.CodeReview.dto.SignupDTO;
import com.CodeReview.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:5173")
@Slf4j
public class AuthController {


    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<SignupDTO> signup(@RequestBody SignupDTO signupDTO){
        return ResponseEntity.ok(authService.signup(signupDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO loginDTO, HttpServletResponse response){
        LoginResponseDTO login = authService.login(loginDTO,response);
        return ResponseEntity.ok(login);
    }

    @GetMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(HttpServletRequest request, Authentication authentication){
        return  ResponseEntity.ok(authService.refresh(request));
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication){
        authService.logout(request,response, authentication);
    }
}
