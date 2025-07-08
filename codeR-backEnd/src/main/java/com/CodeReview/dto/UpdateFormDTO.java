package com.CodeReview.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateFormDTO {

    private String firstName;
    private String lastName;
    private String username;

    private String githubURL;
    private String linkedInURL;

    private MultipartFile profilePicture;

    private Long phoneNumber;

    private String Location;
    private String bio;
}
