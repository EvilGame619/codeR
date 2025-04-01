package com.CodeReview.services.Implementation;

import com.CodeReview.services.CodeReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CodeReviewImplementation implements CodeReviewService {
    @Override
    public String checkStyleReport(String code) {
        return "";
    }

    @Override
    public String pmdReport(String code) {
        return "";
    }

    @Override
    public String spotBugs(String code) {
        return "";
    }

    @Override
    public String aiReport(String code) {
        return "";
    }
}
