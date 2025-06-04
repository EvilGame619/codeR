package com.CodeReview.services.Implementation;

import com.CodeReview.Exceptions.UserNotFoundException;
import com.CodeReview.entities.UserEntity;
import com.CodeReview.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class UserService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final JWTService jwtService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(()-> new UserNotFoundException("User Not found with email: "+ email));
    }

    public UserEntity saveUser(UserEntity user){
        return userRepository.save(user);
    }

    public UserEntity findByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }
    public UserEntity findByUserName(String username){
        return userRepository.findByUserName(username).orElse(null);
    }
    public UserEntity findByID(Long id){
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("user not found with id: "+id));
    }

    public UserEntity getUserFromJWT(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserEntity) authentication.getPrincipal();
    }

}
