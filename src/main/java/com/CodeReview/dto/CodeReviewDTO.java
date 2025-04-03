package com.CodeReview.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CodeReviewDTO {

    private List<String> checkStyle;
    private List<String> pmd;
    private List<String> spotbugs;

}
