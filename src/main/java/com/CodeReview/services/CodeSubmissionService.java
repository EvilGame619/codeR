package com.CodeReview.services;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.dto.CodeSubmissionDTO;


public interface CodeSubmissionService {
    CodeReviewDTO submit(CodeSubmissionDTO codeSubmissionDTO) throws Exception;
}
