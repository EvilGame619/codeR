package com.CodeReview.services;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.dto.CodeSubmissionDTO;
import com.CodeReview.dto.ReportDTO;
import org.springframework.data.domain.Page;


import java.util.List;


public interface CodeSubmissionService {
    CodeReviewDTO submit(CodeSubmissionDTO codeSubmissionDTO) throws Exception;
    boolean checkNumberOfSubmissions();
    Page<ReportDTO> getReports(int page);

    String getJavaCode(Long id);

    void deleteCode(Long id);

    void changeName(Long id, String name);
}
