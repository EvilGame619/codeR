package com.CodeReview.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String username;
    private String firstName;
    private String lastName;
    private String bio;
    private String location;
    private String email;
    private String profilePicture;
    private Long phoneNumber;
    private String githubURL;
    private String likedInURL;

}
