package com.CodeReview.controllers;

import com.CodeReview.dto.UpdateFormDTO;
import com.CodeReview.dto.UserDTO;
import com.CodeReview.services.Implementation.CloudinaryService;
import com.CodeReview.services.Implementation.UserService;
import com.cloudinary.Cloudinary;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {


    private final UserService userService;

    @PostMapping( value = "/edit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateUser(@ModelAttribute UpdateFormDTO updateFormDTO, HttpServletRequest request){
        userService.updateUser(updateFormDTO,request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getUser")
    public ResponseEntity<UserDTO> getUserDetails(HttpServletRequest request){
        return ResponseEntity.ok(userService.getUserDetails(request));
    }

    @GetMapping("/findUsername")
    public boolean findUsername(String username){
        return userService.isUsernameAvailable(username);
    }


}
