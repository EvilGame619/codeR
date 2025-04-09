package com.CodeReview.services.Implementation;

import com.CodeReview.entities.CodeReview;
import com.CodeReview.repositories.CodeReviewRepository;
import com.CodeReview.services.CodeReviewService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CodeReviewImplementation implements CodeReviewService {

    private final ModelMapper mapper;
    private final CodeReviewRepository codeReviewRepository;
    private final CheckStyleService checkStyleService;
    private final PmdService pmdService;

    @Override
    public CodeReview saveReview(ArrayList<String> checkStyle, ArrayList<String> spotbugs, ArrayList<String> pmd) {
        return codeReviewRepository.save(CodeReview.builder()
                .pmd(pmd)
                .checkStyle(checkStyle)
                .spotBugs(spotbugs)
                .build());
    }

    @Override
    public ArrayList<String> checkStyleAnalyze(File file) {
        return checkStyleService.analyze(file);
    }

    @Override
    public ArrayList<String> spotBugsAnalyze(File file) {
        return null;
    }

    @Override
    public ArrayList<String> pmdAnalyze(File file) {
        return pmdService.pmdAnalyze(file);
    }
}