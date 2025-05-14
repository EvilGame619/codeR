package com.CodeReview.services.Implementation;

import com.CodeReview.Exceptions.UserNotFoundException;
import com.CodeReview.entities.UserEntity;
import com.CodeReview.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

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
}
