package com.CodeReview.dto;

import com.CodeReview.entities.CodeReview;
import com.CodeReview.entities.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {

    private Long id;
    private byte[] file;
    private String fileName;
    private CodeReview review;
    private LocalDateTime submittedAt;
}
