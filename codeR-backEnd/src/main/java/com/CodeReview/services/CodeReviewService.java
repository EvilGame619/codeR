package com.CodeReview.services;

import com.CodeReview.dto.CodeReviewDTO;
import com.CodeReview.entities.CodeReview;

import java.io.File;
import java.util.ArrayList;

public interface CodeReviewService {

    CodeReview saveReview(ArrayList<String> checkStyle, ArrayList<String> spotbugs,ArrayList<String> pmd);

    ArrayList<String> checkStyleAnalyze(File file);
    ArrayList<String> spotBugsAnalyze(File file);
    ArrayList<String> pmdAnalyze(File file);

    CodeReviewDTO getReview(Long id);

    void deleteReview(Long id);
}
