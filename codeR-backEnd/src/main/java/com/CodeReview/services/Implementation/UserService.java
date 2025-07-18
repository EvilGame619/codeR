package com.CodeReview.services.Implementation;

import com.CodeReview.Exceptions.ResourceAlreadyExists;
import com.CodeReview.Exceptions.ResourceNotFoundException;
import com.CodeReview.Exceptions.UserNotFoundException;
import com.CodeReview.dto.UpdateFormDTO;
import com.CodeReview.dto.UserDTO;
import com.CodeReview.entities.UserEntity;
import com.CodeReview.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    private final CloudinaryService cloudinaryService;
    private final TokenService tokenService;
    private final JWTService jwtService;
    private final ModelMapper mapper;

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
        return userRepository.findByUsername(username).orElse(null);
    }
    public UserEntity findByID(Long id){
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("user not found with id: "+id));
    }

    public UserEntity getUserFromJWT(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserEntity) authentication.getPrincipal();
    }

    @Transactional
    public void updateUser(UpdateFormDTO form, HttpServletRequest request) {

        String refreshToken = tokenService.getRefreshTokenFromCookie(request);
        Long id = jwtService.getUserIdByToken(refreshToken);
        UserEntity user = findByID(id);
        if(user!=null) {
            if (form.getUsername() != null) {
                UserEntity userWithSameUsername = findByUserName(form.getUsername());
                if (userWithSameUsername == null) user.setUsername(form.getUsername());
                else throw new ResourceAlreadyExists("Username already exists");
            }


            if (form.getBio() != null && !form.getBio().equals("null")) user.setBio(form.getBio());
            if (form.getLastName() != null && !form.getLastName().equals("null")) user.setLastName(form.getLastName());
            if (form.getFirstName() != null && !form.getFirstName().equals("null")) user.setFirstName(form.getFirstName());
            if (form.getPhoneNumber() != null) user.setPhoneNumber(form.getPhoneNumber());
            if (form.getLocation() != null && !form.getLocation().equals("null")) user.setLocation(form.getLocation());
            if (form.getGithubURL() != null && !form.getGithubURL().equals("null")) user.setGithubURL(form.getGithubURL());
            if (form.getLinkedInURL() != null && !form.getLinkedInURL().equals("null")) user.setLinkedInURL(form.getLinkedInURL());
            if (form.getProfilePicture() != null) {
                user.setProfilePicture(
                        cloudinaryService.getCloudinaryLink(form.getProfilePicture()));
            }
        }else{
            throw new ResourceNotFoundException("User not found with id: "+id);
        }
    }

    @Transactional
    public UserDTO getUserDetails(HttpServletRequest request){
        String refreshToken = tokenService.getRefreshTokenFromCookie(request);
        Long id = jwtService.getUserIdByToken(refreshToken);
        UserEntity user = findByID(id);
        UserDTO dto = mapper.map(user, UserDTO.class);
        dto.setUsername(user.getUsername());
        return dto;
    }
}
