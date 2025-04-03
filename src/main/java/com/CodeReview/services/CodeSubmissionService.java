package com.CodeReview.services;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.entities.CodeReview;


public interface CodeSubmissionService {
    CodeReviewDTO submit(CodeSubmissionDTO codeSubmissionDTO) throws Exception;
}
